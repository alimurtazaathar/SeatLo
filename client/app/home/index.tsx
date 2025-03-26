import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RidesBS from '@/components/RidesBS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { PaperProvider, IconButton, Menu } from 'react-native-paper';
import RideItems from '@/components/RideItem';
// TODO
// We want this page to have:
// - Tab with three dots at the top right
// - Location and name in the middle
// - Map in between
// - Available rides
// - Some way of switching to host a ride
const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <IconButton icon="menu" size={24} onPress={() => setVisible(true)} />
        }
      >
        <Menu.Item onPress={() => console.log('option1 clicked')} title="Option 1" />
        <Menu.Item onPress={() => console.log('option2 clicked')} title="Option 2" />
        <Menu.Item onPress={() => console.log('option3 clicked')} title="Option 3" />
      </Menu>
    </View>
  );
};

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
          <HamburgerMenu />

          <View>
            <Text style={styles.textColor}>Welcome User</Text>
          </View>
        {/* --------------TODO---------------- 
          - Make a hardcoded array of objects (since no backend) with ride details
            (driver name, location, rating, everything you can see)
          
          - Small pressables will appear with brief info (on clicking them, a bottom sheet will appear with full info)
          
          Multiple Pressables are needed, so:
          1) Make a reusable component in the components folder
             <Pressable style={{backgroundColor:'white',padding:10,borderRadius:40,width:'80%'}} onPress={openBottomSheet}><Text style={{color:'black'}}>Umer Nadeem 5* GC</Text></Pressable>
             Send brief info like name, rating, location through props into this component (not all info)
             Then import this component into this file and make multiple instances (map the array with brief info into it)
         
          2) RideBS is a component in the components folder
             Use map function to send all info as props into RideBS (make a variable with mapped components)
             Place this mapped component array under the pressables
          
          3) Now see tasks in RidesBS.tsx
          */}

          <View style={styles.ridesContainer}>
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