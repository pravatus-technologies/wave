import { NotificationItem } from "@/constants/types";
import React from "react";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const notifications = [
  {
    id: 1,
    name: "Landon Bloom and Emilia Harcourt",
    action: "also commented on Anna Delvey's post",
    time: "about an hour ago",
    avatar: "https://i.pravatar.cc/100?img=1",
    icon: "💬",
    unread: true,
  },
  {
    id: 2,
    name: "Jim Hopper, Robin Buckley and Rachel Podrez",
    action: "love your story",
    time: "6 hour ago",
    avatar: "https://i.pravatar.cc/100?img=2",
    icon: "📘",
    unread: true,
  },
  {
    id: 3,
    name: "Robin Buckley",
    action: "shred a reel: Design Faster With The Best Figma AI Plugins 😍⚡",
    time: "a day ago",
    avatar: "https://i.pravatar.cc/100?img=3",
    icon: "📺",
  },
  {
    id: 4,
    name: "Rachel Podrez",
    action: "sent you a friend requests",
    time: "",
    avatar: "https://i.pravatar.cc/100?img=4",
    icon: "👤",
    buttons: true,
  },
  {
    id: 5,
    name: "Millie Brown",
    action: "commented in a post that you’re tagged in “Seriously?”🤣",
    time: "4 days ago",
    avatar: "https://i.pravatar.cc/100?img=5",
    icon: "💬",
  },
  {
    id: 6,
    name: "Anna Mary and Will Byers",
    action: "reacted to your comment “Great Work 👏🏻”",
    time: "6 days ago",
    avatar: "https://i.pravatar.cc/100?img=6",
    icon: "🥰",
  },
  {
    id: 7,
    name: "Erica Sinclair and Will Byers",
    action: "liked your comment “Thank you 😊❤️”",
    time: "7 days ago",
    avatar: "https://i.pravatar.cc/100?img=7",
    icon: "👍",
  },
];

const NotificationCard = ({ item }: { item: NotificationItem }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>
        <Text style={styles.bold}>{item.name}</Text> {item.action}
      </Text>
      {item.time ? <Text style={styles.time}>{item.time}</Text> : null}
      {item.buttons && (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.accept}>
            <Text style={styles.actionText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reject}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    <View style={styles.badge}>
      {item.unread ? <View style={styles.dot} /> : null}
    </View>
  </View>
);

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <View style={styles.circleIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.section}>New</Text>
        {notifications.slice(0, 2).map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
        <Text style={styles.section}>Earlier</Text>
        {notifications.slice(2).map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#246bfd",
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2e3c6d",
  },
  scrollContent: {
    padding: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9ca3af",
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  text: {
    fontSize: 15,
    color: "#1f2937",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "700",
    color: "#111827",
  },
  time: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  accept: {
    backgroundColor: "#246bfd",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  reject: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  rejectText: {
    color: "#374151",
    fontWeight: "600",
  },
  badge: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#246bfd",
    borderRadius: 5,
  },
});
