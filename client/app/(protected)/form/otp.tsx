import { View, Text,Pressable, Button, KeyboardAvoidingView ,Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const OTP = () => {

    const [Time,setTime]=useState(59);
    const [otp,setOtp]=useState('');
    const router=useRouter();
    useEffect(() => {
        let interval = setInterval(() => {
          setTime((lastTimerCount) => {
            if (lastTimerCount <= 1) {
              clearInterval(interval);
              return 0;
            }
            return lastTimerCount - 1;
          });
        }, 1000);
    
        return () => clearInterval(interval); 
      }, []);

     

      const boxes=[...Array(4)].map((_,index)=>{return(
        <View key={index} style={{borderColor:'#141414',backgroundColor:'#fff',borderWidth:2,borderRadius:4,height:50,width:50,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black',fontSize:20}}>{otp[index] || ' '}</Text>

        </View>

      )})

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#8454F5'}}>
        <Pressable style={{backgroundColor:'#141414',width:'15%',padding:10,borderRadius:5,position:'absolute',top:80,left:20}} onPress={()=>{router.back()}}><Ionicons name="arrow-back-outline" style={{color:'#ffff',fontSize:25,textAlign:'center'}}></Ionicons></Pressable>
        <KeyboardAvoidingView style={{padding:20,display:'flex',gap:40,justifyContent:'center',flex:1}}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Enter the 4 digit verification number sent to your phone</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                <TextInput style={{position:"absolute",borderWidth:2,borderColor:'black',height:50,width:'90%',opacity:0,zIndex:1}} value={otp} onChangeText={setOtp} autoFocus keyboardType='number-pad'/>
                {boxes}

            </View>
            <Text style={{textAlign:'center',color:'black',opacity:0.8}}>Resend in 00:{Time?Time:'00'}</Text>
                    <Pressable style={{backgroundColor:'#141414',borderRadius:10,padding:15,paddingHorizontal:20}} onPress={()=>{router.push('/(protected)/form/gender')}}><Text style={{color:'white',textAlign:'center'}}>Proceed</Text></Pressable>
            
            </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OTP