import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';

interface Driver {
  id: number;
  name: string;
  route: string;
  car: string;
  seats: number;
  ratings: number;
}

interface Passenger {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  ratings: number;
}

type User = Driver | Passenger;

const drivers: Driver[] = [
  { id: 1, name: 'John Doe', route: 'Downtown - Airport', car: 'Honda Civic 2020', seats: 3, ratings: 5 },
  { id: 2, name: 'Sarah Smith', route: 'Gulberg - Liberty', car: 'Toyota Corolla 2018', seats: 2, ratings: 4 },
];

const passengers: Passenger[] = [
  { id: 101, name: 'Ali', pickup: 'Model Town', destination: 'DHA Phase 5', ratings: 3 },
  { id: 102, name: 'Ahmed', pickup: 'Gulshan Block 4', destination: 'DHA Phase 5', ratings: 4 },
];

export default function UserList() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderUserCard = (user: User) => {
    const isExpanded = expandedId === user.id;
    
    return (
      <TouchableOpacity 
        key={user.id}
        onPress={() => toggleExpand(user.id)} 
        style={[styles.card, isExpanded && styles.expandedCard]}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {'route' in user ? '🚗 Driver' : '👤 Passenger'} 
          </Text>
          <Text style={styles.ratings}>🌟 {user.ratings}/5</Text>
        </View>
        
        <Text style={styles.nameText}>{user.name}</Text>
        
        {'route' in user ? (
          <Text style={styles.cardText}>📍 Route: {user.route}</Text>
        ) : (
          <Text style={styles.cardText}>📍 Pickup: {user.pickup}</Text>
        )}
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            {'car' in user && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Car:</Text>
                <Text style={styles.detailText}>{user.car}</Text>
              </View>
            )}
            {'seats' in user && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Seats:</Text>
                <Text style={styles.detailText}>{user.seats}</Text>
              </View>
            )}
            {'pickup' in user && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Destination:</Text>
                <Text style={styles.detailText}>{user.destination}</Text>
              </View>
            )}
            {'route' in user && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Route Details:</Text>
                <Text style={styles.detailText}>{user.route}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Drivers Section */}
      <Text style={styles.sectionTitle}>Drivers ({drivers.length})</Text>
      {drivers.map(driver => renderUserCard(driver))}
      
      {/* Passengers Section */}
      <Text style={styles.sectionTitle}>Passengers ({passengers.length})</Text>
      {passengers.map(passenger => renderUserCard(passenger))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#141414',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 5,
  },
  card: {
    backgroundColor: '#141414',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandedCard: {
    backgroundColor: '#252525',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b5cf6',
    textTransform: 'uppercase',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 8,
  },
  ratings: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  cardText: {
    fontSize: 15,
    color: '#d4d4d4',
    marginBottom: 5,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8b5cf6',
    width: 120,
  },
  detailText: {
    fontSize: 15,
    color: '#e2e8f0',
    flex: 1,
  },
});