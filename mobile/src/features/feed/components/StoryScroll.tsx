/**
 * This card needs a collection of items to display. Each item is
 * a UnfoldingStoryCard which itself is fed some properties to display.
 */

import { useEffect, useState } from 'react';

import { IStory } from '@constants/types/interfaces';
import { getStories } from '@services/api';
import Logger from '@utils/Logger';

import StoryCard from './StoryCard';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoryScroll(): React.ReactNode {
  const [isBusy, setIsBusy] = useState(false);
  const [collection, setCollection] = useState<IStory[] | null>(null);

  useEffect(() => {
    setIsBusy(true);
    const loadStories = async (): Promise<void> => {
      try {
        const stories = await getStories();
        setCollection(stories);
      } catch (error) {
        const err = error as Error;
        Logger.error(err, 'StoryScroll', err.message);
      } finally {
        setIsBusy(false);
      }
    };

    loadStories();
  }, []);

  if (!collection && isBusy)
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Text>Loading stories...</Text>
        </SafeAreaView>
      </>
    );

  return collection?.map((story, idx) => (
    <StoryCard key={story.uid} story={story} idx={`${story.uid}-${idx}`} />
  ));
}
