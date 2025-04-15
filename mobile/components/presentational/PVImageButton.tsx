import { PVImageButtonProps } from "@constants/types";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

/***
 * This is the custom PVImageButton component to be
 * used as a pressable image button such as Like, Share,
 * and Comment buttons in the PostCard component
 */
export default function PVImageButton({
  children,
  onPress,
  style,
}: PVImageButtonProps): JSX.Element {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 200 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }): StyleProp<ViewStyle> => ({
        opacity: pressed ? 0.7 : 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
      })}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
