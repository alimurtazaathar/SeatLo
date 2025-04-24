import { View, Text,Pressable,StyleSheet } from 'react-native'
import React ,{ReactNode} from 'react'


type Props={
    chosen:boolean;
    onPress:()=>void;
    children:ReactNode;
}

const ChoiceCard = ({ chosen, onPress, children }:Props) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: chosen ? '#6a43c4' : '#fff',
          transform: [{ scale: chosen ? 1.12 : pressed ? 0.97 : 1 }],
        //   shadowOpacity: chosen ? 0.25 : 0,   // iOS
        //   elevation: chosen ? 5 : 0,     
          opacity:chosen?1:0.6    , // Android
          borderColor:chosen?'#ffff':'#141414',
        },
      ]}
    >
      {children}
    </Pressable>
  );
const styles=StyleSheet.create({
    card: {
        width: '30%',
        aspectRatio: 1,
        // borderColor: '#141414',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
})

  export default ChoiceCard;
  