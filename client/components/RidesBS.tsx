import { View, Text, StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
interface RiderDetails {
  name: string;
  rating: number;
  location: string;
  car: string;
  additionalDetails?: string;
}

interface Props {
  ride: RiderDetails | null;
}

const RidesBS = forwardRef<BottomSheet, Props>(({ ride }, ref) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const router=useRouter();
  const handleSheetChanges = useCallback((index: number) => {
    console.log('BottomSheet index changed:', index);
  }, []);
  
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
        {ride && (<>
            <Text style={styles.titleText}>{ride.name}</Text>
            <Text style={styles.subtitleText}>Rating: {ride.rating} ★</Text>
            <Text style={styles.infoText}>Location: {ride.location}</Text>
            <Text style={styles.infoText}>Car: {ride.car}</Text>
            {ride.additionalDetails && (
              <Text style={styles.detailsText}>{ride.additionalDetails}</Text>)}
             
                <Pressable onPress={()=>{
                  // router.push('/index')}
                }}><Text style={{color:"black",backgroundColor:'#8b5cf6',padding:20,width:'90%',borderRadius:20}
                } 
                  >Request Ride</Text></Pressable>
               </>
            )}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: 'gold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
  },
  noRideText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default RidesBS;