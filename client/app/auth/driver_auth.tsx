import {View,Text,TextInput,StyleSheet} from 'react-native';
import React,{ useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Pressable,TouchableOpacity } from 'react-native';


const DriverAuth = () => {
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [car,setCar] = useState("");
    const [LicensePlate,setLicensePlate] = useState("");
    const [ gender,setGender] = useState("");

    const handleSubmit = () => {
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Car Model:', car);
        console.log('License Plate:', LicensePlate);
        console.log('Gender:', gender);
      };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sorry to Slow you Down</Text>
            <Text style={styles.title}>Enter Details To register yourself</Text>

            <TextInput style = {styles.textinput} placeholder='Enter your Email' placeholderTextColor="#888" keyboardType='email-address' value={email} onChangeText={setEmail}/>
            <TextInput style = {styles.textinput} placeholder='Enter your Phone Number' placeholderTextColor="#888" keyboardType='phone-pad' value={phone} onChangeText={setPhone}/>
            <TextInput style = {styles.textinput} placeholder='Enter your CarModel' placeholderTextColor="#888" value={car} onChangeText={setCar}/>
            <TextInput style = {styles.textinput} placeholder='Enter your License Plate' placeholderTextColor="#888" value={LicensePlate} onChangeText={setLicensePlate}/>
            <Text style={styles.label}>Select Gender:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, gender === 'Male' && styles.selectedRadio]}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, gender === 'Female' && styles.selectedRadio]}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Register as Driver</Text>
      </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textinput: {
        width: '100%',
        backgroundColor: '#222',
        color: 'white',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
      },
    container: {
      backgroundColor: '#141414',
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      backgroundColor: '#222',
      color: 'white',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
    },
    label: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    radioButton: {
      flex: 1,
      padding: 15,
      backgroundColor: '#222',
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    selectedRadio: {
      backgroundColor: '#8b5cf6',
    },
    radioText: {
      color: 'white',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#8b5cf6',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default DriverAuth;