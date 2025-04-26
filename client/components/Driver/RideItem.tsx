import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface RideProps {
  id: number;
  name: string;
  location: string;
  onPress: () => void;
  onReuse?:()=>void;
}

function truncateText(text:string, maxLength:number) {
  if (text.length <= maxLength) return text;
  
  let truncated = text.slice(0, maxLength);
  let lastSpace = truncated.lastIndexOf(" ");
  
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

const RideItems: React.FC<RideProps> = ({ id, name, location, onPress, History,onReuse}) => {
  console.log("Ride ID:", id);
  



  return (
    <View style={styles.rideItemContainer}>
        {/* <View style={styles.header}> */}
          <Pressable style={{padding:20,flex:1}} onPress={onPress}>
            <Text style={styles.rideText} numberOfLines={1} ellipsizeMode="tail">{!History && name } {location}</Text>
            <View style={{display:'flex',flexDirection:'row'}}>
              <Text style={styles.infoText}>View details</Text>
              <Ionicons name="chevron-forward-outline" color={"gray"}/>
            </View>
          </Pressable>
         
            <Pressable style={styles.reuseButton} onPress={onReuse}>
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.reuseText}>Repool</Text>
            </Pressable>
        
        {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  rideItemContainer: {
    backgroundColor: "white",
    // borderWidth: 2,
    borderRadius: 20,
    borderColor:'#141414',
    borderWidth:2,
    // padding: 20,
     display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "100%",
    height:60,
    marginVertical: 10,
  },
  rideContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  rideText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  infoText: {
    fontSize: 10,
    color: "gray",
  },
  reuseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green for reuse
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderBottomLeftRadius:0,
    borderTopLeftRadius:0,
    // padding:10,
    minHeight:'100%'
  },
  reuseText: {
    color: "white",
    marginLeft: 5,
    fontSize: 12,
  },
});

export default RideItems;
