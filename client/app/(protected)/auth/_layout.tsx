import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="passenger_auth" />
      <Stack.Screen name="driver_auth" />
    </Stack>
  );
}
