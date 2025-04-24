import React, { useState,useRef,useMemo,useCallback ,useEffect,forwardRef} from "react";
import { View, Text, Pressable, StyleSheet, TextInput, SafeAreaView ,Image, KeyboardAvoidingView,Platform} from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet,{BottomSheetView,BottomSheetTextInput} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useForm, Controller } from "react-hook-form";
import { SegmentedButtons } from 'react-native-paper';

interface FormData {
  //other than email whatever we need
}


const Form=()=>{
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
    })
    const [step,setStep]=useState(1);
    const [value, setValue] = React.useState('');
    const [error,setError]=useState(false);
    const inputRef=useRef<TextInput>(null);
    useEffect(()=>{
      if(inputRef.current){
        inputRef.current.focus();
      }
      
    },[])

  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#8454F5'}}>
      {/* <Image source={require('../../../assets/images/fibrebg(light).png')} resizeMode="repeat" style={styles.grainOverlay}/> */}
      <View style={{padding:20}}>
        <Text style={{color:'#ffff',fontSize:50,fontWeight:'bold'}}>Hey Ali!</Text>
        <Text style={{color:'black',fontSize:15}}>Sorry to slow you down.</Text>
        
      </View>
      <KeyboardAvoidingView style={{paddingHorizontal:30,paddingVertical:20,display:'flex',flex:1,gap:20,justifyContent:'center'}}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <Text style={{textAlign:'center',color:'#ffff',fontSize:25,fontWeight:'medium'}}>Enter your mobile number</Text>
        <View style={[{borderRadius:10,display:'flex',alignItems:'center',flexDirection:'row',padding:10,paddingHorizontal:20,backgroundColor:'#ffff'},styles.border]}>
          <View><Text>+92</Text></View>
          <Text style={{fontSize:20,opacity:0.5,color:'black'}}> | </Text>
          <TextInput keyboardType="number-pad" placeholder="3162211320" style={{fontSize:15,letterSpacing:4,marginHorizontal:10,opacity:0.7}} value={value} onChangeText={setValue} autoFocus maxLength={10} ref={inputRef}/>
       
        </View>
        {error && <Text style={{color:'red',fontWeight:'bold',textAlign:'center',marginTop:-10}}>Please enter valid number</Text>}
       
        <Pressable style={{backgroundColor:'#141414',borderRadius:10,padding:15,paddingHorizontal:20}} onPress={()=>{if(value.length!==10){setError(true)}else{router.push('/(protected)/form/otp')}}}><Text style={{color:'white',textAlign:'center'}}>Send OTP</Text></Pressable>

        {/* <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'Male',
            label: 'Male',
          },
          {
            value: 'Female',
            label: 'Female',
          }
        ]}
        style={{width:40,alignContent:'center',borderColor:'##8454F5'}}
        /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Form;

const styles=StyleSheet.create({
  grainOverlay:{
    ...StyleSheet.absoluteFillObject,
    zIndex:0
  },
  border:{
borderWidth:2,borderColor:'black',
  }
})











// export default function Form() {
//   const [email, setEmail] = useState("");
//   const [location, setLocation] = useState(null);
// const bottomSheetRef = useRef(null);
//    const snapPoints = useMemo(() => ['50%','90%'], []);
//    const handleSheetChanges = useCallback((index: number) => {
//     console.log('BottomSheet index changed:', index);
//   }, []);

// const handleContinue = () => {
//   if( email == "abdurrahman126amir@gmail.com"){
//     router.replace("/admin")
//   }
//   else{
//     router.replace("/home")
//   }
// };

// //   useEffect(() => {
// //     const func=async () => {
// //       console.log("Requesting location permission...");
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       console.log("Permission status:", status);
  
// //       if (status !== "granted") {
// //         alert("Location permission is required to proceed.");
// //         return;
// //       }
  
// //       console.log("Getting location...");
// //       let loc = await Location.getCurrentPositionAsync({});
// //       console.log("User Location:", loc);
// //     };
// //     func();
// //   }, []);
  

//   return (
      
//         <SafeAreaView style={styles.container}>
         
//           <Text style={{ marginLeft: 20, fontWeight: "200", color: "#141414", fontSize: 15 }}>
//             Form Details here
//           </Text>
//         <Pressable style={[styles.continueButton,{backgroundColor:'white'}]} onPress={handleContinue}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </Pressable>
      
//         </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#8b5cf6",display:'flex' },
//   formContainer: {
//     // flex: 1,
//     backgroundColor: "#141414",
//     // width: "100%",
//     padding: 50,
//     // borderTopRightRadius: 50,
//     // borderTopLeftRadius: 50,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   label: {
//     color: "#8b5cf6",
//     fontSize: 16,
//     marginBottom: 10,
//     alignSelf: "flex-start",
//   },
//   input: {
//     width: "100%",
//     backgroundColor: "#222",
//     color: "white",
//     padding: 15,
//     borderRadius: 10,
//     fontSize: 16,
//   },
//   continueButton: {
//     backgroundColor: "#8b5cf6",
//     padding: 15,
//     borderRadius: 22,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "black", fontWeight: "bold" },
// });
