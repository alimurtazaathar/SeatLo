import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchBox= () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      debounce={200}               // ⏱ wait 400 ms after last keystroke
      minLength={2}                // only start after 2 chars (optional)
      enablePoweredByContainer={false}  // cleaner UI (optional)
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAUy4oHW2ASPfv8jmyHVsRxxeV3chljYVU',
        language: 'en',
      }}
    />
  );
};

export default SearchBox;