import React, { useState,useRef,useMemo,useCallback ,useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet,{BottomSheetView,BottomSheetTextInput} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useSession } from '../utils/ctx';
export default function SignIn() {
    const { signIn ,signOut} = useSession();


  return (
      
        <SafeAreaView style={styles.container}>
          <Text style={{ color: "#141414", fontSize: 100, fontFamily: "Vercetti", marginLeft: 10,marginTop:150}}>
            SeatLo
          </Text>
          <Text style={{ marginLeft: 20, fontWeight: "200", color: "#141414", fontSize: 15 }}>
            Join us to safar, or suffer.
          </Text>

            <Pressable onPress={()=>{
                signIn();
                router.replace('/');
            }} style={{backgroundColor:'white',width:'40%',marginHorizontal:'auto',borderRadius:40,padding:10}}><Text style={{textAlign:'center',fontWeight:'bold'}}>Signin with Google</Text></Pressable>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#8b5cf6",display:'flex' },
  formContainer: {
    // flex: 1,
    backgroundColor: "#141414",
    // width: "100%",
    padding: 50,
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
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
