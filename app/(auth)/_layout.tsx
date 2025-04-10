import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
  const { user } = useAuth();
  return !user ? <Redirect href="/signin/" /> : <Slot />;
}
