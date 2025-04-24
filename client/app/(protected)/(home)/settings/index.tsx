import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from "expo-router";
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Profile: undefined;
  PaymentMethods: undefined;
  SavedLocations: undefined;
  VehicleInfo: undefined;
  Contact: undefined;
  Complaint: undefined;
  FAQ: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type SettingsItemProps = {
  title: string;
  icon: any; 
  onPress?: () => void;
  type?: 'navigate' | 'toggle';
  value?: boolean;
  onValueChange?: Dispatch<SetStateAction<boolean>>;
};

const SettingsItem = ({ 
  title, 
  icon, 
  onPress = () => {},
  type = 'navigate', 
  value, 
  onValueChange 
}: SettingsItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={type === 'toggle'}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={24} color="#4A80F0" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {type === 'navigate' && (
          <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
        )}
        {type === 'toggle' && value !== undefined && onValueChange && (
          <Switch 
            value={value} 
            onValueChange={onValueChange}
            trackColor={{ false: "#E0E0E0", true: "#4A80F0" }}
            thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: '#141414',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>
          <SettingsItem 
            title="Personal Information" 
            icon="person-outline" 
            onPress={() => router.replace('/(app)/(home)/settings/profile')}
          />
          <SettingsItem 
            title="Payment Methods" 
            icon="card-outline" 
            onPress={() =>  router.replace('/(app)/(home)/settings/paymentmethods')}
          />
          <SettingsItem 
            title="Saved Locations" 
            icon="location-outline" 
            onPress={() => router.replace('/(app)/(home)/settings/savedLocations')}
          />
          <SettingsItem 
            title="Vehicle Information" 
            icon="car-outline" 
            onPress={() => router.replace('/(app)/(home)/settings/VehicleInfo')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <SettingsItem 
            title="Notifications" 
            icon="notifications-outline" 
            type="toggle"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            onPress={() => {}} // Add empty onPress to satisfy TypeScript
          />
          <SettingsItem 
            title="Dark Mode" 
            icon="moon-outline" 
            type="toggle"
            value={darkMode}
            onValueChange={setDarkMode}
            onPress={() => {}} // Add empty onPress to satisfy TypeScript
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Support</Text>
          <SettingsItem 
            title="Contact Us" 
            icon="mail-outline" 
            onPress={() =>  router.replace('/(app)/(home)/contact')}
          />
          <SettingsItem 
            title="Submit a Complaint" 
            icon="warning-outline" 
            onPress={() =>  router.replace('/(app)/(home)/settings/profile')}
          />
          <SettingsItem 
            title="FAQ" 
            icon="help-circle-outline" 
            onPress={() =>  router.replace('/(app)/(home)/settings/profile')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Legal</Text>
          <SettingsItem 
            title="Privacy Policy" 
            icon="shield-outline" 
            onPress={() =>  router.replace('/(app)/(home)/settings/profile')}
          />
          <SettingsItem 
            title="Terms of Service" 
            icon="document-text-outline" 
            onPress={() => router.replace('/(app)/(home)/settings/profile')}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#222222',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#FF5252',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#999999',
    marginBottom: 32,
  }
});

export default SettingsScreen;