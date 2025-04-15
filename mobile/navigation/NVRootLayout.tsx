// navigation/NVRootLayout.tsx
import { RootProvider } from "@context";
import { Slot } from "expo-router";

export default function NVRootLayout() {
  return (
    <RootProvider>
      <Slot />
    </RootProvider>
  );
}
