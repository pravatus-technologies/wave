// HomeScreenFeed.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  View,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  FlatList,
} from "react-native";
import { Post } from "@/constants/types";
import { getPosts } from "@/services/api";
import { SharedValue } from "react-native-reanimated";
import { PostCard } from "@/components";
import PostCardPlaceholder from "./PostCardPlaceholder";

export default function HomeScreenFeed({
  scrollY,
}: {
  scrollY: SharedValue<number>;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
}
