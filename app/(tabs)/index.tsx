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
    </ScrollView>
  );
}
