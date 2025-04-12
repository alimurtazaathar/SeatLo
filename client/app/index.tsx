import React, { useState,useRef,useMemo,useCallback ,useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet,{BottomSheetView,BottomSheetTextInput} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";

export default function StepIndicator() {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
const bottomSheetRef = useRef(null);
   const snapPoints = useMemo(() => ['50%','90%'], []);
   const handleSheetChanges = useCallback((index: number) => {
    console.log('BottomSheet index changed:', index);
  }, []);

const handleContinue = () => {
  if( email == "abdurrahman126amir@gmail.com"){
    router.replace("/admin")
  }
  else{
    router.replace("/home")
  }
};

  useEffect(() => {
    const func=async () => {
      console.log("Requesting location permission...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status:", status);
  
      if (status !== "granted") {
        alert("Location permission is required to proceed.");
        return;
      }
  
      console.log("Getting location...");
      let loc = await Location.getCurrentPositionAsync({});
      console.log("User Location:", loc);
    };
    func();
  }, []);
  

  return (
          <GestureHandlerRootView style={{ flex: 1 }}>
      
        <SafeAreaView style={styles.container}>
          <Text style={{ color: "white", fontSize: 100, fontFamily: "Vercetti", marginLeft: 10,marginTop:150}}>
            SeatLo
          </Text>
          <Text style={{ marginLeft: 20, fontWeight: "200", color: "white", fontSize: 15 }}>
            Join us to safar, or suffer.
          </Text>
        <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="interactive"
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      backgroundStyle={{ backgroundColor: '#141414',borderRadius:50 }}
      handleIndicatorStyle={{ backgroundColor: '' }}
      ><BottomSheetView style={{padding:20}} >
        <Text style={styles.label}>Enter your email</Text>
        <BottomSheetTextInput style={styles.input}
          placeholder="k224147@nu.edu.pk"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          
          onChangeText={setEmail}/>
        
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </BottomSheetView>
     
    </BottomSheet>
      
        </SafeAreaView>
        </GestureHandlerRootView>
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
    color: "white",
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
  buttonText: { color: "white", fontWeight: "bold" },
});
