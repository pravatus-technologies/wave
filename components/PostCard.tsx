import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import ParsedText from "react-native-parsed-text";
import { View } from "@/components";

export const PostCard = ({ post }) => {
  const [visibleComments, setVisibleComments] = useState(1);
  const [expandedComments, setExpandedComments] = useState({});

  const openLink = () => {
    if (post?.link) Linking.openURL(post.link);
  };

  const toggleExpand = (index) => {
    setExpandedComments((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderMediaItem = (src, index) => {
    const youtubeIdMatch = src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );

    if (youtubeIdMatch) {
      return (
        <View key={index} style={styles.videoContainer}>
          <YoutubePlayer
            height={Dimensions.get("window").width * 0.5625}
            width={Dimensions.get("window").width - 64}
            play={false}
            videoId={youtubeIdMatch[1]}
          />
        </View>
      );
    }

    return <Image key={index} source={{ uri: src }} style={styles.mediaItem} />;
  };

  const handleUrlPress = (url) => Linking.openURL(url);

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
          const isExpanded = expandedComments[index];
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
  container: { paddingBottom: 100 },
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
