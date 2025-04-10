import { AuthErrorCodes } from "@/constants/types";
import { useData } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { logInfo } from "@/utils/Logger";
import { Redirect, Slot } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import * as regex from "@/constants/regex";
import { SafeAreaView } from "@/components/SafeAreaView";
import { KeyboardAvoidingView } from "@/components/KeyboardAvoidingView";
import { View } from "@/components/View";

interface ILogin {
  email: string;
  password: string;
}

interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const isAndroid = Platform.OS === "android";
const screenHeight = Dimensions.get("window").height;

export default function Signin() {
  const { isDark } = useData();
  const { user, loginWithEmail } = useAuth();

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });

  const [login, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (value: any) => {
      setLoginData((state) => ({ ...state, ...value }));
    },
    [setLoginData]
  );

  const handleSignin = useCallback(async () => {
    try {
      await loginWithEmail(login.email, login.password);
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again";

      switch (error.code) {
        case AuthErrorCodes.INVALID_CREDENTIAL:
          errorMessage =
            "Your login has expired or is invalid. Please try again.";
          break;
        case AuthErrorCodes.USER_NOT_FOUND:
          errorMessage = "No user found with that email.";
          break;
        case AuthErrorCodes.WRONG_PASSWORD:
          errorMessage = "Incorrect password. Please try again.";
          break;
        case AuthErrorCodes.NETWORK_FAILED:
          errorMessage = "Network error. Check your connection and try again.";
          break;
      }

      Alert.alert("Login Error", errorMessage);
    }
  }, [login]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(login.email),
      password: true,
    }));
  }, [login, setIsValid]);

  if (user) {
    return <Redirect href="/" />; // ✅ works on refresh and post-login
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 15,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "#eaeaea",
              padding: 10,
              marginVertical: 2,
              borderRadius: 25,
            }}
            autoCapitalize={"none"}
            placeholder="Email"
            onChangeText={(value) => handleChange({ email: value })}
          />
        </View>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "#eaeaea",
              padding: 10,
              marginVertical: 2,
              borderRadius: 25,
            }}
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) => handleChange({ password: value })}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: "gray",
              marginTop: 10,
              borderRadius: 25,
            }}
          >
            <Button title="Signin" onPress={handleSignin}></Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
