import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { View } from "@/components";

const newMessages = [
  {
    id: "1",
    name: "Landon Bloom",
    message: "Hello there, do you have a minute to chat?",
    time: "about an hour ago",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "2",
    name: "Jim Hopper",
    message: "😍⚡",
    time: "6 hour ago",
    avatar: "https://i.pravatar.cc/100?img=21",
  },
];

const earlierMessages = [
  {
    id: "3",
    name: "Robin Buckley",
    message: "I was there earlier, sorry I missed you...",
    time: "a day ago",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: "4",
    name: "Millie Brown",
    message: "I found these at the store earlier",
    time: "4 days ago",
    avatar: "https://i.pravatar.cc/100?img=19",
  },
  {
    id: "5",
    name: "Anna Mary",
    message: "Awesome job! 👏🏽",
    time: "6 days ago",
    avatar: "https://i.pravatar.cc/100?img=26",
  },
  {
    id: "6",
    name: "Erica Sinclair",
    message: "Thank you 😊❤️",
    time: "7 days ago",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
];

export default function MessagesScreen() {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.messageCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.dot} />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <TextInput style={styles.searchPlaceholder} />
      <Text style={styles.sectionLabel}>New</Text>
      {newMessages.map((item) => (
        <View key={item.id}>{renderItem({ item })}</View>
      ))}
      <Text style={styles.sectionLabel}>Earlier</Text>
      {earlierMessages.map((item) => (
        <View key={item.id}>{renderItem({ item })}</View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: "#f9fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#246bfd",
    marginBottom: 10,
  },
  searchPlaceholder: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    marginBottom: 24,
    paddingHorizontal: 25,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 12,
  },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  message: {
    fontSize: 14,
    color: "#374151",
  },
  time: {
    fontSize: 12,
    color: "#3b82f6",
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563eb",
  },
});
