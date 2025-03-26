import { View, Text, StyleSheet } from 'react-native'
import React, { forwardRef, useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface Props {
    name: string,

}
type Ref = BottomSheetMethods;

const RidesBS = forwardRef<Ref, Props>((props, ref) => {

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={['95%']}
                enablePanDownToClose={true}
                onChange={handleSheetChanges}
                handleIndicatorStyle={{ backgroundColor: 'black' }}
                backgroundStyle={{ backgroundColor: "white" }}


            >
                <BottomSheetView style={styles.contentContainer}><Text style={{ color: "white" }}>
     {/* --------------TODO---------------- 
        we need to add multiple containers(views) here to create this:
        https://cdn.dribbble.com/userupload/15085517/file/original-0bfe38c1141385f18dc358ff7077ea36.jpg?resize=752x&vertical=center
        (the middle picture with ride and rider details) 
        no styling needed just try to replicate the loose structure
        all info from props
        */}
                    {props.name}</Text></BottomSheetView>
            </BottomSheet>


        </GestureHandlerRootView>
    )
})
const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 36,
        alignItems: 'center',
        width: '100%'
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
export default RidesBS