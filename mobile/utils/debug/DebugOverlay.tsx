import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDebug } from "@/utils/debug/DebugContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const OVERLAY_WIDTH = 140;
const OVERLAY_HEIGHT = 50;
const PADDING = 10;

export const DebugOverlay = () => {
  const { debug, toggleDebug } = useDebug();
  const pan = useRef(new Animated.ValueXY({ x: 20, y: 100 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const x = Math.max(
          PADDING,
          Math.min(
            gestureState.moveX - OVERLAY_WIDTH / 2,
            SCREEN_WIDTH - OVERLAY_WIDTH - PADDING
          )
        );
        const y = Math.max(
          PADDING,
          Math.min(
            gestureState.moveY - OVERLAY_HEIGHT / 2,
            SCREEN_HEIGHT - OVERLAY_HEIGHT - PADDING
          )
        );
        pan.setValue({ x, y });
      },
      onPanResponderRelease: () => {
        const finalX =
          pan.x._value < SCREEN_WIDTH / 2
            ? PADDING
            : SCREEN_WIDTH - OVERLAY_WIDTH - PADDING;
        Animated.spring(pan.x, {
          toValue: finalX,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.overlay,
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <TouchableOpacity onPress={toggleDebug} style={styles.button}>
        <Text style={styles.text}>
          {debug ? "🟢 Debug ON" : "⚪ Debug OFF"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: OVERLAY_WIDTH,
    height: OVERLAY_HEIGHT,
    backgroundColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 20,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
