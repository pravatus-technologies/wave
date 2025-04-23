import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

import React from 'react';

import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageButton, Screen } from '@components/controls';
import { AppIcon } from 'src/components';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const { logout, profile } = useAuth();
  const { colors, sizes, assets } = useTheme();

  if (!profile) return <Text>Loading...</Text>;

  const NUM_CARDS = 7;
  const PICS_PER_STORY = 3;

  return (
    <View style={{ flex: 1, backgroundColor: colors.card, paddingHorizontal: sizes.padding }}>
      <SafeAreaView
        style={{
          backgroundColor: colors.card,
          paddingBottom: -sizes.m,
        }}
      >
        {/* header container */}
        <View
          style={{
            height: sizes.headerHeight - 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image source={assets.appLogo} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ImageButton onPress={() => console.log('notification')}>
              <AppIcon name="bell" size={22} />
            </ImageButton>
            <View>
              {profile.pictureUri && (
                <Image
                  source={{ uri: profile.pictureUri }}
                  style={{ width: 42, height: 42, borderRadius: 21, marginLeft: sizes.s }}
                />
              )}
            </View>
          </View>
        </View>
        {/* stories scrollview container */}
        <View
          style={{
            height: sizes.storiesHeight,
            marginHorizontal: -sizes.padding,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }} // optional: internal padding
            style={{
              paddingTop: 10,
            }}
          >
            {/* scrollable children */}
            {Array.from({ length: NUM_CARDS }).map((_, cardIndex) => (
              <ImageButton key={cardIndex} onPress={() => console.log('clicked ' + cardIndex)}>
                <View style={styles.cardContainer}>
                  {Array.from({ length: PICS_PER_STORY }).map((_, index) => {
                    const rotation = index === 0 ? '10deg' : index === 1 ? '5deg' : '0deg';
                    return (
                      <Image
                        key={index}
                        source={{ uri: 'https://picsum.photos/200/300' }}
                        style={[styles.image, { transform: [{ rotate: rotation }] }]}
                      />
                    );
                  })}
                </View>
              </ImageButton>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <Screen
        style={{
          marginHorizontal: -sizes.padding,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
        }}
      ></Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  cardContainer: {
    width: 100,
    height: 155,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 155,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
  rotate15: {
    transform: [{ rotate: '10deg' }],
  },
  rotate30: {
    transform: [{ rotate: '15deg' }],
  },
});
