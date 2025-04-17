import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { ImageButtonProps } from '@constants/types';

export default function ImageButton({
  children,
  onPress,
  containerStyle,
}: ImageButtonProps): JSX.Element {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (): void => {
    scale.value = withSpring(0.95, { stiffness: 200 });
  };

  const handlePressOut = (): void => {
    scale.value = withSpring(1, { stiffness: 200 });
  };

  return (
    <View style={[containerStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }): StyleProp<ViewStyle> => ({
          opacity: pressed ? 0.7 : 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 5,
        })}
      >
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </Pressable>
    </View>
  );
}
