import { Pressable, StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { IStory, IStoryItem } from '@constants/types/interfaces';

import VideoComponent from './VideoComponent';

export default function StoryCard({ story, idx }: { story: IStory; idx: string }): JSX.Element {
  const rotation1 = useSharedValue(10);
  const rotation2 = useSharedValue(5);
  const offset1 = useSharedValue(0);
  const offset2 = useSharedValue(0);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation1.value}deg` }, { translateX: offset1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation2.value}deg` }, { translateX: offset2.value }],
  }));

  const onLongPressIn = (): void => {
    rotation1.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
    rotation2.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
    offset1.value = withTiming(125);
    offset2.value = withTiming(250);
  };

  const onPressOut = (): void => {
    rotation1.value = withTiming(10);
    rotation2.value = withTiming(5);
    offset1.value = withTiming(0);
    offset2.value = withTiming(0);
  };

  const renderMedia = (media: IStoryItem, index: number): JSX.Element => {
    const animatedStyle = index === 0 ? animatedStyle1 : index === 1 ? animatedStyle2 : null;

    if (media.type === 'image' || media.type === 'music' || media.type === 'text') {
      return (
        <Animated.Image
          key={index}
          source={{ uri: media.uri }}
          style={[styles.media, animatedStyle ?? {}, { zIndex: index }]}
        />
      );
    }

    return (
      <Animated.View key={index} style={[styles.media, animatedStyle ?? {}, { zIndex: index }]}>
        <VideoComponent source={media.uri} />
      </Animated.View>
    );
  };

  return (
    <Pressable onLongPress={onLongPressIn} onPressOut={onPressOut}>
      <View style={styles.cardContainer}>
        {story.items.map((item, index) => renderMedia(item, index))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    height: 170,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 10,
    position: 'relative',
  },
  media: {
    width: 100,
    height: 150,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
});
