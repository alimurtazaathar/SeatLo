import { View, Text, StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

// Driver-specific interface
interface DriverRideDetails {
  id: number;
  destination: string;
  departureTime: string;
  availableSeats: number;
  route?: string;
  vehicleDetails?: string;
  passengers?: { name: string; pickup: string }[];
}

interface Props {
  ride: DriverRideDetails | null;
}

const DriverRidesBS = forwardRef<BottomSheet, Props>(({ ride }, ref) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const router = useRouter();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('DriverBottomSheet index changed:', index);
  }, []);
  
  if (!ride) return null;

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Destination */}
        <Text style={styles.titleText}>{ride.destination}</Text>

        {/* Ride Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.infoText}>Departure Time: {ride.departureTime}</Text>
          <Text style={styles.infoText}>Available Seats: {ride.availableSeats}</Text>

          {/* Route Information */}
          {ride.route && (
            <Text style={styles.infoText}>Route: {ride.route}</Text>
          )}

          {/* Vehicle Details */}
          {ride.vehicleDetails && (
            <Text style={styles.infoText}>Vehicle: {ride.vehicleDetails}</Text>
          )}

          {/* Passengers */}
          {ride.passengers && ride.passengers.length > 0 && (
            <View style={styles.passengersSection}>
              <Text style={styles.sectionTitle}>Passengers:</Text>
              {ride.passengers.map((passenger, index) => (
                <Text key={index} style={styles.passengerText}>
                  {passenger.name} - Pickup: {passenger.pickup}
                </Text>
              ))}
            </View>
          )}
        </View>
        
        {/* Manage Ride Button */}
        <Pressable 
          onPress={() => router.push('/auth/driver_auth')}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Manage Ride</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    gap: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsSection: {
    width: '100%',
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  passengersSection: {
    marginTop: 10,
    gap: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  passengerText: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#8b5cf6',
    padding: 15,
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverRidesBS;