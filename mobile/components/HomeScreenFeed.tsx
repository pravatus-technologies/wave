// HomeScreenFeed.tsx
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  RefreshControl,
  View,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  FlatList,
} from "react-native";
import {
  HomeScreenFeedProps,
  HomeScreenFeedRef,
  MainTabParamList,
  Post,
} from "@/constants/types";
import { getPosts } from "@/services/api";
import { SharedValue } from "react-native-reanimated";
import { PostCard } from "@/components";
import PostCardPlaceholder from "./PostCardPlaceholder";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export const HomeScreenFeed = forwardRef<
  HomeScreenFeedRef,
  HomeScreenFeedProps
>(({ scrollY }, ref) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const listRef = useRef<FlatList>(null);

  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const route = useRoute<RouteProp<MainTabParamList, "index">>();

  const [visibleIndeces, setVisibleIndeces] = useState<number[]>([]);
  const cacheRef = useRef<{ [key: number]: Post[] }>({});

  const loadPosts = async (reset = false) => {
    try {
      const nextPage = reset ? 1 : page;

      if (cacheRef.current[nextPage]) {
        if (reset) {
          setLoading(true);
          setPosts(cacheRef.current[nextPage]);
          setPage(2);
        } else {
          setPosts((prev) => [...prev, ...cacheRef.current[nextPage]]);
          setPage(nextPage + 1);
        }
        return;
      }

      const response = await getPosts(nextPage, 10);
      cacheRef.current[nextPage] = response;

      if (reset) {
        setPosts(response);
        setPage(2);
      } else {
        setPosts((prev) => [...prev, ...response]);
        setPage(nextPage + 1);
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      if (reset) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadPosts(true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });

      setTimeout(() => {
        setRefreshing(true);
        loadPosts(true).finally(() => setRefreshing(false));
      }, 300);
    });

    return unsubscribe;
  }, [navigation, scrollY]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      loadPosts().finally(() => setLoadingMore(false));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    refresh: () => {
      handleRefresh();
    },
  }));

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const indeces = viewableItems
        .map((item) => item.index)
        .filter((index): index is number => index !== null);
      setVisibleIndeces(indeces);
    },
    []
  );

  const PLACEHOLDER_COUNT = 5;
  const placeholderArray = Array.from({ length: PLACEHOLDER_COUNT }).map(
    (_, i) => ({
      id: `placeholder-${i}`,
      placeholder: true,
    })
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingTop: 240,
          paddingBottom: 100,
          paddingHorizontal: 10,
        }}
        ref={listRef}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={loading && posts.length === 0 ? placeholderArray : posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          (item as any).placeholder ? (
            <PostCardPlaceholder />
          ) : (
            <PostCard
              post={item}
              scrollY={scrollY}
              index={index}
              isVisible={visibleIndeces.includes(index)}
            />
          )
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </View>
  );
});

export default HomeScreenFeed;
