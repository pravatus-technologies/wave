// HomeScreen with corrected FlatList structure and stable Android animation
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  withSpring,
} from "react-native-reanimated";
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Platform,
  View,
} from "react-native";
import { PostCard } from "@/components";
import { BlurView } from "expo-blur";
import { useTheme } from "@/hooks";
import { Post } from "@/constants/types";
import { getPosts } from "@/services/api";
import Logger from "@/utils/Logger";
import HomeScreenFeed from "@/components/HomeScreenFeed";

const stories = [
  { id: "your", label: "Your Story", image: null, hasNew: true },
  {
    id: "1",
    label: "Erica Sinclair",
    image: "https://i.pravatar.cc/100?img=1",
    hasNew: true,
  },
  { id: "2", label: "Will Byers", image: "https://i.pravatar.cc/100?img=2" },
  { id: "3", label: "Millie Brown", image: "https://i.pravatar.cc/100?img=3" },
  { id: "4", label: "Rachel Podrez", image: "https://i.pravatar.cc/100?img=4" },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);
  const tabBarTranslateY = useSharedValue(0);

  const { assets, colors } = useTheme();

  const collapseThreshold = 80;
  const expandThreshold = 40;
  const lastTriggerY = useSharedValue(0);
  const scollVelocity = useSharedValue(0);

  useAnimatedReaction(
    () => scrollY.value,
    (currentY, previousY) => {
      const velocity = currentY - (previousY ?? 0);
      scollVelocity.value = velocity;

      const config = {
        damping: 20,
        stiffness: 30 + Math.min(Math.abs(velocity * 10), 300),
      };

      if (currentY > collapseThreshold && currentY > lastTriggerY.value) {
        headerTranslateY.value = withSpring(-300, config);
        tabBarTranslateY.value = withSpring(100, config);
        lastTriggerY.value = currentY;
      } else if (currentY < expandThreshold && currentY < lastTriggerY.value) {
        headerTranslateY.value = withSpring(0, config);
        tabBarTranslateY.value = withSpring(0, config);
        lastTriggerY.value = currentY;
      }
    },
    [scrollY]
  );

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value > collapseThreshold ? -300 : 0 }],
  }));

  const tabBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>What's on your mind?</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Share your thoughts..."
              multiline
            />
            <Pressable
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#246bfd" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.topRowContainer}>
        <View style={styles.topRow}>
          <Image source={assets.logo} style={styles.waveLogo} />
          <View style={styles.headerIcons}>
            <Image
              src="https://i.pravatar.cc/100?img=10"
              style={[styles.headerIcon, { borderColor: colors.primary }]}
            />
          </View>
        </View>
      </View>

      <Animated.View style={[styles.collapsingHeader, headerStyle]}>
        {Platform.OS === "android" && Platform.Version < 31 ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(255,255,255,0.9)" },
            ]}
          />
        ) : (
          <BlurView
            intensity={50}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <View pointerEvents="none">
              <TextInput
                placeholder="What's on your mind, Hashem?"
                style={styles.inputBox}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.shareRow}>
            <TouchableOpacity style={styles.shareBtn}>
              <Text>📷 Photo/video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Text>🎥 Live video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Text>📍 Check in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.storyRow}>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={stories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.storyBubble}>
                  <View style={{ position: "relative" }}>
                    {item.image ? (
                      item.hasNew ? (
                        <LinearGradient
                          colors={["#4f46e5", "#3b82f6"]}
                          style={styles.ringWrapperGradient}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={styles.storyImage}
                          />
                          <View style={styles.unreadBadge} />
                        </LinearGradient>
                      ) : (
                        <View style={styles.ringWrapper}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.storyImage}
                          />
                        </View>
                      )
                    ) : (
                      <View style={styles.storyPlaceholder} />
                    )}
                  </View>
                  <Text style={styles.storyLabel}>{item.label}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Animated.View>

      <HomeScreenFeed scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  topRowContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    zIndex: 11,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  collapsingHeader: {
    paddingTop: 20,
    position: "absolute",
    top: 96,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#eaeaea",
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  waveLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerIcons: { flexDirection: "row", gap: 8 },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 3,
  },
  inputBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  shareBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
  },
  storyRow: {
    paddingVertical: 12,
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  storyBubble: {
    alignItems: "center",
    marginRight: 16,
  },
  ringWrapper: {
    borderWidth: 2,
    borderColor: "#246bfd",
    borderRadius: 30,
    padding: 2,
  },
  ringWrapperGradient: {
    borderRadius: 30,
    padding: 2,
  },
  storyImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: "#34D399",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  storyPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
  },
  storyLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#111827",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  modalInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
  },
  modalClose: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalFullBox: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },

  modalInputFull: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#f9fafb",
  },
});
