// Developing a caching mechanims any time the user comes to this page we save it so that
//we dont see loading again and again on revists



import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import DriverRidesBS from '@/components/DriverRideBS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RideItems from '@/components/RideItem';

const driverRides = [
  {
    id: 1,
    destination: 'DHA Phase 5',
    departureTime: '8:00 AM',
    availableSeats: 3,
    route: 'Johar Town, DHA',
    vehicleDetails: 'Honda Civic 2020',
    passengers: [
      { name: 'Ali', pickup: 'Model Town' },
      { name: 'Ahmed', pickup: 'Gulshan Block 4 Town' },
    ],
  },
  {
    id: 2,
    destination: 'Liberty Market',
    departureTime: '9:30 AM',
    availableSeats: 2,
    route: 'Madras Chowk, Liberty',
    vehicleDetails: 'Toyota Corolla 2018',
    passengers: [{ name: 'Sara', pickup: 'Gulberg' }],
  },
];

const DriverHome = () => {
  const bottomSheetRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState(null);

  const openBottomSheet = (ride: any) => {
    setSelectedRide(ride);
    setTimeout(() => {
      (bottomSheetRef.current as any)?.expand();
    }, 100);
  };

  return (
      <View style={styles.container}>
        <View><Text style={{color:'white',textAlign:'center',borderWidth:2,borderColor:'white'}}>Some stats here</Text></View>
        <Text style={styles.headerText}>Available Rides to Host</Text>
        {driverRides.map((ride) => (
          <RideItems
            key={ride.id}
            id={ride.id}
            name={ride.destination}
            location={ride.route}
            onPress={() => openBottomSheet(ride)}
          />
        ))}
      <DriverRidesBS ref={bottomSheetRef} ride={selectedRide} />
      </View>

  );
};

export default DriverHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%'
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
