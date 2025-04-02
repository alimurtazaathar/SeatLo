import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, BackHandler, TouchableOpacity, TextInput 
} from "react-native";
import { useRouter } from "expo-router";
import UserList from "./UserList";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AdminHome() {
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const router = useRouter();

  const modalOpacity = useSharedValue(1);
  const modalScale = useSharedValue(1);
  const dashboardOpacity = useSharedValue(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (showAuthModal && !isAuthenticated) {
        router.replace("/");
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [showAuthModal, isAuthenticated]);

  const authenticatePass = () => {
    if (password === "1234") {
      setAuthMessage("Welcome To the Admin Page");

     
      modalOpacity.value = withTiming(0, { duration: 500 });
      modalScale.value = withTiming(0.8, { duration: 500 });

      setTimeout(() => {
        setIsAuthenticated(true);
        setShowAuthModal(false);

        
        dashboardOpacity.value = withTiming(1, { duration: 500 });
      }, 500);
    } else {
      setAuthMessage("Incorrect Password, please try again");
    }
  };

  const handleBackToMain = () => {
    setShowAuthModal(false);
    router.replace("/");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setPassword("");
    setAuthMessage("");

    
    modalOpacity.value = 1;
    modalScale.value = 1;
    dashboardOpacity.value = 0;
  };

  
  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ scale: modalScale.value }],
  }));

  const dashboardStyle = useAnimatedStyle(() => ({
    opacity: dashboardOpacity.value,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>

        {/* Authentication Modal */}
        {showAuthModal && !isAuthenticated && (
          <Animated.View style={[styles.modalOverlay, modalStyle]}>
            <Animated.View style={[styles.modalContent, modalStyle]}>
              <Text style={styles.modalTitle}>Admin Authentication</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter Admin Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              {authMessage ? (
                <Text style={styles.errorMessage}>{authMessage}</Text>
              ) : null}

              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.backButton]} 
                  onPress={handleBackToMain}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.loginButton]} 
                  onPress={authenticatePass}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}

        {/* Admin Dashboard */}
        {isAuthenticated && (
          <Animated.View style={[styles.adminContainer, dashboardStyle]}>
            <Text style={styles.heading}>Admin Dashboard</Text>
            <UserList/>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1f1f1f',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    minWidth: '45%',
  },
  loginButton: {
    backgroundColor: '#8b5cf6',
  },
  backButton: {
    backgroundColor: '#64748b',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 10,
    textAlign: "center",
    color: "#f87171",
  },
  adminContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
});

