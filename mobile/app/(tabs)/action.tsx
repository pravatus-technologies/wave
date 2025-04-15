import { router } from "expo-router";
import { useEffect } from "react";

export default function Action() {
  useEffect(() => {
    // Prevent screen from staying here
    router.back();
  }, []);

  return null;
}
