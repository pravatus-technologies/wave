import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  withSpring,
} from "react-native-reanimated";
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { PostCard } from "@/components";
import { Home, Video, ShoppingCart, Users, Menu } from "lucide-react-native";

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
  const scrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);
  const tabBarTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useAnimatedReaction(
    () => scrollY.value,
    (currentY, previousY) => {
      const diff = currentY - (previousY ?? 0);
      if (Math.abs(diff) < 10) return;

      if (diff > 0) {
        headerTranslateY.value = withSpring(-300);
        tabBarTranslateY.value = withSpring(100);
      } else if (diff < 0) {
        headerTranslateY.value = withSpring(0);
        tabBarTranslateY.value = withSpring(0);
      }
    },
    [scrollY]
  );

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
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

      {/* Static header (logo + icons) */}
      <View style={styles.topRowContainer}>
        <View style={styles.topRow}>
          <View style={styles.fbLogo} />
          <View style={styles.headerIcons}>
            <View style={styles.headerIcon} />
            <View style={styles.headerIcon} />
            <View style={styles.headerIcon} />
          </View>
        </View>
      </View>

      {/* Collapsing content */}
      <Animated.View style={[styles.collapsingHeader, headerStyle]}>
        <View style={styles.headerWrapper}>
          <Pressable onPress={() => setModalVisible(true)}>
            <TextInput
              placeholder="What's on your mind, Hashem?"
              style={styles.inputBox}
              editable={false}
            />
          </Pressable>

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

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: 240,
          paddingBottom: 100,
          paddingHorizontal: 16,
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <PostCard
          post={{
            author: "Jack Black",
            text: "Guess what? 🎉 I just dropped this kickass tune titled 'Lava Chicken'",
            media: ["https://youtu.be/eQc_B8ffJsA?feature=shared"],
            time: "2 Hours ago",
            comments: "3.4k Comments",
            shares: "46 Shares",
            reactedBy: "Q&A with Mark & 361k others",
            reactions: "❤️💙🤣",
            commentsList: [
              {
                name: "Maya Johnson",
                avatar: "https://i.pravatar.cc/301",
                text: "This is incredible work @AnnaMary! I’m obsessed with the vibe. 😍 #DesignGoals",
                time: "1m",
              },
              {
                name: "Kevin Tran",
                avatar: "https://i.pravatar.cc/302",
                text: "Hit me up at kevin.tran@example.com if you’re looking for a collaborator. #CreativeMinds",
                time: "3m",
              },
              {
                name: "Isla Summers",
                avatar: "https://i.pravatar.cc/303",
                text: "Love the colors! Check out my portfolio too 👉 https://islasart.io",
                time: "5m",
              },
              {
                name: "Carlos Vega",
                avatar: "https://i.pravatar.cc/304",
                text: "@LunaPark this reminds me of that dreamy concept you shared last week! 😄 #Inspiration",
                time: "7m",
              },
              {
                name: "Naomi Singh",
                avatar: "https://i.pravatar.cc/305",
                text: "Feel free to text me at 555-0199 for future projects. 💼 #LetsConnect",
                time: "9m",
              },
            ],
          }}
        />
        <PostCard
          post={{
            author: "Jack Black",
            text: "Guess what? 🎉 I just dropped this kickass tune titled 'Lava Chicken'",
            media: ["https://youtu.be/eQc_B8ffJsA?feature=shared"],
            time: "2 Hours ago",
            comments: "3.4k Comments",
            shares: "46 Shares",
            reactedBy: "Q&A with Mark & 361k others",
            reactions: "❤️💙🤣",
            commentsList: [
              {
                name: "Maya Johnson",
                avatar: "https://i.pravatar.cc/301",
                text: "This is incredible work @AnnaMary! I’m obsessed with the vibe. 😍 #DesignGoals",
                time: "1m",
              },
              {
                name: "Kevin Tran",
                avatar: "https://i.pravatar.cc/302",
                text: "Hit me up at kevin.tran@example.com if you’re looking for a collaborator. #CreativeMinds",
                time: "3m",
              },
              {
                name: "Isla Summers",
                avatar: "https://i.pravatar.cc/303",
                text: "Love the colors! Check out my portfolio too 👉 https://islasart.io",
                time: "5m",
              },
              {
                name: "Carlos Vega",
                avatar: "https://i.pravatar.cc/304",
                text: "@LunaPark this reminds me of that dreamy concept you shared last week! 😄 #Inspiration",
                time: "7m",
              },
              {
                name: "Naomi Singh",
                avatar: "https://i.pravatar.cc/305",
                text: "Feel free to text me at 555-0199 for future projects. 💼 #LetsConnect",
                time: "9m",
              },
            ],
          }}
        />
        <PostCard
          post={{
            author: "Jack Black",
            text: "Guess what? 🎉 I just dropped this kickass tune titled 'Lava Chicken'",
            media: ["https://youtu.be/eQc_B8ffJsA?feature=shared"],
            time: "2 Hours ago",
            comments: "3.4k Comments",
            shares: "46 Shares",
            reactedBy: "Q&A with Mark & 361k others",
            reactions: "❤️💙🤣",
            commentsList: [
              {
                name: "Maya Johnson",
                avatar: "https://i.pravatar.cc/301",
                text: "This is incredible work @AnnaMary! I’m obsessed with the vibe. 😍 #DesignGoals",
                time: "1m",
              },
              {
                name: "Kevin Tran",
                avatar: "https://i.pravatar.cc/302",
                text: "Hit me up at kevin.tran@example.com if you’re looking for a collaborator. #CreativeMinds",
                time: "3m",
              },
              {
                name: "Isla Summers",
                avatar: "https://i.pravatar.cc/303",
                text: "Love the colors! Check out my portfolio too 👉 https://islasart.io",
                time: "5m",
              },
              {
                name: "Carlos Vega",
                avatar: "https://i.pravatar.cc/304",
                text: "@LunaPark this reminds me of that dreamy concept you shared last week! 😄 #Inspiration",
                time: "7m",
              },
              {
                name: "Naomi Singh",
                avatar: "https://i.pravatar.cc/305",
                text: "Feel free to text me at 555-0199 for future projects. 💼 #LetsConnect",
                time: "9m",
              },
            ],
          }}
        />
      </Animated.ScrollView>

      <Animated.View style={[styles.tabBar, tabBarStyle]}>
        <TouchableOpacity style={styles.tabBtn}>
          <Home size={24} color="#246bfd" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Video size={24} color="#9ca3af" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <ShoppingCart size={24} color="#9ca3af" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Users size={24} color="#9ca3af" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Menu size={24} color="#9ca3af" />
        </TouchableOpacity>
      </Animated.View>
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
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  fbLogo: {
    width: 36,
    height: 36,
    backgroundColor: "#e5e7eb",
    borderRadius: 18,
  },
  headerIcons: { flexDirection: "row", gap: 8 },
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
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
});
