import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SegmentedButtons } from "react-native-paper";
import DriverSVG from "../assets/images/driver-light.svg";


import PassengerSVG from "../assets/images/passenger.svg";

interface FormData {
  name: string;
  email: string;
  phone: string;
  university: string;
  gender: string;
  role: string;
}

export default function StepIndicator() {
  const [step, setStep] = useState<number>(0);
  const stepWidth: number = 30;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    university: "",
    gender: "",
    role: "Driver",
  });
  const buttons = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const animatedWidth = useSharedValue(stepWidth);
  const backButtonOpacity = useSharedValue(0);
  const backButtonX = useSharedValue(-20);

  useEffect(() => {
    animatedWidth.value = withTiming((step + 1) * stepWidth, { duration: 300 });
    backButtonOpacity.value = withTiming(step > 0 ? 1 : 0, { duration: 300 });
    backButtonX.value = withTiming(step > 0 ? 0 : -20, { duration: 300 });
  }, [step]);

  const nextStep = () => step < 2 && setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({ width: animatedWidth.value }));
  const animatedBackBtnStyle = useAnimatedStyle(() => ({ opacity: backButtonOpacity.value, transform: [{ translateX: backButtonX.value }] }));

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {step === 0 && (
          <View style={{ gap: 15 }}>
            <Text style={styles.formHeading}>Register</Text>
            <TextInput placeholder="User Name" placeholderTextColor={"gray"} value={formData.name} onChangeText={(text) => handleInputChange("name", text)} style={styles.input} />
            <TextInput placeholder="Email" placeholderTextColor={"gray"} value={formData.email} onChangeText={(text) => handleInputChange("email", text)} style={styles.input} />
            <TextInput placeholder="Phone Number" placeholderTextColor={"gray"} value={formData.phone} onChangeText={(text) => handleInputChange("phone", text)} style={styles.input} />
          </View>
        )}

        {step === 1 && (
          <View style={{ gap: 15 }}>
            <Text style={styles.formHeading}>Register</Text>
            <TextInput placeholder="University" value={formData.university} onChangeText={(text) => handleInputChange("university", text)} style={styles.input} />

            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>Gender</Text>
            <SegmentedButtons
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              buttons={buttons}
              style={styles.segmentButton}
            />
          </View>
        )}

        {step === 2 && (
          <>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Preferred Role:</Text>
            <Pressable onPress={() => handleInputChange("role", "Driver")} style={[styles.roleContainer, {
              borderColor: formData.role === "Driver" ? "#5328e8" : "gray"
            }]}>
              <DriverSVG width={240} height={240} />

            </Pressable>
            <Text>OR</Text>
            <Pressable onPress={() => handleInputChange("role", "Passenger")} style={[styles.roleContainer, { borderColor: formData.role === "Passenger" ? "#5328e8" : "gray" }]}>

              <PassengerSVG width={200} height={200} />

            </Pressable>
            <Text style={styles.disclaimer}>* You can change this later</Text>
          </>
        )}
      </View>

      <View style={styles.stepContainer}>
        <Animated.View style={[styles.greenIndicator, animatedIndicatorStyle]} />
        <View style={[styles.circle, { backgroundColor: "white" }]} />
        <View style={[styles.circle, { backgroundColor: step >= 1 ? "white" : "#dedede" }]} />
        <View style={[styles.circle, { backgroundColor: step === 2 ? "white" : "#dedede" }]} />
      </View>

      <View style={styles.buttonRow}>
        {step > 0 && (
          <Animated.View style={animatedBackBtnStyle}>
            <Pressable style={styles.backButton} onPress={prevStep}>
              <Text style={{ color: "black", fontWeight: "bold" }}>Back</Text>
            </Pressable>
          </Animated.View>
        )}

        <Pressable style={styles.continueButton} onPress={nextStep}>
          <Text style={styles.buttonText}>{step < 2 ? "Continue" : "Submit"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fffff" },
  formHeading: { textAlign: "center", fontSize: 30, fontWeight: "bold", color: 'black' },
  stepContainer: { flexDirection: "row", alignItems: "center", position: "relative", marginBottom: 0 },
  greenIndicator: { height: 10, width: 5, backgroundColor: "#2fd52d", borderRadius: 15, position: "absolute", left: 0, paddingVertical: 15 },
  circle: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 10 },
  buttonRow: { flexDirection: "row", gap: 20, marginTop: 80 },
  backButton: { backgroundColor: "#c4b5fd", padding: 15, borderRadius: 22, paddingHorizontal: 25 },
  continueButton: { backgroundColor: "#5328e8", display: "flex", alignItems: "center", padding: 15, borderRadius: 22, width: "60%", textAlign: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  input: { height: 40, borderColor: "black", color: "black", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  formContainer: { backgroundColor: "", width: 300, borderRadius: 8, padding: 50, },
  disclaimer: { color: "grey", marginTop: 10, textAlign: "center", fontStyle: "italic" },
  roleContainer: {borderRadius: 5,backgroundColor: '#c4b5fd',display: "flex",alignItems: "center",justifyContent: "center",width: 200,height: 200,},



});
