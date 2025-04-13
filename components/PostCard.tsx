import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  useWindowDimensions,
  Modal,
  Pressable,
  TextInput,
  View as RNView,
  LayoutChangeEvent,
  findNodeHandle,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import ParsedText from "react-native-parsed-text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { View } from "@/components";

export const PostCard = ({ post, scrollY }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [visibleComments, setVisibleComments] = useState(1);
  const [expandedComments, setExpandedComments] = useState<
    Record<number, boolean>
  >({});
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeAnim = useSharedValue(1);
  const videoRef = useRef(null);

  const handleUrlPress = (url: string) => Linking.openURL(url);

  const toggleExpand = (index: number) => {
    setExpandedComments((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const pauseVideo = () => {
    setIsPlaying(false);
    fadeAnim.value = withTiming(0.3);
  };

  const playVideo = () => {
    setIsPlaying(true);
    fadeAnim.value = withTiming(1);
  };

  const checkVisibility = () => {
    if (!videoRef.current) return;
    const handle = findNodeHandle(videoRef.current);
    if (!handle) return;

    videoRef.current.measureInWindow((x, y, w, h) => {
      const midY = y + h / 2;
      const screenCenter = screenHeight / 2;
      const distance = Math.abs(midY - screenCenter);

      if (distance < screenHeight * 0.25) {
        playVideo();
      } else {
        pauseVideo();
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(checkVisibility, 250);
    return () => clearInterval(interval);
  }, []);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  const renderMediaItem = (src: string, index: number) => {
    const youtubeIdMatch = src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );

    if (youtubeIdMatch) {
      return (
        <Animated.View
          key={index}
          ref={videoRef}
          style={[styles.videoContainer, fadeStyle]}
        >
          <YoutubePlayer
            height={screenWidth * 0.5625}
            width={screenWidth - 64}
            play={isPlaying}
            videoId={youtubeIdMatch[1]}
            webViewProps={{
              nestedScrollEnabled: true,
              scrollEnabled: false,
              showsVerticalScrollIndicator: false,
            }}
          />
        </Animated.View>
      );
    }

    return <Image key={index} source={{ uri: src }} style={styles.mediaItem} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: post?.avatar || "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{post?.author || "Anna Mary"}</Text>
            <Text style={styles.timestamp}>{post?.time || "2 Hours ago"}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.more}>•••</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.postText} numberOfLines={3}>
            {post?.text}
          </Text>

          {post?.media && (
            <View style={styles.mediaRow}>
              {post.media.map((src, index) => renderMediaItem(src, index))}
            </View>
          )}

          {post?.link && (
            <TouchableOpacity onPress={openLink}>
              <Text style={styles.link}>{post.link}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.commentCount}>
          {post?.comments || "3.4k Comments"} · {post?.shares || "46 Shares"}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.icon}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.icon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.icon}>↗️</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <Text style={styles.reactedBy}>
            {post?.reactedBy || "Q&A with Mark & 361k others"}
          </Text>
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
              <Image
                source={{ uri: comment.avatar }}
                style={styles.replyAvatar}
              />
              <View style={styles.replyTextContainer}>
                <Text style={styles.replyName}>{comment.name}</Text>
                <ParsedText
                  style={styles.replyText}
                  numberOfLines={isExpanded ? undefined : 2}
                  parse={[
                    {
                      type: "url",
                      style: styles.link,
                      onPress: handleUrlPress,
                    },
                    {
                      type: "phone",
                      style: styles.link,
                      onPress: handleUrlPress,
                    },
                    {
                      type: "email",
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
                    <Text style={styles.toggleText}>
                      {isExpanded ? "Show less" : "Read more"}
                    </Text>
                  </TouchableOpacity>
                )}
                <Text style={styles.replyMeta}>
                  Like · Reply · {comment.time}
                </Text>
              </View>
            </View>
          );
        })}

        {post?.commentsList?.length > visibleComments && (
          <TouchableOpacity
            onPress={() => setVisibleComments(visibleComments + 5)}
          >
            <Text style={styles.showMore}>See more comments...</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: { paddingBottom: 25 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  name: { fontWeight: "bold", fontSize: 16 },
  timestamp: { color: "#999", fontSize: 12 },
  more: { fontSize: 20, color: "#aaa" },
  content: { marginBottom: 12 },
  postText: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
  link: { color: "#2e6fff", marginTop: 4 },
  mediaRow: { flexDirection: "column", gap: 8, marginTop: 8 },
  mediaItem: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    resizeMode: "cover",
  },
  videoContainer: { marginTop: 8, borderRadius: 12, overflow: "hidden" },
  commentCount: { color: "#666", fontSize: 13, marginBottom: 12 },
  actions: { flexDirection: "row", alignItems: "center" },
  actionBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#f1f5ff",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  icon: { fontSize: 16 },
  reactedBy: { fontSize: 12, color: "#999", marginRight: 4 },
  reactionGroup: { flexDirection: "row", alignItems: "center" },
  reactionEmoji: { fontSize: 16, marginLeft: -4 },
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  replyTextContainer: {
    flex: 1,
    flexDirection: "column",
  },
  replyName: { fontWeight: "bold", fontSize: 14 },
  replyText: {
    fontSize: 14,
    marginTop: 2,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  replyMeta: { fontSize: 12, color: "#888", marginTop: 4 },
  toggleText: {
    color: "#1c6ef2",
    fontSize: 13,
    marginTop: 4,
  },
  showMore: {
    color: "#1c6ef2",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  mention: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  hashtag: {
    color: "#8b5cf6",
    fontWeight: "600",
  },
});
