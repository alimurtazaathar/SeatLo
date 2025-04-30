import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { TimePickerModal } from 'react-native-paper-dates';
import SearchBox from "../SearchBox";
import { PaperProvider } from "react-native-paper";
import SearchStops from "../SearchStops";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateSelect } from "../DateSelect";
import RoadConnector from "./RoadConnecto";

import Svg, { Path } from 'react-native-svg';
interface RideDetails {
  id: number;
  name: string;
  seats:number;
  stops:string[],
  date:Date,
  time:{hours:number,minutes:number},
}


interface FormData {
  car_id: number;
  // licenseNumber: string;
  total_seats: number;
}


interface AddRideProps {
  onSubmit: (data: FormData & { 
    driver_id:number,
    stops: string[]; 
    date: string; 
    start_time: string;
  }) => void;
  ride:RideDetails|null;
}

const AddRide = forwardRef<BottomSheet, AddRideProps>((props, ref) => {
  
  const {
    control,
    handleSubmit,
    formState: { errors },reset
  } = useForm<FormData>({
    defaultValues: {
      car_id: 1,
      // licenseNumber: "ABC69",
      total_seats: props.ride?.seats ?? 0,
    },
  });

  const snapPoints = useMemo(() => ["90%"], []);
  const handleSheetChanges = useCallback((index: number) => { }, []);
  const currentDate = new Date();
  const [stops, setStops] = useState<string[]>(
    props.ride?.stops?.filter((stop): stop is string => stop !== null) || []
  );
  const [stopInput, setStopInput] = useState("");
  const [isReveresed, setIsReversed] = useState(false);
  const [isClockVisible, setIsClockVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(props.ride?.time.hours || currentDate.getHours());
  const [minutes, setMinutes] = useState(props.ride?.time.minutes || currentDate.getMinutes());
  const searchRef = useRef<BottomSheet>(null);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date>(props.ride?.date || new Date());
  
  useEffect(() => {
    if (props.ride) {
      reset({
        car_id:1,
        // licenseNumber: "ABC69",
        total_seats: props.ride.seats ?? 0,
      });
  
      setStops(props.ride.stops?.filter((stop): stop is string => stop !== null) || []);
      setHours(props.ride.time.hours || 0);
      setMinutes(props.ride.time.minutes || 0);
      setDepartureDate(props.ride.date || new Date());
      setDate(props.ride.date || new Date());
    }
  }, [props.ride, reset]);
  
  const searchStop = () => {
    searchRef.current?.expand();
  }
  
  const closeSearchStop = () => {
    searchRef.current?.close();
  }

  const onConfirmDate = useCallback(
    (date: Date) => {
      setDepartureDate(date);
      setIsDateVisible(false);
    },
    []
  );

  const onConfirm = React.useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setIsClockVisible(false);
      setHours(hours);
      setMinutes(minutes);
    },
    []
  );

  const invertStops = () => {
    setStops((prev) => [...prev].reverse());
    setIsReversed(!isReveresed);
  };

  const addStop = () => {
    setStopInput("");
    if (stopInput.trim()) {
      setStops((prev) => [...prev, stopInput.trim()]);
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
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const destination = (
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <RoadConnector height={50} isLast={true}/>
      <View style={[styles.stopItem, { width: "90%", alignContent: 'center' }]}>
      
        <Text style={{ color: "#141414", fontWeight:'bold',fontSize:15, height: 20, textAlignVertical: 'center' ,letterSpacing:4}}>------ Fast NUCES ----</Text>
      </View>
    </View>
  );

  const stopInputField = (
    <View style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
      <RoadConnector height={50}/>
      <Pressable
        onPress={searchStop}
        style={[
          styles.addButton,
          {
            backgroundColor: "#fff",
            width: "90%",
            alignItems: "center",
            marginVertical: 5,
            borderRadius: 10,
            padding: 7,
          },
        ]}
      >
        <Ionicons
          name="add-outline"
          size={15}
          style={{
            color: "#fff",
            backgroundColor: "#141414",
            borderRadius: 15,
            borderColor:'#141414',
            // opacity:0.8,
            padding: 5,
          }}
        />
      </Pressable>
    </View>
  );
  
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        style={{ backgroundColor: '#281949' }}
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
        backgroundStyle={{
          backgroundColor: "#8454F5"
        }}
        handleIndicatorStyle={{ backgroundColor: "#141414" }}
        style={{width:'100%'}}
      >
        <BottomSheetView style={styles.scrollContainer}>
          <FlatList
            data={stops}
            renderItem={({ item, index }) => (
              <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <View style={styles.connectorContainer}>
                  <RoadConnector 
                    height={50} 
                    isFirst={index === 0}
                    isLast={index === stops.length - 1}
                  />
                </View>
                <View style={styles.stopItem}>
                  <Text style={styles.stopText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeStop(index)}>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
              <>
                <Text style={styles.header}>Ride Details</Text>

                <Pressable
  style={styles.timeContainer}
  onPress={() => setIsClockVisible(true)}
>
  <View style={styles.timeWrapper}>
    <Text style={styles.timeText}>
      {formatTime(hours, minutes)}
    </Text>
    <MaterialCommunityIcons name="pencil-circle" size={28} color="#f8ce59" />
  </View>
</Pressable>

<Pressable
  style={styles.dateContainer}
  onPress={() => setIsDateVisible(true)}
>
  <View style={styles.timeWrapper}>
    <Text style={styles.dateText}>
      {formatDate(departureDate)}
    </Text>
    <MaterialCommunityIcons name="pencil-circle" size={28} color="#f8ce59" />
  </View>
</Pressable>

                <TimePickerModal
                  visible={isClockVisible}
                  onDismiss={() => setIsClockVisible(false)}
                  onConfirm={onConfirm}
                  hours={hours}
                  minutes={minutes}
                />
                
                <DateSelect
                  visible={isDateVisible}
                  onDismiss={() => setIsDateVisible(false)}
                  onDateChange={onConfirmDate}
                  date={departureDate}
                />

                <TextInputLabel label="Number of Seats" />
                <Controller
                  control={control}
                  name="total_seats"
                  rules={{ required: "Number of seats is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter number of seats"
                      value={value !== 0 ? String(value) : ''}
                      onChangeText={onChange}
                      placeholderTextColor={"gray"}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.total_seats && (
                  <Text style={styles.error}>{errors.total_seats.message}</Text>
                )}

                <View style={styles.stopsHeaderContainer}>
                  <TextInputLabel label="Stops" />
                  <Pressable
                    style={styles.invertButton}
                    onPress={invertStops}
                  >
                    <Ionicons
                      name="swap-vertical-outline"
                      color={"white"}
                      size={15}
                    />
                    <Text style={styles.invertButtonText}>
                      Invert
                    </Text>
                  </Pressable>
                </View>

                {isReveresed && destination}
              </>
            }
            ListFooterComponent={
              <>
                {!isReveresed && stopInputField}
                {!isReveresed ? destination : stopInputField}

                {/* Car Name and License Number */}
                {/* <View style={styles.carInfoContainer}>
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
                        style={styles.colInput}
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
                </View> */}

                <Pressable
                  onPress={handleSubmit((data) => {
                    if (stops.length === 0) {
                      alert("Please input a stop")
                    }//deal with edge cases where time is appropriate
                    else {
                      const localDate = new Date(departureDate);
                      localDate.setHours(hours);
                      localDate.setMinutes(minutes);
                      localDate.setSeconds(0);
                      localDate.setMilliseconds(0);
                      
                      const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
                      
                      props.onSubmit({ 
                        driver_id:1,//for now change after this
                        ...data, 
                        stops, 
                        date: departureDate.toISOString().split('T')[0], 
                        start_time:utcDate.toISOString(),
                      });
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
      <SearchStops ref={searchRef} closeSheet={closeSearchStop} stops={stops} setStops={setStops} />
    </>
  );
});

const TextInputLabel = ({ label }: { label: string }) => (
  <Text style={styles.label}>{label}</Text>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    gap: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  // New time styles
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 50,
    fontWeight: '900',
    color: "#fff",
    textAlign: "center",
    letterSpacing: 2,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: "#fff",
    textAlign: "center",
  },
  editIcon: {
    position: 'absolute',
    right: -30,
    top: '50%',
    marginTop: -14, 
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
    borderWidth: 2,
    borderColor: 'black',
  },
  colInput: {
    width: "100%",
    backgroundColor: "#fff",
    color: "black",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#141414",
    fontStyle: "italic",
  },
  connectorContainer: {
    height: 50, // Match this with the RoadConnector height
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  stopsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invertButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#141414",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  invertButtonText: {
    color: "white",
    padding: 2,
    borderRadius: 10,
  },
  addButton: {
    marginLeft: 0,
  },
  stopItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderColor:'#141414',
    borderWidth:1,
    marginVertical: 5,
    width:'90%'
  },
  stopText: {
    color: "#141414",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing:3,
  },
  submitButton: {
    backgroundColor: "#141414",
    padding: 10,
    paddingVertical: 15,
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
});

export default AddRide;