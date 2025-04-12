import { View, Text, Pressable,StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawer() {
  return (<SafeAreaView style={{flex:1}}>
      
          <View style={{padding:20,paddingTop:60,marginBottom:'auto' }}>
              <Link href="/home" asChild>
                  <Pressable>
                      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20,color:'white' }}>
                        Mazdoor Monki
                      </Text>
                  
                  </Pressable>
                  
              </Link>
              {/* Drawer Items */}
              <Link href="/home/complaint" asChild>
                <Pressable style={{ paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16 ,color:'white'}}>Complaint</Text>
                </Pressable>
              </Link>
              
              <Link href="/home/contact" asChild>
                <Pressable style={{ paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16 ,color:'white'}}>Contact Us</Text>
                </Pressable>
              </Link>
              <Link href="/home/settings" asChild>
                <Pressable style={{ paddingVertical: 10}}>
                  <Text style={{ fontSize: 16 ,color:'white'}}>Settings</Text>
                </Pressable>
              </Link>
              
                  <Link href="/" asChild>
                    <Pressable style={{ paddingVertical: 30}}>
                      <Text style={{ color:'red',fontSize:15 }}>Logout</Text>
                    </Pressable>
                  </Link>
          </View>
              <View style={{padding:20}}>
              </View>
      
  </SafeAreaView>
  );
}

const styles=StyleSheet.create({
    textcolor:{
        color:'white'
    }

})
// export default function CustomDrawer(props:any) {


//     return(
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props}/>
//         </DrawerContentScrollView>
//     )
// }