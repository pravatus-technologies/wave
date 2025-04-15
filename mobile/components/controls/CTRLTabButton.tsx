import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { TabBarButtonProps } from '@constants/types';
import { useTheme } from '@context';

/***
 * This isthe custom PVTabBarButton component to be used
 * as a value for the "tabBarButton" prop inside the Tab.Screen
 * element.
 */
export default function CTRLTabButton({
  children,
  onPress,
  onCustomPress,
  accessibilityState,
  title,
  ...props
}: TabBarButtonProps): JSX.Element {
  // Hooks that define the theme settings and current theme
  const { colors } = useTheme();

  const isSelected = accessibilityState?.selected;
  const scale = useSharedValue(1);

  const handlePress = (event: GestureResponderEvent): void => {
    if (onCustomPress) {
      onCustomPress(event);
    } else if (onPress) {
      onPress(event);
    }
  };

  useEffect(() => {
    scale.value = withSpring(isSelected ? 1.15 : 1, {
      damping: 8,
      stiffness: 150,
      mass: 0.8,
    });
  }, [isSelected, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      style={({ pressed }): StyleProp<ViewStyle> => ({
        marginTop: Platform.OS === 'ios' ? 12 : 5,
        opacity: pressed ? 0.7 : 1,
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      {/* renders the children in an animated view. It can be an Icon or an image */}
      <Animated.View style={animatedStyle}>
        {/* We have to wrap the elements in a View in order to center them horizontally */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
          <Text
            style={{
              marginTop: 4,
              fontSize: 10,
              fontWeight: '600',
              color: isSelected ? colors.primary : colors.text,
            }}
          >
            {title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
