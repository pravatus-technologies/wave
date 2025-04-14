import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { PVIcon, PVImageButton } from "@/components";

export default function FriendshipsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Friendships</Text>
        <View style={styles.headerIconWrapper}>
          <View style={styles.statusDot} />
        </View>
      </View>

      <Section title="My friends" count={367}>
        <FriendCard name="Erica Sinclair" mutualCount={34} />
        <FriendCard name="Erica Sinclair" mutualCount={34} />
        <FriendCard name="Erica Sinclair" mutualCount={34} />
        <FriendCard name="Erica Sinclair" mutualCount={34} />
        <FriendCard name="Erica Sinclair" mutualCount={34} />
      </Section>

      <Section title="Requests" count={367}>
        <RequestCard name="Jim Hopper" mutualCount={34} />
      </Section>

      <Section title="People you may know">
        <View style={styles.suggestionRow}>
          <SuggestionCard name="Nancy Wheeler" mutualCount={7} isNew />
          <SuggestionCard name="Will Byers" mutualCount={89} />
        </View>
      </Section>
    </ScrollView>
  );
}

const Section = ({ title, count, children }: any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title} {count && <Text style={styles.countText}>({count})</Text>}
      </Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
    <View>{children}</View>
  </View>
);

const FriendCard = ({ name, mutualCount, underline }: any) => (
  <View style={styles.friendCard}>
    <Image
      source={{ uri: "https://i.pravatar.cc/100" }}
      style={styles.avatar}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.mutualText, underline && styles.underline]}>
        {mutualCount} mutual friends
      </Text>
    </View>
    <PVImageButton onPress={() => Alert.alert(`Chat`)}>
      <PVIcon name="MessageSquare" size={24} style={styles.actionIcon} />
    </PVImageButton>
    <PVImageButton onPress={() => Alert.alert(`Options`)}>
      <PVIcon name="Ellipsis" size={24} style={styles.actionIcon} />
    </PVImageButton>
  </View>
);

const RequestCard = ({ name, mutualCount }: any) => (
  <View style={styles.friendCard}>
    <Image
      source={{ uri: "https://i.pravatar.cc/100?img=5" }}
      style={styles.avatar}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.mutualText}>{mutualCount} mutual friends</Text>
    </View>
    <TouchableOpacity style={styles.acceptBtn}>
      <Text style={styles.acceptText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.rejectBtn}>
      <Text style={styles.rejectText}>Reject</Text>
    </TouchableOpacity>
  </View>
);

const SuggestionCard = ({ name, mutualCount, isNew }: any) => (
  <View style={styles.suggestionCard}>
    <View style={styles.suggestionHeader}>
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={styles.suggestionAvatar}
      />
      <TouchableOpacity>
        <PVIcon name="X" size={14} />
      </TouchableOpacity>
    </View>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.mutualText}>{mutualCount} mutual friends</Text>
    <TouchableOpacity style={styles.addFriendBtn}>
      <Text style={styles.addFriendText}>Add Friend</Text>
    </TouchableOpacity>
    {isNew && (
      <View style={styles.newBadge}>
        <Text style={styles.newBadgeText}>NEW</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", paddingHorizontal: 10 },
  headerContainer: {
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: { fontSize: 24, fontWeight: "700", color: "#2563eb" },
  headerIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1e3a8a",
  },
  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1e3a8a" },
  countText: { color: "#dc2626" },
  seeAll: { color: "#2563eb", fontWeight: "500" },
  friendCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontWeight: "700", fontSize: 16, color: "#1e3a8a" },
  mutualText: { color: "#6b7280", fontSize: 13, marginTop: 2 },
  underline: { textDecorationLine: "underline" },
  actionIcon: { marginLeft: 10, color: "#6b7280" },
  acceptBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 6,
  },
  acceptText: { color: "#fff", fontWeight: "600" },
  rejectBtn: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 6,
  },
  rejectText: { color: "#2563eb", fontWeight: "600" },
  suggestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  suggestionHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  suggestionAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  addFriendBtn: {
    backgroundColor: "#2563eb",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addFriendText: { color: "#fff", fontWeight: "700" },
  newBadge: {
    position: "absolute",
    top: 46,
    left: 34,
    backgroundColor: "#2563eb",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: { fontSize: 10, color: "#fff", fontWeight: "700" },
});
