//will redirect to home or form
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SplashScreen, Stack,router } from "expo-router";
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { useSession } from '../../utils/ctx';
// SplashScreen.preventAutoHideAsync();

export default function ProtectedLayout() {
  const { session, isLoading,isProfileComplete } = useSession();
  useEffect(() => {
    if (!isLoading && !session) {
      // SplashScreen.hideAsync();
      router.replace("/sign-in");
    } else if (session && !isProfileComplete) {
      // SplashScreen.hideAsync();
      router.replace("/form");
    }
  }, [isLoading, session, isProfileComplete]);
  
  if (!session) {
    return null; // Prevent rendering layout while redirecting
  }

  
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{headerShown:false}}/>
    </GestureHandlerRootView>
  );
}