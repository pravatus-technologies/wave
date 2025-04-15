import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  View as RNView,
  View,
} from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ParsedText from 'react-native-parsed-text';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import YoutubePlayer from 'react-native-youtube-iframe';

import { CTRLIcon, CTRLImageButton } from '@components/controls';
import { PostCardProps } from '@constants/types';
import { useTheme } from '@context';

export default function CNTPostCard({ post, isVisible }: PostCardProps): React.ReactNode {
  const { width: screenWidth } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleComments, setVisibleComments] = useState<number>(1);
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const fadeAnim = useSharedValue(1);
  const videoRef = useRef<RNView>(null);
  const userPaused = useRef(false);
  const { colors } = useTheme();

  useEffect(() => {
    /**
     * moved updateFade(), pauseVideo() and playVideo() inside useEffect because if
     * they lived outside, they would change every render
     */
    const updateFade = (visible: boolean): void => {
      fadeAnim.value = withTiming(visible ? 1 : 0.3);
    };

    const pauseVideo = (): void => {
      setIsPlaying(false);
      updateFade(false);
    };

    const playVideo = (): void => {
      setIsPlaying(true);
      updateFade(true);
    };

    if (isVisible) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isVisible, fadeAnim]);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  const toggleExpand = (index: number): void => {
    setExpandedComments(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleUrlPress = (url: string): Promise<void> => Linking.openURL(url);

  const handleFullScreenChange = useCallback(async (isFullscreen: boolean): Promise<void> => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.unlockAsync();
    }
  }, []);

  const renderMediaItem = (src: string, index: number): JSX.Element => {
    const youtubeIdMatch = src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );

    if (youtubeIdMatch && youtubeIdMatch[1]) {
      const videoId = youtubeIdMatch[1];

      if (!isVisible) {
        return (
          <View
            key={index}
            style={[styles.videoWrapper, { height: screenWidth * 0.5625, backgroundColor: '#000' }]}
          />
        );
      }

      return (
        <Animated.View key={index} ref={videoRef} style={[styles.videoWrapper, fadeStyle]}>
          <YoutubePlayer
            key={post.id}
            height={screenWidth * 0.5625}
            width={screenWidth}
            play={isPlaying}
            videoId={videoId}
            onFullScreenChange={handleFullScreenChange}
            onChangeState={event => {
              if (event === 'paused') userPaused.current = true;
              if (event === 'playing') userPaused.current = false;
            }}
            webViewProps={{
              allowsFullscreenVideo: true,
              nestedScrollEnabled: true,
              scrollEnabled: false,
              showsVerticalScrollIndicator: false,
            }}
          />
        </Animated.View>
      );
    }

    return <Image key={index} source={{ uri: src }} style={styles.imageMediaFullWidth} />;
  };

  const openLink = (): void => {
    if (post?.link) Linking.openURL(post.link);
  };

  return (
    <View style={styles.container}>
      <View style={[{ ...styles.card, backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <Image
            source={{ uri: post?.avatar || 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{post?.author || 'Unknown User'}</Text>
            <Text style={styles.timestamp}>{post?.time || 'Just now'}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.more}>•••</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.postText, { paddingHorizontal: 16 }]} numberOfLines={3}>
          {post?.text}
        </Text>
        <View style={styles.content}>
          {post?.media && (
            <View style={styles.mediaRow}>
              {Array.isArray(post.media) &&
                post.media.map((src, index) => renderMediaItem(src, index))}
            </View>
          )}

          {post?.link && (
            <TouchableOpacity onPress={openLink}>
              <Text style={styles.link}>{post.link}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.commentCount}>
          {post?.comments || '3.4k Comments'} · {post?.shares || '46 Shares'}
        </Text>

        <View style={styles.actions}>
          <View style={{ marginRight: 20 }}>
            <CTRLImageButton style={styles.actionBtn}>
              <CTRLIcon name="ThumbsUpIcon" size={21} color={colors.text} />
            </CTRLImageButton>
          </View>
          <View style={{ marginRight: 20 }}>
            <CTRLImageButton style={styles.actionBtn}>
              <CTRLIcon name="MessageSquare" size={21} color={colors.text} />
            </CTRLImageButton>
          </View>
          <View style={{ marginRight: 20 }}>
            <CTRLImageButton style={styles.actionBtn}>
              <CTRLIcon name="Share" size={21} color={colors.text} />
            </CTRLImageButton>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.reactedBy}>{post?.reactedBy || 'Q&A with Mark & 361k others'}</Text>
          <View style={styles.reactionGroup}>
            <Text style={styles.reactionEmoji}>❤️</Text>
            <Text style={styles.reactionEmoji}>💙</Text>
            <Text style={styles.reactionEmoji}>🤣</Text>
          </View>
        </View>

        {post?.commentsList?.slice(0, visibleComments).map((comment, index) => {
          const isExpanded = expandedComments[index] ?? false;
          const shouldShowToggle = comment.text.length > 120;

          return (
            <View key={index} style={styles.replyContainer}>
              <Image source={{ uri: comment.avatar }} style={styles.replyAvatar} />
              <View style={styles.replyTextContainer}>
                <Text style={styles.replyName}>{comment.name}</Text>
                <ParsedText
                  style={styles.replyText}
                  numberOfLines={isExpanded ? undefined : 2}
                  parse={[
                    {
                      type: 'url',
                      style: styles.link,
                      onPress: handleUrlPress,
                    },
                    {
                      type: 'phone',
                      style: styles.link,
                      onPress: handleUrlPress,
                    },
                    {
                      type: 'email',
                      style: styles.link,
                      onPress: handleUrlPress,
                    },
                    { pattern: /@\w+/, style: styles.mention },
                    { pattern: /#\w+/, style: styles.hashtag },
                  ]}
                >
                  {comment.text}
                </ParsedText>
                {shouldShowToggle && (
                  <TouchableOpacity onPress={() => toggleExpand(index)}>
                    <Text style={styles.toggleText}>{isExpanded ? 'Show less' : 'Read more'}</Text>
                  </TouchableOpacity>
                )}
                <Text style={styles.replyMeta}>Like · Reply · {comment.time}</Text>
              </View>
            </View>
          );
        })}

        {(post?.commentsList?.length ?? 0) > visibleComments && (
          <TouchableOpacity onPress={() => setVisibleComments(visibleComments + 5)}>
            <Text style={styles.showMore}>See more comments...</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 25 },
  card: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eaeaea',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { color: '#999', fontSize: 12 },
  more: { fontSize: 20, color: '#aaa' },
  content: { marginBottom: 12 },
  postText: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
  link: { color: '#2e6fff', marginTop: 4 },
  mediaRow: { flexDirection: 'column', gap: 8, marginTop: 8 },
  commentCount: {
    color: '#666',
    fontSize: 13,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 16 },
  reactedBy: { fontSize: 12, color: '#999', marginRight: 4 },
  reactionGroup: { flexDirection: 'row', alignItems: 'center' },
  reactionEmoji: { fontSize: 16, marginLeft: -4 },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    paddingHorizontal: 16,
  },
  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  replyTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  replyName: { fontWeight: 'bold', fontSize: 14 },
  replyText: {
    fontSize: 14,
    marginTop: 2,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  replyMeta: { fontSize: 12, color: '#888', marginTop: 4, fontWeight: '600' },
  toggleText: {
    color: '#1c6ef2',
    fontSize: 13,
    marginTop: 4,
  },
  showMore: {
    color: '#1c6ef2',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
  mention: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  hashtag: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
  videoWrapper: {
    marginTop: 8,
    borderRadius: 0,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  imageMediaFullWidth: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 0,
    marginHorizontal: 0,
  },
});
