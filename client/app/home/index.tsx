import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState,useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RidesBS from '@/components/RidesBS';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { PaperProvider, IconButton, Menu } from 'react-native-paper';
import RideItems from '@/components/RideItem';
import HamburgerMenu from '@/components/HamburgerMenu';


const rides = [
  {id: 1, name: 'Umer Nadeem', rating: 5, location: 'GC', car: 'Alto',additionalDetails: 'Reliable driver with excellent service' },
  { id: 2, name: 'Abdurrahman Amir', rating: 4, location: 'Mochi Morh', car: 'Prius',additionalDetails: 'Comfortable ride with smooth driving' },
  { id: 3, name: 'Ali Murtaza', rating: 5, location: 'Gabol Colony', car: 'Vitz',additionalDetails: 'Friendly driver, always on time' },
];

interface Ride {
  id: number;
  name: string;
  rating: number;
  location: string;
  car: string;
  additionalDetails?: string;
}

const Home = () => {
  const bottomSheetRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState<Ride|null>(null);
  const openBottomSheet = (ride:Ride) => {
    setSelectedRide(ride);
    setTimeout(() => {
      (bottomSheetRef.current as any)?.expand(); // Use type assertion
    }, 100);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={{marginLeft:'auto'}}>
            <HamburgerMenu />
          </View>

          <View>
            <Text style={styles.textColor}>Welcome User</Text>
          </View>
          <Pressable style={{backgroundColor:'#F7C846',padding: 20,borderRadius:20}}><Text>Switch to Driver</Text></Pressable>
          <View style={styles.ridesContainer}>
            <Text style={{color:'#fff'}}>Rides near you</Text>
            {rides.map((ride) => (
              <RideItems 
                key={ride.id} 
                id={ride.id} 
                name={ride.name} 
                location={ride.location} 
                onPress={() => openBottomSheet(ride)} 
              />
            ))}
          </View>

           {/* Bottom Sheet for Ride Details */}
           <RidesBS ref={bottomSheetRef} ride={selectedRide} />

          {/* A switch modes button */}
          {/* <View></View> */}
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColor: {
    color: 'white',
  },
  ridesContainer: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 20,
  },
});