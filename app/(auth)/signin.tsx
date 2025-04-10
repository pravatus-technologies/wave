import { useAuth } from "@/hooks/useAuth";
import { logInfo } from "@/utils/Logger";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Signin() {
  const { user } = useAuth();

  logInfo("[Signin]", `User is ${user}`);
  if (user) <Redirect href="/(tabs)/" />;

  return (
    <View>
      <Text>Signin</Text>
    </View>
  );
}
