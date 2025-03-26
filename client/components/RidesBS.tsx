import { View, Text, StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

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
  // Define the snap points
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('BottomSheet index changed:', index);
  }, []);

  // Render
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
        {/* --------------TODO---------------- 
          we need to add multiple containers(views) here to create this:
          https://cdn.dribbble.com/userupload/15085517/file/original-0bfe38c1141385f18dc358ff7077ea36.jpg?resize=752x&vertical=center
          (the middle picture with ride and rider details) 
          no styling needed just try to replicate the loose structure
          all info from props
          */}
        {ride ? (
          <>
            <Text style={styles.titleText}>{ride.name}</Text>
            <Text style={styles.subtitleText}>Rating: {ride.rating} ★</Text>
            <Text style={styles.infoText}>Location: {ride.location}</Text>
            <Text style={styles.infoText}>Car: {ride.car}</Text>
            {ride.additionalDetails && (
              <Text style={styles.detailsText}>{ride.additionalDetails}</Text>
            )}
          </>
        ) : (
          <Text style={styles.noRideText}>No ride selected</Text>
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