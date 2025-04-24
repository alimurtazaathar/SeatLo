import { View, Text, StyleSheet ,Pressable} from 'react-native';
import React, { useRef, useState } from 'react';
import RidesBS from '@/components/Passenger/RidesBS';
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
        <Pressable style={{padding:15,borderRadius:10,backgroundColor:'#F7C846',marginBottom:10}}><Text style={{color:'black',textAlign:'center',fontWeight:'bold'}}>+ Lesss Go</Text><Text style={{fontSize:10,textAlign:'center'}}>In a hurry? Leave it on us</Text></Pressable>
        
        <Text style={styles.headerText}>Rides Near You</Text>
        <Text style={{fontSize:10,color:'white',marginBottom: 10,}}>Choose rides based on your preference</Text>
        
       
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

  },
});
