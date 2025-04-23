import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImageButton, Screen } from '@components/controls';
import { useTheme } from '@context';
import { useAuth } from '@context/AuthContext';
import { AppIcon } from 'src/components';
import MainHeader from 'src/components/MainHeader';
import StoryScroll from '@features/feed/components/StoryScroll';

export default function HomePage() {
  const { logout, profile } = useAuth();
  const { colors, sizes, assets } = useTheme();

  if (!profile) return <Text>Loading...</Text>;

  const NUM_CARDS = 7;
  const PICS_PER_STORY = 3;

  const COVER_VIDEO_POOL = [
    '../../assets/videos/video1.mp4',
    '../../assets/videos/video2.mp4',
    '../../assets/videos/video3.mp4',
    '../../assets/videos/video4.mp4',
    '../../assets/videos/video5.mp4',
  ];

  const getRandomMedia = (): { type: 'image' | 'video'; uri: string } => {
    const isVideo = Math.random() < 0.4;

    if (isVideo) {
      const randomIndex = Math.floor(Math.random() * COVER_VIDEO_POOL.length);
      return {
        type: 'video',
        uri: COVER_VIDEO_POOL[randomIndex],
      };
    } else {
      return {
        type: 'image',
        uri: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`,
      };
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.card, paddingHorizontal: sizes.padding }}>
      <SafeAreaView
        style={{
          backgroundColor: colors.card,
          paddingBottom: -sizes.m,
        }}
      >
        {/* header container */}
        <MainHeader />
        {/* stories scrollview container */}
        <View
          style={{
            height: sizes.storiesHeight,
            marginHorizontal: -sizes.padding,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }} // optional: internal padding
            style={{
              paddingTop: 10,
            }}
          >
            <StoryScroll />
          </ScrollView>
        </View>
      </SafeAreaView>
      <Screen
        style={{
          marginHorizontal: -sizes.padding,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
        }}
      ></Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  cardContainer: {
    width: 100,
    height: 155,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 155,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
  rotate15: {
    transform: [{ rotate: '10deg' }],
  },
  rotate30: {
    transform: [{ rotate: '15deg' }],
  },
});
