import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { TextInput, Button } from "react-native";
import {SegmentedButtons} from "react-native-paper";



export default function StepIndicator() {
  const [step, setStep] = useState(0);
  const stepWidth = 30; 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    gender: "",
    role: "",
  });

  const animatedWidth = useSharedValue(stepWidth);
  const backButtonOpacity=useSharedValue(0);
  const backButtonX=useSharedValue(-20);
  useEffect(() => {
    animatedWidth.value = withTiming((step + 1) * stepWidth, { duration: 300 });
    if (step > 0) {
      backButtonOpacity.value = withTiming(1, { duration: 300 });
      backButtonX.value = withTiming(0, { duration: 300 });
    } else {
      backButtonOpacity.value = withTiming(0, { duration: 300 });
      backButtonX.value = withTiming(-20, { duration: 300 });
    }
  }, [step]);

  const nextStep = () => {
    if (step < 2) { 
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };



  const handleInputChange = (key:string, value:string) => {
    setFormData({ ...formData, [key]: value });
  };
  
  const buttons: { value: string; label: string }[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const stepFunction = (step:any) => {
    switch(step){
      case 0 : 
      return(
      <View style={{gap:15}}>
      <Text style = {styles.FirstContainer}> Register</Text>
     
      <TextInput placeholder="User Name" value={formData.name} onChangeText={(text) => handleInputChange('name',text)} style = {styles.input} />
      
      <TextInput placeholder="Email" value={formData.email} onChangeText={(text) => handleInputChange('email',text)} style = {styles.input} />
     
      <TextInput placeholder="Phone Number" value={formData.phone} onChangeText={(text) => handleInputChange('phone',text)} style = {styles.input} />

      </View>
      );
      case 1:
      return(
      <View style={{gap:15}}>
      <Text style = {styles.FirstContainer}> Register</Text>

      <TextInput placeholder="University" value={formData.university} onChangeText={(text) => handleInputChange('university',text)} style = {styles.input} />
      <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>Gender</Text>
      <SegmentedButtons
        value={formData.gender}
        onValueChange={(value) => handleInputChange("gender", value)}
        buttons={buttons}
        style = {styles.segmentButton}
      />
       </View>
      );

      case 2:
        return(
          <>
            <Text style= {{textAlign: "center",fontSize:20,fontWeight:"bold"}}>Preferred Role:</Text>
            
            <Pressable onPress={() => handleInputChange('role', 'Driver')} style={[styles.roleButton, formData.role === 'Driver' && styles.selectedRole,styles.PressableButton]}>
              <Text>Driver</Text>
            </Pressable>
            <Pressable onPress={() => handleInputChange('role', 'Passenger')} style={[styles.roleButton, formData.role === 'Passenger' && styles.selectedRole,styles.PressableButton]}>
              <Text>Passenger</Text>
            </Pressable>
            <Text style={styles.disclaimer}>* You can change this later</Text>
           
          </>
        );
          
    }
    
}

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));
  const animatedBackBtnStyle = useAnimatedStyle(() => ({
    opacity: backButtonOpacity.value,
    transform: [{ translateX: backButtonX.value }],
  }));
  return (
    <View style={styles.container}>
      
    {
      <View style = {styles.formContainer}>
      {stepFunction(step)}
      </View>
    }

      <View style={styles.stepContainer}>
        <Animated.View style={[styles.greenIndicator, animatedIndicatorStyle]} />
        <View style={[styles.circle,{backgroundColor:'white'}]} />
        <View style={[styles.circle,{backgroundColor:step>=1?'white':'#dedede'}]} />
        <View style={[styles.circle,{backgroundColor:step===2?'white':'#dedede'}]} />
      </View>

    
      <View style={styles.buttonRow}>
        {step>0 && (<Animated.View style={animatedBackBtnStyle}><Pressable style={styles.backButton} onPress={prevStep}>
          <Text style={{color:"black",fontWeight:"bold"}}>Back</Text>
        </Pressable></Animated.View>)}

        <Pressable style={styles.continueButton} onPress={nextStep}>
          <Text style={styles.buttonText}>{step<2?'Continue':'Submit'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  FirstContainer:{
    textAlign: "center",fontSize:30,fontWeight:"bold",
  
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 0,

  },
  greenIndicator: {
    height: 10,
    width:5,
    backgroundColor: "#2fd52d",
    borderRadius: 15,
    position: "absolute",
    left: 0,
    paddingVertical:15
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
   marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
    marginTop:80,
  },
  backButton: {
    backgroundColor: "#c4b5fd",
    padding: 15,
    borderRadius: 20,

  },
  continueButton: {
    backgroundColor: "#5b34c2",
    display:'flex',
    alignItems:'center',
    padding: 15,
    borderRadius: 22,
    width:'60%',
    textAlign:'center'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    padding:10,
    textAlign:"center"
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    
  },

  error: {
    color: "red",
    marginBottom: 10,
  },


  formContainer:{
    backgroundColor:"white",
    marginBottom:80,
    width:300,
    borderRadius:8,
    padding:50,
    paddingBottom:150,
    
  },

  disclaimer: { color: "grey", marginTop: 10, textAlign: "center",fontStyle:"italic"},
  roleButton: {padding: 10, marginVertical: 15, borderRadius: 10, backgroundColor: "#e0e0e0", width: "80%", alignItems: "center" },
  selectedRole: {padding:10, backgroundColor: "#E6E6FA" },

  segmentButton:{
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    
  },

  PressableButton:{
  justifyContent: "center",
    marginVertical: 10,
    width: "90%", 
    height: 60,
}

});

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
