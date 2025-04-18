import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';

import React, { useCallback, useState } from 'react';

import CMPSearchModal from '@components/screens/SCRSearch';
import { CTRLIcon, CTRLImageButton } from '@components/controls';
import { useTheme, useTranslation } from '@context';
import { useRouter } from 'expo-router';

/**
 * SCRFriendsHomeHeader
 *
 * The component for the SCRFriendsHome screen visible at the
 * top of the device. This component displays page title information
 * and an CTRLImageButton with a CTRLIcon that triggers a Search User
 * modal to find People and Friends.
 *
 * @returns JSX.Element
 */
export function SCRFriendsHomeHeader(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.card,
        borderBottomRightRadius: sizes.cardRadius,
        borderBottomLeftRadius: sizes.cardRadius,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.borderColor,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: Platform.OS === 'ios' ? sizes.headerHeight : sizes.headerHeight + 30,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: sizes.s,
        }}
      >
        <Text style={{ color: colors.text, fontSize: sizes.h4, fontWeight: 'bold' }}>
          {t('screens.friends.title')}
        </Text>
        <View />
        <CTRLImageButton onPress={() => router.push('/search')}>
          <CTRLIcon name="UserSearch" style={{ height: sizes.m }} color={colors.text} />
        </CTRLImageButton>
      </View>
    </SafeAreaView>
  );
}

export default function SCRFriendsHome(): JSX.Element {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
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

const Section = ({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}): JSX.Element => (
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

const FriendCard = ({
  name,
  mutualCount,
  underline,
}: {
  name: string;
  mutualCount: number;
  underline: boolean;
}): JSX.Element => (
  <View style={styles.friendCard}>
    <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.mutualText, underline && styles.underline]}>
        {mutualCount} mutual friends
      </Text>
    </View>
    <CTRLImageButton onPress={() => Alert.alert(`Chat`)}>
      <CTRLIcon name="MessageSquare" size={24} style={styles.actionIcon} />
    </CTRLImageButton>
    <CTRLImageButton onPress={() => Alert.alert(`Options`)}>
      <CTRLIcon name="Ellipsis" size={24} style={styles.actionIcon} />
    </CTRLImageButton>
  </View>
);

const RequestCard = ({ name, mutualCount }: { name: string; mutualCount: number }): JSX.Element => (
  <View style={styles.friendCard}>
    <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
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

const SuggestionCard = ({
  name,
  mutualCount,
  isNew,
}: {
  name: string;
  mutualCount: number;
  isNew: boolean;
}): JSX.Element => (
  <View style={styles.suggestionCard}>
    <View style={styles.suggestionHeader}>
      <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.suggestionAvatar} />
      <TouchableOpacity>
        <CTRLIcon name="X" size={14} />
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
  container: { flex: 1, backgroundColor: '#F1F4F5', paddingHorizontal: 10 },
  headerContainer: {
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: { fontSize: 24, fontWeight: '700', color: '#2563eb' },
  headerIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1e3a8a',
  },
  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e3a8a' },
  countText: { color: '#dc2626' },
  seeAll: { color: '#2563eb', fontWeight: '500' },
  friendCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontWeight: '700', fontSize: 16, color: '#1e3a8a' },
  mutualText: { color: '#6b7280', fontSize: 13, marginTop: 2 },
  underline: { textDecorationLine: 'underline' },
  actionIcon: { marginLeft: 10, color: '#6b7280' },
  acceptBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 6,
  },
  acceptText: { color: '#fff', fontWeight: '600' },
  rejectBtn: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 6,
  },
  rejectText: { color: '#2563eb', fontWeight: '600' },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  suggestionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  addFriendBtn: {
    backgroundColor: '#2563eb',
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addFriendText: { color: '#fff', fontWeight: '700' },
  newBadge: {
    position: 'absolute',
    top: 46,
    left: 34,
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
});
