import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const ComplaintScreen = ({}) => {
  const [category, setCategory] = useState('app');
  const [severity, setSeverity] = useState('medium');
  const [tripId, setTripId] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [recentTrips, setRecentTrips] = useState([
    { Route: 'Mochi-Morh-GC-Millenium-Fast', date: '2025-04-15', driver: 'Abdurrahman'},
    { Route: 'Disco-GC-millenium-Fast', date: '2025-04-12', driver: 'Ali' },
    { Route: 'North-GC-Millenium-Fast', date: '2025-04-09', driver: 'Hamza' },
  ]);

  const categoryOptions = [
    { label: 'App Issue', value: 'app' },
    { label: 'Driver Behavior', value: 'driver' },
    { label: 'Vehicle Condition', value: 'vehicle' },
    { label: 'Billing Problem', value: 'billing' },
    { label: 'Safety Concern', value: 'safety' },
  ];

  const severityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  const handleTripSelect = (id:any) => {
    setTripId(id);
  };

  const handleAddPhoto = () => {
    Alert.alert('Feature', 'Photo upload would be implemented here');
  };

  const handleSelectCategory = (value:any) => {
    setCategory(value);
    setShowCategoryDropdown(false);
  };

  const handleSelectSeverity = (value:any) => {
    setSeverity(value);
    setShowSeverityDropdown(false);
  };

      
      const handleSubmit = () => {
        if (!category || !description) {
          Alert.alert('Error', 'Please fill in all required fields');
          return;
        }
    
        setSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
          setSubmitting(false);
          
          // Generate a random complaint ID
          const complaintId = 'C' + Math.floor(100000 + Math.random() * 900000);
          
          Alert.alert(
            'Complaint Submitted',
            `Your complaint has been registered with ID: ${complaintId}. We'll investigate and get back to you within 48 hours.`,
            [{ text: 'OK', onPress: () => {
              // Reset form
              setCategory('app');
              setSeverity('medium');
              setTripId('');
              setDescription('');
              
              
              router.replace("/complaint");
            }}]
          );
        }, 1500);
      };

  // Helper function to get label from value
  const getLabelFromValue = (options:any, value:any) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>
          Submit a Complaint
        </Text>
        <Text style={styles.headerDescription}>
          We take all feedback seriously and will address your concerns promptly.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Complaint Details</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Category *</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <Text style={styles.dropdownButtonText}>
              {getLabelFromValue(categoryOptions, category)}
            </Text>
            <Ionicons 
              name={showCategoryDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#555555" 
            />
          </TouchableOpacity>
          
          {showCategoryDropdown && (
            <View style={styles.dropdownList}>
              {categoryOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.dropdownItem,
                    category === item.value && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectCategory(item.value)}
                >
                  <Text 
                    style={[
                      styles.dropdownItemText,
                      category === item.value && styles.dropdownItemTextSelected
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <Text style={styles.label}>Severity</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowSeverityDropdown(!showSeverityDropdown)}
          >
            <Text style={styles.dropdownButtonText}>
              {getLabelFromValue(severityOptions, severity)}
            </Text>
            <Ionicons 
              name={showSeverityDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#555555" 
            />
          </TouchableOpacity>
          
          {showSeverityDropdown && (
            <View style={styles.dropdownList}>
              {severityOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.dropdownItem,
                    severity === item.value && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectSeverity(item.value)}
                >
                  <Text 
                    style={[
                      styles.dropdownItemText,
                      severity === item.value && styles.dropdownItemTextSelected
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <Text style={styles.label}>Related Trip (optional)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripScrollView}>
            {recentTrips.map((trip) => (
              <TouchableOpacity
                key={trip.Route}
                style={[
                  styles.tripItem,
                  tripId === trip.Route && styles.tripItemSelected
                ]}
                onPress={() => handleTripSelect(trip.Route)}
              >
                <Text style={styles.tripId}>{trip.Route}</Text>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripDriver}>{trip.driver}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.tripItem}>
              <Text style={styles.tripId}>Search</Text>
              <Ionicons name="search" size={16} color="#777777" />
            </TouchableOpacity>
          </ScrollView>
          
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            multiline
            placeholder="Please provide details about your complaint..."
            value={description}
            onChangeText={setDescription}
          />
          
          <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
            <Ionicons name="camera" size={24} color="#4A80F0" />
            <Text style={styles.photoText}>Add Photos/Screenshots</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              severity === 'critical' && styles.criticalButton
            ]}
            onPress={handleSubmit}
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitText}>Submit Complaint</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What happens next?</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.infoNumber}>
            <Text style={styles.infoNumberText}>1</Text>
          </View>
          <Text style={styles.infoText}>You'll receive a confirmation email with your complaint ID</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoNumber}>
            <Text style={styles.infoNumberText}>2</Text>
          </View>
          <Text style={styles.infoText}>Our support team will review your complaint within 24-48 hours</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoNumber}>
            <Text style={styles.infoNumberText}>3</Text>
          </View>
          <Text style={styles.infoText}>We'll contact you with a resolution or follow-up questions</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => Alert.alert('Emergency', 'For immediate assistance with safety issues, please call our emergency hotline at 1-800-CARPOOL-HELP')}
      >
        <Ionicons name="alert-circle" size={20} color="#FFFFFF" />
        <Text style={styles.emergencyText}>Emergency? Click here for immediate help</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  headerSection: {
    alignItems: 'center',
    padding: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 12,
    color: '#8b5cf6',
  },
  headerDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
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
    marginBottom: 16,
    color: '#8b5cf6',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#8b5cf6',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemSelected: {
    backgroundColor: '#E6EFFD',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownItemTextSelected: {
    color: '#4A80F0',
    fontWeight: '500',
  },
  tripScrollView: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tripItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripItemSelected: {
    backgroundColor: '#E6EFFD',
    borderColor: '#4A80F0',
    borderWidth: 1,
  },
  tripId: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333333',
  },
  tripDate: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
  },
  tripDriver: {
    fontSize: 12,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 140,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  photoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#4A80F0',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  criticalButton: {
    backgroundColor: '#FF3B30',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginHorizontal: 16,
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#8b5cf6',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoNumberText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#F0F5FF',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ComplaintScreen;