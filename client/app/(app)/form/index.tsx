import React, { useState,useRef,useMemo,useCallback ,useEffect,forwardRef} from "react";
import { View, Text, Pressable, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet,{BottomSheetView,BottomSheetTextInput} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  //other than email whatever we need
}


const UserProfile=()=>{
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
    })
    const [step,setStep]=useState(1);
  return(
    <>
    {step===1 && <h1>form page 1</h1>}
    </>
  )
}

export default UserProfile;













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
