import { useEffect } from "react";
import { router } from "expo-router";

export default function Action() {
  useEffect(() => {
    // Prevent screen from staying here
    router.back();
  }, []);

  return null;
}
