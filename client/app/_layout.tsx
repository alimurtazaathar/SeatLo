//delete this comment
import { Stack } from "expo-router";
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView >
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index" />
    <Stack.Screen name="auth" options={{headerShown:false}}/>
    <Stack.Screen name="home" options={{headerShown:false}}/>
    <Stack.Screen name="admin" options={{headerShown:false}}/>
  </Stack>
  </GestureHandlerRootView>
  )
}