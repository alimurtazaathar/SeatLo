// Developing a caching mechanims any time the user comes to this page we save it so that
//we dont see loading again and again on revists



import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import DriverRideHistory from '@/components/Driver/DriverRideHistory';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import RideItems from '@/components/Driver/RideItem';
import AddRide from './AddRide';
import BottomSheet from "@gorhom/bottom-sheet"; 
const driverRides = [
  {
    id: 1,
    name:'Umer Nadeem',
    seats: 4,
    stops: ["Water Pump", "Sohrab Goth", "Aga Khan Hospital", "National Stadium"],
    date: new Date("2025-05-02T15:30:00Z"),
    time: { hours: 15, minutes: 30 },
  },
  {
    id: 2,
    name:'Umer Nadeem',

    seats: 3,
    stops: ["Gulshan Chowrangi", "Disco Bakery", "Johar Mor", "Safari Park"],
    date: new Date("2025-05-03T09:00:00Z"),
    time: { hours: 9, minutes: 0 },
  },
  {
    id: 3,
    name:'Umer Nadeem',

    seats: 2,
    stops: ["Numaish", "Tibet Centre", "I.I Chundrigar Road", "Tower"],
    date: new Date("2025-05-04T18:45:00Z"),
    time: { hours: 18, minutes: 45 },
  },
  {
    id: 4,
    name:'Umer Nadeem',

    seats: 5,
    stops: ["Gizri", "Clifton Block 7", "Boat Basin", "Do Darya"],
    date: new Date("2025-05-05T07:15:00Z"),
    time: { hours: 7, minutes: 15 },
  },
  {
    id: 5,
    name:'Umer Nadeem',

    seats: 1,
    stops: ["Malir Halt", "Shah Faisal Colony", "Natha Khan", "Drigh Road"],
    date: new Date("2025-05-06T22:00:00Z"),
    time: { hours: 22, minutes: 0 },
  },
];

type RideDetails= {
  id: number;
  name: string;
  seats:number;
  stops:string[],
  date:Date,
  time:{hours:number,minutes:number},
}


const DriverHome = () => {
  const defaultRide=
    {
      id: 0,
      name: "",
      seats: 0,
      stops: [],
      date: new Date(),
      time: { hours: 0, minutes: 0 },
    }

  const bottomSheetRef = useRef(null);
  const addRideSheetRef=useRef<BottomSheet>(null);
  const [selectedRide, setSelectedRide] = useState<RideDetails>(defaultRide);
  useEffect(()=>{
    console.log('selected ride',selectedRide);
  },[selectedRide])
  const openBottomSheet = (ride: RideDetails) => {
    setSelectedRide(ride);
    setTimeout(() => {
      (bottomSheetRef.current as any)?.expand();
    }, 100);
  };
  const addRide = (ride: RideDetails) => {
    if(ride){setSelectedRide(ride)}
   addRideSheetRef.current?.expand();
   
  };
  const handleFormSubmit = (data: any) => {
    console.log('Submitted form data:', data);
  };

  return (
      <View style={styles.container}>
        {/* <View><Text style={{color:'white',textAlign:'center',borderWidth:2,borderColor:'white'}}>Some stats here</Text></View> */}
        <Pressable style={{padding:15,borderRadius:10,backgroundColor:'#F7C846',marginBottom:15}} onPress={()=>{addRide(defaultRide)}}><Text style={{color:'black',textAlign:'center'}}>+ Add a ride</Text></Pressable>
        <Text style={styles.headerText}>History</Text>
        {driverRides.map((ride) => (
          <RideItems
            key={ride.id}
            id={ride.id}
            name={ride.name}
            seats={ride.seats}
            stops={ride.stops}
            date={ride.date}
            time={ride.time}            
            onPress={() => openBottomSheet(ride)}
            onReuse={()=>addRide(ride)}
          />
        ))}

      <DriverRideHistory ref={bottomSheetRef} ride={selectedRide} />
      <AddRide ref={addRideSheetRef} onSubmit={handleFormSubmit} ride={selectedRide}/>
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
