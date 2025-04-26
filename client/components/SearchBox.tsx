import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



type Props={
  closeSheet:()=>void;
  setStops: React.Dispatch<React.SetStateAction<string[]>>;
  

}

const SearchBox= ({closeSheet,setStops}:Props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search a stop'
      debounce={200}               
      minLength={2}               
      enablePoweredByContainer={false} 
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
       setStops((prev)=>[...prev, data.structured_formatting.main_text])

          closeSheet();
      }}
      query={{
        key:'AIzaSyAUy4oHW2ASPfv8jmyHVsRxxeV3chljYVU',
        language: 'en',
        components:'country:pk'
      }}
    />
  );
};

export default SearchBox;