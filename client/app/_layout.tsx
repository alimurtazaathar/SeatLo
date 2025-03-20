import { Stack } from "expo-router";

export default function RootLayout() {
  return (<Stack screenOptions={{
    headerStyle:{
      backgroundColor:'#25292e'
    },
    headerTitleStyle:{
      color:'#fff'
    }

  }}>
    <Stack.Screen name="index" options={{title:'Register'}}/>
  </Stack>

  )
}