import { View, Text ,StyleSheet,ScrollView} from 'react-native'
import React ,{useRef} from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import RidesBS from '@/components/RidesBS'
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
//TODO
//we want this page to have
//tab three dots at top right
//location and name in the middle 
//maps in  between
//available rides
//some way of switching to host a ride


const Home = () => {

  const bottomSheetRef=useRef<BottomSheet>(null);
  const openBottomSheet=()=>bottomSheetRef.current?.expand();


  return (
    <GestureHandlerRootView >
      <SafeAreaView style={styles.container}>
        {
        /* tabs view ignore for now 
         <View>
         </View>
        */
        }
       

        {/* name and location container:*/}
        <View>
          <Text style={styles.textColor}>
            Welcome User (we don’t know your name)
          </Text>
        </View>

        {/* --------------TODO---------------- 
          -make a hardcoded array of object(since no backend)with ride details(driver name,location,rating everything you can see of)
          -small pressables will appear with brief info(on clicking them a bottom sheet will appear with full info)
          Multiple Pressables are needed so:
          1)Make a reusable component in the component folder
         <Pressable style={{backgroundColor:'white',padding:10,borderRadius:40,width:'80%'}} onPress={openBottomSheet}><Text style={{color:'black'}}>Umer Nadeem 5* GC</Text></Pressable>
          send brief info like name,rating,location through props into this component(not all info)
          then import this component into this file and make multiple instances(map the array with brief info into it)
         
          2)RideBS IS A COMPONENT IN COMPONENTS FOLDER
           USE MAP FUNCTION TO SEND all info AS PROPS INTO THE RIDEBS(make a varibale with mapped components)
          place this mapped component array under the pressables
          3)now see task in ridebs.tsx
        */}
    



          {/* current rides near you displayed */}
        <View >
          <View>
            {/* headings and AutoBooking button here */}
          </View>

              <Pressable style={{backgroundColor:'white',padding:10,borderRadius:40,width:'80%'}} onPress={openBottomSheet}><Text style={{color:'black'}}>Umer Nadeem 5* GC(Press me)</Text></Pressable>
  <RidesBS ref={bottomSheetRef} name="Umer Nadeem" />

        </View>

        {/* A switch modes button */}
        {/* <View></View> */}
      </SafeAreaView>
     </GestureHandlerRootView>
  )
}


export default Home
const styles = StyleSheet.create({
container:{
  backgroundColor:'#141414',flex:1,
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  alignItems:'center'
},
textColor:{color:"white"}

})


