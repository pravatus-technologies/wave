import { Button, StyleSheet, Text } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "@/components/SafeAreaView";
import { ScrollView, View } from "@/components";
import { useTheme } from "@/hooks";
import { PostCard } from "@/components/PostCard";

export default function HomeScreen() {
  const { logout } = useAuth();
  const { colors, assets, sizes } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 10,
      }}
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
              name: "Sophia Lee",
              avatar: "https://i.pravatar.cc/301",
              text: "This is stunning! Your color choices are top tier 🎨",
              time: "5m",
            },
            {
              name: "Darren Cruz",
              avatar: "https://i.pravatar.cc/302",
              text: "Absolutely love this. Can’t wait to see more from you 🙌",
              time: "7m",
            },
            {
              name: "Luna Park",
              avatar: "https://i.pravatar.cc/303",
              text: "That wallpaper feels like a dream 😍 so proud of your work!",
              time: "11m",
            },
            {
              name: "Jayden Fox",
              avatar: "https://i.pravatar.cc/304",
              text: "Saved this instantly.🔥 Do you have a link to download?",
              time: "15m",
            },
            {
              name: "Isabelle Moore",
              avatar: "https://i.pravatar.cc/305",
              text: "Wow, the gradients are perfect! ✨ You nailed this!",
              time: "21m",
            },
          ],
        }}
      />
    </ScrollView>
  );
}
