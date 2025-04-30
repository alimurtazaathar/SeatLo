import { useEffect, useState } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSession } from '../../utils/ctx';

// Ensure splash screen is shown until we manually hide it
// SplashScreen.preventAutoHideAsync();

export default function ProtectedLayout() {
  const { session, isLoading, isProfileComplete } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        // SplashScreen.hideAsync();
        router.replace("/sign-in");
      } else if (session && !isProfileComplete) {
        // SplashScreen.hideAsync();
        router.replace("/form");
      } else {
        // SplashScreen.hideAsync();
      }
    }
  }, [isLoading, session, isProfileComplete]);

  if (isLoading || !session) {
    return null; // Hold off rendering while loading or redirecting
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
