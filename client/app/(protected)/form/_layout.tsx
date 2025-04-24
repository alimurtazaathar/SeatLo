import { Slot, Stack } from 'expo-router';


export default function FormLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="otp"/>
        <Stack.Screen name="gender"/>
        
    </Stack>
  );
}
