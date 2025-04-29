import { View, Text, StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

// Driver-specific interface
interface DriverRideDetails {
  id: number;
  name: string;
  time: {hours:number,minutes:number}|{};
  seats: number;
  stops: string[];
  passengers?: { name: string; pickup: string }[];
}

interface Props {
  ride: DriverRideDetails ;
}

const DriverRideHistory = forwardRef<BottomSheet, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const router = useRouter();

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('DriverBottomSheet index changed:', index);
  }, []);
  // console.log('ride is',props.ride)
  if (!props.ride) return null;

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
        <Text style={styles.titleText}>Fast Nuces</Text>

        {/* Ride Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.infoText}>Departure Time: {props.ride?.time.hours}:{props.ride?.time.minutes}</Text>
          <Text style={styles.infoText}>Available Seats: {props.ride?.seats}</Text>

          {/* Route Information */}
          
            <Text style={styles.infoText}>Route: {props.ride?.stops.join('->')}</Text>
          

         {/* Fetch vehicle details(api related work) */}
          {/* {ride.vehicleDetails && (
            <Text style={styles.infoText}>Vehicle: {ride.vehicleDetails}</Text>
          )} */}

          {/* Passengers */}
          {props.ride?.passengers && props.ride?.passengers.length > 0 && (
            <View style={styles.passengersSection}>
              <Text style={styles.sectionTitle}>Passengers:</Text>
              {props.ride.passengers.map((passenger, index) => (<View key={index}> 
                <Text  style={styles.passengerText}>
                  {passenger.name} - Pickup: {passenger.pickup}
                </Text>
                <Pressable><Text style={{color:"black",padding:10,backgroundColor:'#ff6666',width:'40%',fontSize:12,borderRadius:10}}>Remind for payment</Text></Pressable></View>
              ))}
            </View>
          )}
        </View>
        
        {/* Manage Ride Button */}
        {/* <Pressable 
          onPress={() => router.push('/auth/driver_auth')}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>Manage Ride</Text>
        </Pressable> */}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    gap: 15,
    zIndex:20
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

export default DriverRideHistory;