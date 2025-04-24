import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { TimePickerModal } from 'react-native-paper-dates';
import SearchBox from "../SearchBox";
interface RideDetails {
  id: number;
  name: string;
  location: string;
  History?: true;
  onPress: () => void;

}


interface FormData {
  carName: string;
  licenseNumber: string;
  seats: string;
  time:{hours:string,minutes:string}
}

interface Stop {
  text: string;
}



interface AddRideProps {
  onSubmit: (data: FormData & { stops: Stop[] }) => void;
  ride?:RideDetails|null
  isRepool?:boolean
}

const AddRide = forwardRef<BottomSheet, AddRideProps>((props, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      carName: "Toyota Prius",
      licenseNumber: "ABC69",
      seats: "",
    },
  });

  const snapPoints = useMemo(() => ["100%"], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const [stops, setStops] = useState<Stop[]>([]);
  const [stopInput, setStopInput] = useState("");
  const [isReveresed, setIsReversed] = useState(false);
  const [isVisible,setIsVisible]=useState(false);
  const [hours,setHours]=useState(0);
  const [minutes,setMinutes]=useState(0);
  // console.log(ride)
  const onDismiss=React.useCallback(()=>{
    setIsVisible(false)
  },[setIsVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }:{ hours: number; minutes: number }) => {
      setIsVisible(false);
      setHours(hours);
      setMinutes(minutes);
      console.log({ hours, minutes });
    },
    [setIsVisible]
  );

  const invertStops = () => {
    setStops((prev) => [...prev].reverse());
    setIsReversed(!isReveresed);
  };

  const addStop = () => {
    setStopInput("");
    if (stopInput.trim()) {
      setStops((prev) => [...prev, { text: stopInput.trim() }]);
    }
  };
  const removeStop = (indexToRemove: number) => {
    setStops((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const destination = (
    <View style={[styles.stopItem, { width: "100%" ,alignContent:'center'}]}>
      <Text style={{ color: "white",height:20,textAlignVertical:'center' }}>Fast NUCES</Text>
    </View>
  );

  const stopInputField = (
    <BottomSheetTextInput
      style={styles.input}
      placeholder="Enter stop"
      value={stopInput}
      placeholderTextColor={"gray"}
      onChangeText={setStopInput}
    />
  );



  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#141414" }}
      handleIndicatorStyle={{ backgroundColor: "gray" }}
      // enableContentPanningGesture={false}
      // enableHandlePanningGesture={false}
    >
      <BottomSheetView style={styles.scrollContainer}>
        <FlatList
          data={stops}
          renderItem={({ item, index }) => (
            <View style={styles.stopItem}>
              <Text style={styles.stopText}>{item.text}</Text>
              <TouchableOpacity onPress={() => removeStop(index)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <>
              <Text style={styles.header}>Enter Ride Details</Text>

               <TextInputLabel label="Enter time of departure"/>
               <Pressable onPress={()=>{setIsVisible(true)}} style={{display:'flex',flexDirection:'row'}}>

               <View style={styles.timeCard}><Text style={{textAlign:'center'}}>{hours}</Text></View>
               <Text style={{color:'gray'}}>:</Text>
               <View style={styles.timeCard}><Text style={{textAlign:'center'}}>{minutes}</Text></View>


               </Pressable>
              {/* <Controller
              control={control}
              name="time"
              rules={{required:'Time is required'}}
              render={({field:{onChange,value}})=>(
                <TextInput
                  placeholder="7:00 AM"
                />

              )}
              />  */}
               <TimePickerModal
          visible={isVisible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />


              <TextInputLabel label="Number of Seats" />
              <Controller
                control={control}
                name="seats"
                rules={{ required: "Number of seats is required" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter number of seats"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={"gray"}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.seats && (
                <Text style={styles.error}>{errors.seats.message}</Text>
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
  
                }}
              >
                <TextInputLabel label="Stops" />
                <Pressable
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: "#8b5cf6",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop:10
                  }}
                  onPress={invertStops}
                >
                  <Ionicons
                    name="swap-vertical-outline"
                    color={"white"}
                    size={15}
                  />
                  <Text
                    style={{
                      color: "white",
                      padding: 2,
                      borderRadius: 10,
                    }}
                  >
                    Invert
                  </Text>
                </Pressable>
              </View>

              {isReveresed && destination}
            </>
          }
          ListFooterComponent={
            <>
              {/* Stops Input */}
              {/* <View
                style={[styles.stopsContainer, { flexDirection: "column" }]}
              > */}
                {!isReveresed && stopInputField}

                <Pressable
                  onPress={addStop}
                  style={[
                    styles.addButton,
                    {
                      backgroundColor: "#222",
                      width: "100%",
                      alignItems: "center",
                      marginVertical: 5,
                      borderRadius: 10,
                      padding: 10,
                    },
                  ]}
                >
                  <Ionicons
                    name="add-outline"
                    size={15}
                    style={{
                      color: "white",
                      backgroundColor: "#8b5cf6",
                      borderRadius: 15,
                      padding: 5,
                    }}
                  />
                </Pressable>
                    <SearchBox/>
                {!isReveresed ? destination : stopInputField}
              {/* </View> */}

              {/* Car Name and License Number */}
              <View style={styles.carInfoContainer}>
                <TextInputLabel label="Car Name" />
                <Controller
                  control={control}
                  name="carName"
                  rules={{ required: "Car name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <BottomSheetTextInput
                      style={styles.colInput}
                      placeholder="Enter car name"
                      placeholderTextColor={"gray"}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.carName && (
                  <Text style={styles.error}>{errors.carName.message}</Text>
                )}

                <TextInputLabel label="License Number" />
                <Controller
                  control={control}
                  name="licenseNumber"
                  rules={{ required: "License number is required" }}
                  render={({ field: { onChange, value } }) => (
                    <BottomSheetTextInput
                      style={[styles.colInput]}
                      placeholder="Enter license number"
                      value={value}
                      placeholderTextColor={"gray"}
                      onChangeText={onChange}
                      selectionColor={"#222"}
                    />
                  )}
                />
                {errors.licenseNumber && (
                  <Text style={styles.error}>
                    {errors.licenseNumber.message}
                  </Text>
                )}
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit((data) => {
                  if (stops.length === 0) {
                    alert("Please input a stop");
                  } else {
                    props.onSubmit({ ...data, stops });
                  }
                })}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            </>
          }
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

const TextInputLabel = ({ label }: { label: string }) => (
  <Text style={styles.label}>{label}</Text>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    gap: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  colInput: {
    width: "100%",
    backgroundColor: "#444", 
    color: "lightgray",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8b5cf6",
    fontStyle: "italic", 
  },
  
  error: {
    color: "red",
    fontSize: 12,
  },
  stopsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    marginLeft: 0,
  },
  stopItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  stopText: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: "black",
    textAlign: "center",
  },
  carInfoContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  timeCard:{backgroundColor:'#fff',height:40,width:40,aspectRatio:1,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}
});

export default AddRide;
