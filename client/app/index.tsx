
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput ,SafeAreaView} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SegmentedButtons } from "react-native-paper";
import DriverSVG from "../assets/images/driver-light.svg";
import PassengerSVG from "../assets/images/passenger.svg";
import { Link,router } from "expo-router";
import useLoadFonts from "../hooks/useLoadFonts";
interface FormData {
  name: string;
  email: string;
  phone: string;
  university: string;
  gender: string;
  role: string;
}

export default function StepIndicator() {
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={{justifyContent:'center'}}>
        <Text style={{color:"white",fontSize:100,fontWeight:"heavy",fontFamily:"Vercetti",marginLeft:10,marginBottom:0}}>SeatLo</Text>
        <Text style={{marginLeft:20,fontWeight:'200',color:'white',fontSize:15}}>Join us to safar,or suffer.</Text>
    </SafeAreaView>
      {/* <View style={styles.formContainer}>
       <Text style={{color:'white'}}>Random BS here</Text>
      </View> */}
      {/* <Link href='/register' asChild> */}
       <Pressable style={styles.continueButton} onPress={()=>{ router.replace('/home')}}>
             <Text style={styles.buttonText}>Continue</Text>
       </Pressable>
           {/* </Link> */}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,height:'100%', backgroundColor: "#8b5cf6",display:'flex',justifyContent:'space-evenly',alignItems:'center'},
  formHeading: {  fontSize: 30, fontWeight: "condensed", color: 'white',opacity:0.5 ,fontFamily:'Vercetti'},
  stepContainer: { flexDirection: "row", alignItems: "center", position: "relative", marginBottom: 0 },
  greenIndicator: { height: 10, width: 5, backgroundColor: "#2fd52d", borderRadius: 15, position: "absolute", left: 0, paddingVertical: 15 },
  circle: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 10 },
  buttonRow: { flexDirection: "row", gap: 20, marginTop: 80,alignItems:'center',justifyContent:"center" },
  backButton: { backgroundColor: "#c4b5fd", padding: 15, borderRadius: 22, paddingHorizontal: 25 },
  continueButton: { backgroundColor: "#141414", color: "white", fontWeight: "bold" ,display: "flex", alignItems: "center", padding: 15, borderRadius: 22, width: "60%", textAlign: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  input: { height: 40, borderColor: "#5328e8", color: "black", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10},
  formContainer: { backgroundColor: "#141414",width: '100%',flex:1,padding: 50,borderTopRightRadius:50,borderTopLeftRadius:50 ,display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'},
  disclaimer: { color: "grey", marginTop: 10, textAlign: "center", fontStyle: "italic" },
  roleContainer: {borderRadius: 5,backgroundColor: '#c4b5fd',display: "flex",alignItems: "center",justifyContent: "center",width: 200,height: 200,borderWidth:2},
  segmentButton: {borderWidth: 3,borderColor: "#5328e8",borderRadius: 25,overflow: "hidden",width: 230,},
  buttonStyle: {flex: 1,alignItems: "center",justifyContent: "center",borderWidth: 0.2,backgroundColor: "white"},
  selectedButton: {backgroundColor: "#5328e8", flex: 1,alignItems: "center",justifyContent: "center",},
  selectedLabel: {color: "#FFFFFF", fontWeight: "bold",textAlign: "center",},
  defaultLabel: {  textAlign: "center",},
  segmentContainer: {alignItems: "center", justifyContent: "center", width: "100%",},
});

