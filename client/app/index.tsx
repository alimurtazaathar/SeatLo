import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function StepIndicator() {
  const [step, setStep] = useState(0);
  const stepWidth = 30; 

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


  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));
  const animatedBackBtnStyle = useAnimatedStyle(() => ({
    opacity: backButtonOpacity.value,
    transform: [{ translateX: backButtonX.value }],
  }));
  return (
    <View style={styles.container}>
      
    {/* we need to add forms here
      for state step 1:Name email number
      for state step 2:Uni gender 
      for state step 3:Preferred role (driver/passenger)(also add disclaimer-can be changed later)

    */}

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
          <Text style={styles.buttonText}>{step<2?'Continue':'Finish'}</Text>
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
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 40,
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
});