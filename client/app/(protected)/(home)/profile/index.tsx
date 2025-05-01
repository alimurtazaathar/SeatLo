import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profileImage: string | null;
}

// Define props interface for the component
interface EditProfileScreenProps {
  navigation: any;
}

const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const params = useLocalSearchParams();
  
  // Parse the user information from params
  const userInfo = params.userInfo ? JSON.parse(params.userInfo as string) : {};
  
  // Initialize profile with values from params
  const [profile, setProfile] = useState<UserProfile>({
    fullName: userInfo.fullName || 'John Doe',
    email: userInfo.email || 'john.doe@example.com',
    phoneNumber: '+1 555-123-4567', // Default since this may not be in params
    gender: 'Male', // Default since this may not be in params
    profileImage: userInfo.profileImage || null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // Set initial validation states based on profile values
  useEffect(() => {
    setIsEmailValid(validateEmail(profile.email));
    setIsPhoneValid(validatePhone(profile.phoneNumber));
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic validation - can be enhanced based on requirements
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));

    // Validate as user types
    if (field === 'email') {
      setIsEmailValid(validateEmail(value));
    } else if (field === 'phoneNumber') {
      setIsPhoneValid(validatePhone(value));
    }
  };

  const selectGender = (gender: string) => {
    setProfile(prev => ({ ...prev, gender }));
    setShowGenderModal(false);
  };

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to change your profile picture.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfile(prev => ({ ...prev, profileImage: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was a problem selecting your image. Please try again.');
    }
  };

  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera permissions to take a profile picture.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfile(prev => ({ ...prev, profileImage: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'There was a problem capturing your image. Please try again.');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const saveProfile = () => {
    // Validate before saving
    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isPhoneValid) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated.',
        [{ text: 'OK', onPress: () => navigation?.goBack() }]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <TouchableOpacity onPress={showImageOptions} style={styles.profileImageContainer}>
            {profile.profileImage ? (
              <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={64} color="#8b5cf6" />
              </View>
            )}
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Form */}
        <View style={styles.formContainer}>
          {/* Full Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={profile.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                placeholder="Enter your full name"
                placeholderTextColor="#777777"
              />
            </View>
          </View>
          
          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputContainer, !isEmailValid && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#777777"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!isEmailValid && (
                <Ionicons name="alert-circle" size={24} color="#FF3B30" style={styles.errorIcon} />
              )}
            </View>
            {!isEmailValid && (
              <Text style={styles.errorText}>Please enter a valid email address</Text>
            )}
          </View>
          
          {/* Phone Number Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[styles.inputContainer, !isPhoneValid && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={profile.phoneNumber}
                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#777777"
                keyboardType="phone-pad"
              />
              {!isPhoneValid && (
                <Ionicons name="alert-circle" size={24} color="#FF3B30" style={styles.errorIcon} />
              )}
            </View>
            {!isPhoneValid && (
              <Text style={styles.errorText}>Please enter a valid phone number</Text>
            )}
          </View>
          
          {/* Gender Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity 
              style={styles.genderSelector}
              onPress={() => setShowGenderModal(true)}
            >
              <Text style={styles.genderText}>{profile.gender}</Text>
              <Ionicons name="chevron-down" size={24} color="#8b5cf6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={saveProfile}
          disabled={isLoading || !isEmailValid || !isPhoneValid}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        {/* Gender Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showGenderModal}
          onRequestClose={() => setShowGenderModal(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Gender</Text>
                <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                  <Ionicons name="close" size={24} color="#8b5cf6" />
                </TouchableOpacity>
              </View>
              
              {genderOptions.map((gender, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.genderOption,
                    profile.gender === gender && styles.selectedGenderOption
                  ]}
                  onPress={() => selectGender(gender)}
                >
                  <Text style={[
                    styles.genderOptionText,
                    profile.gender === gender && styles.selectedGenderOptionText
                  ]}>
                    {gender}
                  </Text>
                  {profile.gender === gender && (
                    <Ionicons name="checkmark" size={24} color="#8b5cf6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#141414',
  },
  formContainer: {
    paddingHorizontal: 24,
    width: '100%', // Ensure container takes full width
  },
  inputGroup: {
    marginBottom: 24,
    width: '100%', // Ensure input group takes full width
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    borderRadius: 8,
    width: '100%', // Ensure input container takes full width // Add border for better visibility
    borderColor: '#333333', // Subtle border color
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
    fontSize: 16,
    width: '100%', // Ensure input takes full width
    backgroundColor: '#222222', // Match background for autofill consistency
    borderRadius:8,
    paddingLeft:10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  genderSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222222',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    width: '100%', // Ensure gender selector takes full width
    borderWidth: 1, // Add border for consistency with other inputs
    borderColor: '#333333',
  },
  genderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 24,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 48,
    width: '100%', // Make button take full available width
    maxWidth: '100%', // Limit max width to prevent overflow
    alignSelf: 'center', // Center the button
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#222222',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  genderOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedGenderOption: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedGenderOptionText: {
    fontWeight: '600',
    color: '#8b5cf6',
  },
  // Add a focused input state style
  inputFocused: {
    borderColor: '#8b5cf6',
    borderWidth: 1,
  },
});