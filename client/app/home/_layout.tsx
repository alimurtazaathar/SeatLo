import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "@/components/CustomDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar ,Platform,View} from "react-native";
export default function Layout() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
    {/* {Platform.OS === "ios" && <View style={{ height: 40, backgroundColor: "#141414" }} />} */}

            <Drawer drawerContent={() => <CustomDrawer />} screenOptions={{headerStyle:{backgroundColor:'#141414'},drawerStyle:{backgroundColor:'#121212'}}} > 
              <Drawer.Screen name="index" options={{headerTitle:'',}}/>
              <Drawer.Screen name="contact" options={{headerTitle:'Contact Us',headerTintColor:'white'}}/>
              <Drawer.Screen name="complaint" options={{headerTitle:'Complaint'}}/>
              <Drawer.Screen name="settings" options={{headerTitle:'Settings'}}/>
        
            </Drawer>
      </GestureHandlerRootView>
  );
}
