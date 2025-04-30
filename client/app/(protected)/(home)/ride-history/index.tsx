import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface RideHistoryScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

// Ride data interface with role information
interface RideData {
  id: string;
  date: string;
  time: string;
  route:string;
  driver: string;
  passenger?: string; // Added for driver's perspective
  price: string;
  status: 'completed' | 'canceled';
  avatarUrl: string;
  role: 'driver' | 'passenger'; // Added to distinguish between roles
}

export default function RideHistoryScreen({ navigation }: RideHistoryScreenProps) {
  const [role, setRole] = useState<'driver' | 'passenger'>('passenger');
  
  const [rideHistory, setRideHistory] = useState<RideData[]>([
    // Passenger rides
    {
      id: '1',
      date: 'April 27, 2025',
      time: '8:30 AM',
      route:'Mochi Morh - GC - Millinium - Fast',
      driver: 'John Smith',
      price: '$12.50',
      status: 'completed',
      avatarUrl: 'https://via.placeholder.com/40',
      role: 'passenger'
    },
    {
      id: '2',
      date: 'April 25, 2025',
      time: '5:45 PM',
      route:'Disco Bakery - Milliium - Drigh rd - Fast',
      driver: 'Sarah Johnson',
      price: '$13.25',
      status: 'completed',
      avatarUrl: 'https://via.placeholder.com/40',
      role: 'passenger'
    },
    // Driver rides
    {
      id: '3',
      date: 'April 23, 2025',
      time: '9:15 AM',
      route: 'north nazimabad - aysha manzil - gc - fast',
      driver: 'You',
      passenger: 'Mike Anderson',
      price: '$18.75',
      status: 'completed',
      avatarUrl: 'https://via.placeholder.com/40',
      role: 'driver'
    },
    {
      id: '4',
      date: 'April 22, 2025',
      time: '7:00 PM',
      route: 'north nazimabad - aysha manzil - gc - fast',
      driver: 'You',
      passenger: 'Lisa Chen',
      price: '$17.50',
      status: 'completed',
      avatarUrl: 'https://via.placeholder.com/40',
      role: 'driver'
    },
    {
      id: '5',
      date: 'April 20, 2025',
      time: '3:30 PM',
      route: 'north nazimabad - aysha manzil - gc - fast',
      driver: 'Robert Davis',
      price: '$8.25',
      status: 'canceled',
      avatarUrl: 'https://via.placeholder.com/40',
      role: 'passenger'
    },
  ]);

  const bookSimilarRide = (ride: RideData) => {
    console.log(`Booking similar ride for route ${ride.route}`);
  };

  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'canceled'>('all');
  
  // Filter rides by role and status
  const filteredRides = rideHistory.filter(ride => {
    const roleMatch = ride.role === role;
    const statusMatch = filterStatus === 'all' || ride.status === filterStatus;
    return roleMatch && statusMatch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ride History</Text>
      </View>

      {/* Role Toggle */}
      <View style={styles.roleToggleContainer}>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'passenger' && styles.activeRole]}
          onPress={() => setRole('passenger')}
        >
          <Text style={[styles.roleText, role === 'passenger' && styles.activeRoleText]}>Passenger</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'driver' && styles.activeRole]}
          onPress={() => setRole('driver')}
        >
          <Text style={[styles.roleText, role === 'driver' && styles.activeRoleText]}>Driver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]} 
          onPress={() => setFilterStatus('all')}
        >
          <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filterStatus === 'completed' && styles.activeFilter]} 
          onPress={() => setFilterStatus('completed')}
        >
          <Text style={[styles.filterText, filterStatus === 'completed' && styles.activeFilterText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filterStatus === 'canceled' && styles.activeFilter]} 
          onPress={() => setFilterStatus('canceled')}
        >
          <Text style={[styles.filterText, filterStatus === 'canceled' && styles.activeFilterText]}>Canceled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ridesList}>
        {filteredRides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <View style={styles.rideHeader}>
              <Text style={styles.rideDate}>{ride.date} • {ride.time}</Text>
              <Text style={[
                styles.rideStatus, 
                ride.status === 'completed' ? styles.statusCompleted : styles.statusCanceled
              ]}>
                {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routeMarkers}>
                
                <View style={styles.markerDot} />
            
              </View>
              
              <View style={styles.routeDetails}>
                <Text style={styles.routePoint}>Route: {ride.route}</Text>
              </View>
            </View>
            
            <View style={styles.rideInfo}>
              <View style={styles.driverInfo}>
                <Image 
                  source={{ uri: ride.avatarUrl }} 
                  style={styles.driverAvatar} 
                />
                <Text style={styles.driverName}>
                  {ride.role === 'driver' ? ride.passenger : ride.driver}
                </Text>
              </View>
              
            </View>
            
            <View style={styles.actionsContainer}>
              {role === 'passenger' && (
                <TouchableOpacity 
                  style={styles.bookAgainButton}
                  onPress={() => bookSimilarRide(ride)}
                >
                  <Text style={styles.bookAgainText}>Book Again</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsText}>Details</Text>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  roleToggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeRole: {
    backgroundColor: '#8b5cf6',
  },
  roleText: {
    color: '#D3D3D3',
    fontWeight: '500',
  },
  activeRoleText: {
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#8b5cf6',
  },
  activeFilter: {
    backgroundColor: 'indigo',
  },
  filterText: {
    fontWeight: '500',
    color: 'white',
  },
  activeFilterText: {
    color: 'white',
  },
  ridesList: {
    flex: 1,
  },
  rideCard: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rideDate: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  rideStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusCompleted: {
    color: '#4CAF50',
  },
  statusCanceled: {
    color: '#F44336',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: -10,
  },
  routeMarkers: {
    width: 24,
    alignItems: 'center',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8b5cf7',
    marginTop: 6,
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 64,
  },
  routePoint: {
    fontSize: 16,
    color: '#8b5cf6',
    marginBottom: 4,
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginBottom: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  driverName: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookAgainButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  bookAgainText: {
    color: 'white',
    fontWeight: '500',
  },
  detailsButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsText: {
    color: 'white',
    fontWeight: '500',
  },
});