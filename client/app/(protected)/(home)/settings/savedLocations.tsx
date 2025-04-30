import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';

export default function SavedLocationsScreen() {
  // Sample data for saved locations - in a real app, this would come from a database or state management
  const [savedLocations, setSavedLocations] = useState([
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street, Anytown',
      favorite: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Business Ave, Downtown',
      favorite: true,
    },
    {
      id: '3',
      name: 'Gym',
      address: '789 Fitness Blvd, Westside',
      favorite: false,
    },
    {
      id: '4',
      name: 'Coffee Shop',
      address: '321 Brew Lane, Eastside',
      favorite: false,
    },
  ]);

  // Toggle favorite status
  const toggleFavorite = (id:any) => {
    setSavedLocations(
      savedLocations.map((location) =>
        location.id === id ? { ...location, favorite: !location.favorite } : location
      )
    );
  };

  // Delete a saved location
  const deleteLocation = (id:any) => {
    setSavedLocations(savedLocations.filter((location) => location.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.locationsList}>
        {savedLocations.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
            </View>
            
            <View style={styles.locationActions}>
              
              
              <TouchableOpacity 
                style={styles.useButton}
                onPress={() => console.log(`Using location: ${location.name}`)}
              >
                <Text style={styles.useButtonText}>Use</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteLocation(location.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  addButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationsList: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#8b5cf6',
  },
  locationAddress: {
    fontSize: 14,
    color: '#8b5cf6',
  },
  locationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  useButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  useButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});