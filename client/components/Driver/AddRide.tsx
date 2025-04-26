import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetBackdrop
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { TimePickerModal,DatePickerModal } from 'react-native-paper-dates';
import SearchBox from "../SearchBox";
import { PaperProvider } from "react-native-paper";
import SearchStops from "../SearchStops";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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

interface AddRideProps {
  onSubmit: (data: FormData & { stops: string[] }) => void;
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

  const snapPoints = useMemo(() => ["90%"], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const [stops, setStops] = useState<string[]>([]);
  const [stopInput, setStopInput] = useState("");
  const [isReveresed, setIsReversed] = useState(false);
  const [isClockVisible,setIsClockVisible]=useState(false);
  const [date, setDate] = useState(new Date());
const [isDateVisible, setIsDateVisible] = useState(false);
  const [hours,setHours]=useState(0);
  const [minutes,setMinutes]=useState(0);
  const searchRef=useRef<BottomSheet>(null);
  const searchStop=()=>{
    searchRef.current?.expand();
  }
  const closeSearchStop=()=>{
    searchRef.current?.close();

  }
  const onDateDismiss=React.useCallback(()=>{
    setIsDateVisible(false)
  },[setIsDateVisible])

  const onConfirmDate = useCallback(
    (params: { date :any}) => {
      setIsDateVisible(false);
      setDate(params.date);
    },
    [setIsDateVisible]
  );


  
  const onDismiss=React.useCallback(()=>{
    setIsClockVisible(false)
  },[setIsClockVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }:{ hours: number; minutes: number }) => {
      setIsClockVisible(false);
      setHours(hours);
      setMinutes(minutes);
      console.log({ hours, minutes });
    },
    [setIsClockVisible]
  );

  const invertStops = () => {
    setStops((prev) => [...prev].reverse());
    setIsReversed(!isReveresed);
  };

  const addStop = () => {
    setStopInput("");
    if (stopInput.trim()) {
      setStops((prev) => [...prev, stopInput.trim() ]);
    }
  };
  const removeStop = (indexToRemove: number) => {
    setStops((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const formatTime = (h: number, m: number) => {
    const suffix = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${String(formattedHour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
  };
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const destination = (
    <View style={[styles.stopItem, { width: "100%" ,alignContent:'center'}]}>
      <Text style={{ color: "#ffff",height:20,textAlignVertical:'center' }}>Fast NUCES</Text>
    </View>
  );

  const stopInputField = (
    <Pressable
    onPress={searchStop}
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
  );  
  const renderBackdrop = useCallback(
		(props:any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
        style={{backgroundColor:'#281949'}}
			/>
		),
		[]
	);



  return (
    <>
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#8454F5"
        // 422a7b

       }}
      //  detached={true}
      //  bottomInset={50}
      handleIndicatorStyle={{ backgroundColor: "#141414" }}
      // style={{borderColor:'#141414',borderWidth:2,borderRadius:18}}
    >
      <BottomSheetView style={styles.scrollContainer}>
        <FlatList
          data={stops}
          renderItem={({ item, index }) => (
            <View style={styles.stopItem}>
              <Text style={styles.stopText}>{item}</Text>
              <TouchableOpacity onPress={() => removeStop(index)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <>
              <Text style={styles.header}>Enter Ride Details</Text>

               <TextInputLabel label="Departure time"/>
               <Pressable onPress={()=>{setIsClockVisible(true)}} style={{display:'flex',flexDirection:'row',alignItems:'center',gap:4}}>

               <View style={styles.timeCard}><Text style={{textAlign:'center'}}>{formatTime(hours,minutes)} </Text><MaterialCommunityIcons name="clock-edit" size={20} color="black" /></View>

               </Pressable>
               <TimePickerModal
          visible={isClockVisible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        
        />
               <TextInputLabel label="Departure Date"/>
               <Pressable onPress={()=>{setIsDateVisible(true)}} style={{display:'flex',flexDirection:'row',alignItems:'center',gap:4}}>

               <View style={styles.timeCard}><Text style={{textAlign:'center'}}>{formatTime(hours,minutes)} </Text><MaterialCommunityIcons name="clock-edit" size={20} color="black" /></View>

               </Pressable>
               <DatePickerModal
               mode="single"
               locale="en"
          visible={isDateVisible}
          onDismiss={onDateDismiss}
          onConfirm={onConfirmDate}
          date={date}
        
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
                    backgroundColor: "#141414",
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

                {/* */}
                    {/* <SearchBox/> */}
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
    <SearchStops ref={searchRef} closeSheet={closeSearchStop} stops={stops} setStops={setStops}/>

  </>  
);
});

const TextInputLabel = ({ label }: { label: string }) => (
  <Text style={styles.label}>{label}</Text>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    gap: 15,
    flex:1,
   
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
    backgroundColor: "#fff",
    color: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
borderWidth:2,borderColor:'black',

  },
  colInput: {
    width: "100%",
    // backgroundColor: "#444", 
    backgroundColor: "#fff", 
    
    color: "black",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#141414",
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
    backgroundColor: "#141414",
    padding: 10,
    paddingVertical:15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  carInfoContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  timeCard:{backgroundColor:'#fff',borderColor:'#141414',borderWidth:2,borderRadius:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:4,padding:10}
});

export default AddRide;
