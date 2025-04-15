import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Action(): React.ReactNode {
  useEffect(() => {
    // Prevent screen from staying here
    router.back();
  }, []);

  return null;
}
