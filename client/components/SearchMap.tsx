import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { useForm, Controller } from "react-hook-form";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Replace this with your map search function
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_API_KEY; // Replace with your token

interface FormData {
  carName: string;
  licenseNumber: string;
  seats: string;
  destination: string;
  stop: string;
}

interface AddRideProps {
  onSubmit: (data: FormData) => void;
}

const AddRide = forwardRef<BottomSheet, AddRideProps>((props, ref) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      carName: "Toyota Prius",
      licenseNumber: "ABC69",
      seats: "",
      destination: "Fast NUCES",
      stop: "", // Add stop field here
    }
  });

  const [query, setQuery] = useState(""); // Store the search query
  const [results, setResults] = useState<any[]>([]); // Store the search results
  const [selectedStop, setSelectedStop] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const snapPoints = useMemo(() => ['95%'], []);
  
  const handleSheetChanges = useCallback((index: number) => {}, []);

  // Function to fetch location data from Mapbox (or any other API)
  const fetchLocationData = async (text: string) => {
    if (text.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setResults(data.features);
    }
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);

    // Clear the previous debounce timeout if any
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for debouncing
    const timeout = setTimeout(() => {
      fetchLocationData(text);
    }, 500); // Adjust the delay as needed (500ms in this case)

    setDebounceTimeout(timeout); // Store the timeout ID
  };

  const handleSelectStop = (locationName: string) => {
    setSelectedStop(locationName); // Store the selected stop
    setQuery(""); // Clear query after selection
    setResults([]); // Clear results
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#141414' }}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        <Text style={styles.header}>Enter Ride Details</Text>

        <TextInputLabel label="Car Name" />
        <Controller
          control={control}
          name="carName"
          rules={{ required: "Car name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter car name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.carName && <Text style={styles.error}>{errors.carName.message}</Text>}

        <TextInputLabel label="License Number" />
        <Controller
          control={control}
          name="licenseNumber"
          rules={{ required: "License number is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter license number"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.licenseNumber && <Text style={styles.error}>{errors.licenseNumber.message}</Text>}

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
              keyboardType="numeric"
            />
          )}
        />
        {errors.seats && <Text style={styles.error}>{errors.seats.message}</Text>}

        <TextInputLabel label="Destination" />
        <Controller
          control={control}
          name="destination"
          rules={{ required: "Destination is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter destination"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.destination && <Text style={styles.error}>{errors.destination.message}</Text>}

        {/* Search for stops (autocomplete) */}
        <TextInputLabel label="Search for Stop" />
        <TextInput
          style={styles.input}
          placeholder="Search for stop"
          value={query}
          onChangeText={handleSearchChange}
        />
        {query.length > 2 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelectStop(item.place_name)}>
                <Text style={styles.result}>{item.place_name}</Text>
              </Pressable>
            )}
          />
        )}
        
        {/* Display selected stop */}
        <TextInputLabel label="Selected Stop" />
        <TextInput
          style={styles.input}
          value={selectedStop || "No stop selected"}
          editable={false}
        />

        <Pressable onPress={handleSubmit(props.onSubmit)} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const TextInputLabel = ({ label }: { label: string }) => (
  <Text style={styles.label}>{label}</Text>
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  result: {
    padding: 10,
    backgroundColor: '#444',
    color: 'white',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default AddRide;
