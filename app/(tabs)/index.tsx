import { Button, StyleSheet } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "@/components/SafeAreaView";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView
      style={{
        ...styles.dimension,
      }}
    >
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dimension: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  position: {},
  styling: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "rgba(255, 0, 0, 0.05)",
  },
});
