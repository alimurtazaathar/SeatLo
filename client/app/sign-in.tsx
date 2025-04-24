
//androidMunim 810506835230-u2ibgogf94mpkmhm52n39ekdjode53sl.apps.googleusercontent.com
//iosMunim: 810506835230-khomlr9vu1im5co499l30ala3e6hplfd.apps.googleusercontent.com  
//webMunim: 810506835230-5lbt79of6roeeh59iepupsvfbqhrst3h.apps.googleusercontent.com
//iosshcem:com.googleusercontent.apps.810506835230-khomlr9vu1im5co499l30ala3e6hplfd

import React, { useState,useRef,useMemo,useCallback ,useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TextInput, SafeAreaView ,Platform,Image} from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet,{BottomSheetView,BottomSheetTextInput} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useSession } from '../utils/ctx';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode
} from '@react-native-google-signin/google-signin';
import useLoadFonts from "@/hooks/useLoadFonts";
import Constants from 'expo-constants';


const googleClientIdWeb = Constants.expoConfig?.extra?.googleClientIdWeb;
const googleClientIdIos = Constants.expoConfig?.extra?.googleClientIdIos;

export default function SignIn() {
    const { signIn ,signOut} = useSession();
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [error,setError]=useState(false);
    const fonts=useLoadFonts();
  GoogleSignin.configure({
    iosClientId:process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId:process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    profileImageSize:150,
  });
     const handleGoogleSignIn=async()=>{
      try {
        setIsSubmitting(true);
        await GoogleSignin.hasPlayServices();
        const response=await GoogleSignin.signIn();
        if(isSuccessResponse(response)){
          const {idToken,user}=response.data;
          const {email,name,photo}=user;
          if(!email.endsWith('@nu.edu.pk')){
            setIsSubmitting(false);
            setError(true);  return;}
            console.log(email);
          signIn(idToken);
          // router.replace('/');
        }
        setIsSubmitting(false);
      } catch (error) {
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.IN_PROGRESS:
              console.log("In progress");
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              console.log("Play services not available");
              break;
            default:
              console.log(error.code);
          }
        } else {
          console.log("Unexpected error:", error);
        }
      }
      }
     
    
    

  return (
      
        <SafeAreaView style={styles.container}>
        <Image
        source={require("../assets/images/fibrebg(light).png")}
        style={styles.grainOverlay}
        resizeMode="repeat"
      />
      
          <View style={{flex:2,justifyContent:'center'}}>
            <Text style={{ color: "black", fontSize: 90,zIndex:1, fontFamily: "Vercetti", marginHorizontal:"auto",marginTop:150}}>
              SeatLo
            </Text>
            <Text style={{ textAlign:'center', color: "#ffff", fontSize: 15 }}>
              Join us to safar, or suffer.
            </Text>
          </View>
<View style={{flex:1,gap:'10'}}> 
  
              <Pressable onPress={()=>{

                  handleGoogleSignIn();
                  // signIn();
                  // router.replace('/');
                  // signIn(idToken);
              }} style={[
                { backgroundColor: isSubmitting ? 'gray' : 'white' },
                { width: '75%', marginHorizontal: 'auto', borderRadius: 5, padding: 8,display:'flex',flexDirection:'row',alignItems:'center',gap:2,justifyContent:'center' }
  
              ]}>
                   <Image  source={require("../assets/images/google.png")} style={{width:25,height:25}}/>
                <Text style={{fontWeight:'600',textAlign:'center'}}>Continue with Google</Text></Pressable>
            {error && <Text  style={{textAlign:'center',color:'#F65C7A',fontWeight:'bold'}}>Please sign in with domain email.</Text>}
            <View>
              {/* <Text style={{fontSize:10,color:'white'}}>* Domain ID required</Text> */}
            <Text style={{textAlign:'center',fontSize:10,color:'white'}}>By continuing you agree with SeatLo's{' '}
              <Text style={{textDecorationLine:'underline'}}>Terms of service </Text>
              and{'\n'}
              <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text>
              </Text>
            </View>
</View>
           
        </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8b5cf6",display:'flex' ,zIndex:1},
 
  label: {
    color: "#8b5cf6",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    
    zIndex: 0,
  },
  continueButton: {
    backgroundColor: "#8b5cf6",
    padding: 15,
    borderRadius: 22,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "black", fontWeight: "bold" },
});
