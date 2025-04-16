import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider, FAB } from 'react-native-paper';
import PassengerHome from '@/components/Passenger/PassengerHome';
import DriverHome from '@/components/Driver/DriverHome';
import { runOnJS } from 'react-native-reanimated';
import { 
  GestureHandlerRootView, 
  Gesture, 
  GestureDetector,
  Directions
} from 'react-native-gesture-handler';

const HomeLayout = () => {
  const [isDriverMode, setIsDriverMode] = useState(false);


    const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      console.log('swiped left')
      runOnJS(setIsDriverMode)((prev) => !prev);
    })
    .runOnJS(true);
  
    
  // const flingRight = Gesture.Fling()
  //   .direction(Directions.RIGHT)
  //   .onEnd(() => {
  //     console.log('swiped right')
  //     runOnJS(setIsDriverMode)((prev) => !prev); 
  //   }).runOnJS(true);

  const combinedGesture = Gesture.Exclusive(flingLeft);

  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
    
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          {/* Header Section */}
          {/* <View style={styles.header}> */}
            {/* <Text style={styles.locationText}>Location here</Text> */}
            {/* <HamburgerMenu /> */}
          {/* </View> */}

          {/* Gesture Detector Wrapping Only the Changing Content */}
          <GestureDetector gesture={combinedGesture}>
            <View style={styles.content}>
              {isDriverMode ? <DriverHome /> : <PassengerHome />}
            </View>
          </GestureDetector>

          {/* Floating Action Brutton (Switch Mode) */}
          {/* <FAB
            icon={isDriverMode ? 'car' : 'steering'}
            label={isDriverMode ? 'Switch to Passenger' : 'Switch to Driver'}
            style={styles.fab}
            onPress={() => setIsDriverMode(!isDriverMode)}
            color="#fff"
          /> */}
        </SafeAreaView>
      </PaperProvider>
      </GestureHandlerRootView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    justifyContent:'flex-start',
    backgroundColor: '#141414',
    width: '100%',
    borderWidth:2,
    borderColor:'white'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  locationText: {
    color: 'white',
    marginRight: 'auto',
    fontSize: 16,
  },
  content: {
    paddingHorizontal:5,
    flex:1,
    height:'100%'
  },
  fab: {
    position:'fixed',
    width: 360,
    zIndex:10,
    backgroundColor: '#8b5cf6',
    alignSelf: 'center',
  },
});