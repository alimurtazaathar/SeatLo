//will redirect to home or form
import { useEffect } from "react";
import { Text } from "react-native";
import { Stack,router } from "expo-router";
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import { useSession } from '../../utils/ctx';
export default function RootLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/sign-in");
    }
  }, [isLoading, session]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
    return null; // Prevent rendering layout while redirecting
  }

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{headerShown:false}}/>
    </GestureHandlerRootView>
  );
}