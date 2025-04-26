// Developing a caching mechanims any time the user comes to this page we save it so that
//we dont see loading again and again on revists



import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import DriverRideHistory from '@/components/Driver/DriverRideHistory';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import RideItems from '@/components/Driver/RideItem';
import AddRide from './AddRide';
import BottomSheet from "@gorhom/bottom-sheet"; 
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
  const addRideSheetRef=useRef<BottomSheet>(null);
  const [selectedRide, setSelectedRide] = useState(null);

  const openBottomSheet = (ride: any) => {
    setSelectedRide(ride);
    setTimeout(() => {
      (bottomSheetRef.current as any)?.expand();
    }, 100);
  };
  const addRide = () => {
   addRideSheetRef.current?.expand();
   
  };
  const handleFormSubmit = (data: any) => {
    console.log('Submitted form data:', data);
  };

  return (
      <View style={styles.container}>
        {/* <View><Text style={{color:'white',textAlign:'center',borderWidth:2,borderColor:'white'}}>Some stats here</Text></View> */}
        <Pressable style={{padding:15,borderRadius:10,backgroundColor:'#F7C846',marginBottom:15}} onPress={addRide}><Text style={{color:'black',textAlign:'center'}}>+ Add a ride</Text></Pressable>
        <Text style={styles.headerText}>History</Text>
        {driverRides.map((ride) => (
          <RideItems
            key={ride.id}
            id={ride.id}
            name={ride.destination}
            location={ride.route}
            onPress={() => openBottomSheet(ride)}
            onReuse={()=>addRide()}
          />
        ))}

      <DriverRideHistory ref={bottomSheetRef} ride={selectedRide} />
      <AddRide ref={addRideSheetRef} onSubmit={handleFormSubmit} />
      </View>

  );
};

export default DriverHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    // borderWidth:2,
    // borderColor:'white',
    paddingHorizontal:10,
    // top:0
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
