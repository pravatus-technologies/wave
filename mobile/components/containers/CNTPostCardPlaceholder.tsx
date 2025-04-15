// components/PostCardPlaceholder.tsx

import { View, StyleSheet } from 'react-native';

import React from 'react';

export default function CNTPostCardPlaceholder(): JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.textBlock} />
      </View>
      <View style={styles.body} />
      <View style={styles.footer}>
        <View style={styles.action} />
        <View style={styles.action} />
        <View style={styles.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  textBlock: {
    height: 16,
    width: '60%',
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  body: {
    height: 160,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  action: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
  },
});
