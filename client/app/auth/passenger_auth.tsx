import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, TouchableOpacity } from 'react-native';

const PassAuth = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Gender:', gender);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sorry to slow you down!</Text>
      <Text style={styles.title}>Please enter details to proceed</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

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

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default PassAuth;
