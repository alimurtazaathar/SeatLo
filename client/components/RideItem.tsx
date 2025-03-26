import React from "react";
import { View, Text ,StyleSheet,ScrollView} from 'react-native'
import { Pressable } from "react-native";
interface RideProps {
    id:number;
    name: string;
    location: string;

    onPress: () => void;
  }
const RideItems:React.FC<RideProps> = ({id, name, location ,onPress}) => {
    console.log("Ride ID:", id);
    return (
    <Pressable onPress={onPress} style={{backgroundColor:"white",borderWidth:2,borderRadius:20}}>
      <View>
        <Text>  {name} - {location} </Text>
      </View>
      </Pressable>

    );
  };

export default RideItems;
  