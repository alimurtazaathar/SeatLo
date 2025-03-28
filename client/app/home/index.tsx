import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DriverRidesBS from '@/components/PassengerRideBS'; 
import RidesBS from '@/components/RidesBS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, IconButton, Menu, FAB } from 'react-native-paper';
import RideItems from '@/components/RideItem';

// Passenger Rides Array
const rides = [
  { id: 1, name: 'Umer Nadeem', rating: 5, location: 'GC', car: 'Alto', additionalDetails: 'Reliable driver with excellent service' },
  { id: 2, name: 'Abdurrahman Amir', rating: 4, location: 'Mochi Morh', car: 'Prius', additionalDetails: 'Comfortable ride with smooth driving' },
  { id: 3, name: 'Ali Murtaza', rating: 5, location: 'Gabol Colony', car: 'Vitz', additionalDetails: 'Friendly driver, always on time' },
];

// Driver Rides Array
const driverRides = [
  {
    id: 1,
    destination: 'DHA Phase 5',
    departureTime: '8:00 AM',
    availableSeats: 3,
    route: 'Main Boulevard, Johar Town, DHA',
    vehicleDetails: 'Honda Civic 2020',
    passengers: [
      { name: 'Ali', pickup: 'Model Town' },
      { name: 'Ahmed', pickup: 'Wapda Town' },
    ],
  },
  {
    id: 2,
    destination: 'Liberty Market',
    departureTime: '9:30 AM',
    availableSeats: 2,
    route: 'Kalma Chowk, Liberty',
    vehicleDetails: 'Toyota Corolla 2018',
    passengers: [{ name: 'Sara', pickup: 'Gulberg' }],
  },
];

const Home = () => {
  const bottomSheetRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isDriverMode, setIsDriverMode] = useState(false); // Mode state

  // Open Bottom Sheet based on Mode
  const openBottomSheet = (ride) => {
    setSelectedRide(ride);
    setTimeout(() => {
      (bottomSheetRef.current as any)?.expand();
    }, 100);
  };

  // Toggle Mode Function
  const toggleMode = () => {
    setIsDriverMode(!isDriverMode);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.textColor}>
              {isDriverMode ? 'Welcome Driver' : 'Welcome Passenger'}
            </Text>
          </View>

          <View style={styles.ridesContainer}>
            <Text style={{ color: '#fff' }}>
              {isDriverMode ? 'Available Rides to Host' : 'Rides near you'}
            </Text>
            {isDriverMode
              ? driverRides.map((ride) => (
                  <RideItems
                    key={ride.id}
                    id={ride.id}
                    name={ride.destination}
                    location={ride.route}
                    onPress={() => openBottomSheet(ride)}
                  />
                ))
              : rides.map((ride) => (
                  <RideItems
                    key={ride.id}
                    id={ride.id}
                    name={ride.name}
                    location={ride.location}
                    onPress={() => openBottomSheet(ride)}
                  />
                ))}
          </View>

          {/* Conditionally Render Bottom Sheets */}
          {isDriverMode ? (
            <DriverRidesBS ref={bottomSheetRef} ride={selectedRide} />
          ) : (
            <RidesBS ref={bottomSheetRef} ride={selectedRide} />
          )}

          {/* Floating Action Button */}
          <FAB
            icon={isDriverMode ? "car" : "steering"}
            label={isDriverMode ? "Switch to Passenger" : "Switch to Driver"}
            style={styles.fab}
            onPress={toggleMode}
            color="#fff"
          />
        </SafeAreaView>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textColor: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  ridesContainer: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F7C846',
  },
});
