import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "@/components/CustomDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, Platform, View, Text } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <CustomDrawer />}
        screenOptions={{
          headerStyle: { backgroundColor: '#141414' },
          drawerStyle: { backgroundColor: '#222222', width: 280 },
          headerTintColor: '#8b5cf6',
          drawerActiveTintColor: '#8b5cf6',
          drawerInactiveTintColor: '#d1d5db',
          drawerLabelStyle: { marginLeft: -15, fontSize: 16 },
          headerLeft: () => <DrawerToggleButton tintColor="#8b5cf6" />,
        }}
      >
        <Drawer.Screen 
          name="index" 
          options={{
            headerTitle: '',
            drawerLabel: 'Home',
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="contact" 
          options={{
            headerTitle: 'Contact Us',
            drawerIcon: ({ color }) => (
              <Ionicons name="mail" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="complaint" 
          options={{
            headerTitle: 'Complaint',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="report-problem" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="ride-history" 
          options={{
            headerTitle: 'Ride History',
            drawerIcon: ({ color }) => (
              <Ionicons name="time" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="settings" 
          options={{
            headerTitle: 'Settings',
            drawerIcon: ({ color }) => (
              <Ionicons name="settings" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="ratings" 
          options={{
            headerTitle: 'Ratings',
            
          }}
        />
         <Drawer.Screen 
          name="profile" 
          options={{
            headerTitle: 'Profile',
            
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}