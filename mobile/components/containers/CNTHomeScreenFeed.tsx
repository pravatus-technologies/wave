/* eslint-disable react-hooks/exhaustive-deps */
// HomeScreenFeed.tsx
import { RefreshControl, View, ActivityIndicator, ViewToken, FlatList } from 'react-native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import {
  HomeScreenFeedProps,
  HomeScreenFeedRef,
  MainTabParamList,
  Post,
  PostOrPlaceholder,
} from '@constants/types';
import { getPosts } from '@services/api';

import CNTPostCard from './CNTPostCard';
import CNTPostCardPlaceholder from './CNTPostCardPlaceholder';

/**
 * Used a named function here to avoid Anonymous stack traces. Exports
 * only the Forwarded Ref version as indicated at the bottom of the
 * function definition.
 *
 * We wrap this function with forwardRef to enable parent components to pass a ref,
 * then exports it under the original name for consistent usage.
 *
 * @param param0 The scrollY position value from the parent component
 * @param ref Allow parent component to imperatively access this child
 * @returns JSX.Element
 */
function CNTHomeScreenFeed(
  { scrollY }: HomeScreenFeedProps,
  ref: React.Ref<HomeScreenFeedRef>
): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const listRef = useRef<FlatList>(null);

  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const [visibleIndeces, setVisibleIndeces] = useState<number[]>([]);

  const loadPosts = async (reset = false): Promise<void> => {
    const nextPage = reset ? 1 : page;

    const response = await getPosts(nextPage, 10);
    if (reset) {
      setPosts(response);
      setPage(2); // set up for next page
    } else {
      setPosts(prev => [...prev, ...response]);
      setPage(prev => prev + 1); // use functional setState!
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadPosts(true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });

      setTimeout(() => {
        setRefreshing(true);
        loadPosts(true).finally(() => setRefreshing(false));
      }, 300);
    });

    return unsubscribe;
  }, [navigation, scrollY, loadPosts]);

  const handleLoadMore = (): void => {
    if (!loadingMore) {
      setLoadingMore(true);
      loadPosts().finally(() => setLoadingMore(false));
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

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
        .map(item => item.index)
        .filter((index): index is number => index !== null);
      setVisibleIndeces(indeces);
    },
    []
  );

  const PLACEHOLDER_COUNT = 5;
  const placeholderArray = Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => ({
    id: `placeholder-${i}`,
    placeholder: true,
  }));

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
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
        keyExtractor={item => item.id}
        renderItem={({ item, index }: { item: PostOrPlaceholder; index: number }) =>
          'placeholder' in item && item.placeholder === true ? (
            <CNTPostCardPlaceholder />
          ) : (
            <CNTPostCard
              post={item as Post}
              scrollY={scrollY}
              index={index}
              isVisible={visibleIndeces.includes(index)}
            />
          )
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={scrollHandler}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" style={{ marginVertical: 16 }} /> : null
        }
      />
    </View>
  );
}

const ForwardedCNTHomeScreenFeed = forwardRef(CNTHomeScreenFeed);
export default ForwardedCNTHomeScreenFeed;
export { ForwardedCNTHomeScreenFeed as CNTHomeScreenFeed };
