import { View, Text } from 'react-native'
import React, { forwardRef, useMemo ,useCallback} from 'react'
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import SearchBox from './SearchBox'

type SearchStopsProps={
    closeSheet:()=>void;
    setStops: React.Dispatch<React.SetStateAction<string[]>>;
    stops:string[];
}

const SearchStops =forwardRef<BottomSheet,SearchStopsProps>((props,ref) => {
 
      const snapPoints = useMemo(() => ["100%"], []);
      const handleSheetChanges = useCallback((index: number) => {
        // console.log(index)
    }
        , []);
    
    return (
        <BottomSheet
              ref={ref}
              index={-1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose={true}
              backgroundStyle={{ backgroundColor: "#8454F5"
        
               }}
              handleIndicatorStyle={{ backgroundColor: "#141414" }}
              // enableContentPanningGesture={false}
              // enableHandlePanningGesture={false}
            >
            
        <BottomSheetView style={{backgroundColor:'#8454F5',padding:20,flex:1}}>
            <SearchBox closeSheet={props.closeSheet}  setStops={props.setStops} />
        </BottomSheetView>
    </BottomSheet>
  )
})

export default SearchStops