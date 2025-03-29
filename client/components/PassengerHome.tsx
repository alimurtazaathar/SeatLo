import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import RidesBS from '@/components/RidesBS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RideItems from '@/components/RideItem';

const rides = [
  { id: 1, name: 'Umer Nadeem', rating: 5, location: 'GC', car: 'Alto', additionalDetails: 'Reliable driver with excellent service' },
  { id: 2, name: 'Abdurrahman Amir', rating: 4, location: 'Mochi Morh', car: 'Prius', additionalDetails: 'Comfortable ride with smooth driving' },
  { id: 3, name: 'Ali Murtaza', rating: 5, location: 'Gabol Colony', car: 'Vitz', additionalDetails: 'Friendly driver, always on time' },
];

const PassengerHome = () => {
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
        <Text style={styles.headerText}>Rides Near You</Text>
        {rides.map((ride) => (
          <RideItems
            key={ride.id}
            id={ride.id}
            name={ride.name}
            location={ride.location}
            onPress={() => openBottomSheet(ride)}
          />
        ))}
      <RidesBS ref={bottomSheetRef} ride={selectedRide} />
      </View>

  );
};

export default PassengerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
