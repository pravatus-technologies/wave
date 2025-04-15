import React, { useCallback } from "react";
import { Alert, TouchableOpacity, Text } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import { useData } from "../context/DataProvider";
import { useTranslation } from "../context/TranslationProvider";

import useTheme from "../context/ThemeProvider";

import { Feather } from "@expo/vector-icons";
import { useAuth } from "./useAuth";

// Define type-safe routes
type RootStackParamList = {
  Screens: {
    screen:
      | "Notifications"
      | "Shopping"
      | "Settings"
      | "Profile"
      | "Home"
      | "HomeScreen"
      | "TabHome";
    params?: {
      screen?: string;
      params?: Record<string, any>;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  const options = {};

  return options;
};
