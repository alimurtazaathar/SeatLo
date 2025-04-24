import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChoiceCard from '@/components/ChoiceCard';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Gender = () => {
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [hasCar, setHasCar] = useState<'Yes' | 'No'>('No');
  const [modalVisible, setModalVisible] = useState(false);
  const router=useRouter();
  useEffect(() => {
    setModalVisible(hasCar === 'Yes');
  }, [hasCar]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
      <Pressable style={{backgroundColor:'#141414',width:'15%',padding:10,borderRadius:5,position:'absolute',top:80,left:20}} onPress={()=>{router.back()}}><Ionicons name="arrow-back-outline" style={{color:'#ffff',fontSize:25,textAlign:'center'}}></Ionicons></Pressable>

        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.backdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalHeading}>Enter Ride Details</Text>
             
              <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:30}}>
                <Pressable
                  style={[styles.modalBtn,{backgroundColor: '#8454F5'}]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalBtnText}>Done</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalBtn,{backgroundColor: '#808080',opacity:0.6}]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalBtnText}>Skip</Text>
                </Pressable>
              </View>
              
            </View>
          </View>
        </Modal>

        <Text style={styles.heading}>Select Gender</Text>
        <View style={styles.row}>
          <ChoiceCard chosen={gender === 'Male'} onPress={() => setGender('Male')}>
            <Ionicons name="male" size={40} color="#000080" />
            <Text style={[styles.label, gender === 'Male' && styles.labelChosen]}>
              Male
            </Text>
          </ChoiceCard>
          <ChoiceCard
            chosen={gender === 'Female'}
            onPress={() => setGender('Female')}
          >
            <Ionicons name="female" size={40} color="#FF77FF" />
            <Text
              style={[styles.label, gender === 'Female' && styles.labelChosen]}
            >
              Female
            </Text>
          </ChoiceCard>
        </View>

        <Text style={styles.heading}>Do you have a car?</Text>
        <View style={styles.row}>
          <ChoiceCard chosen={hasCar === 'Yes'} onPress={() => setHasCar('Yes')}>
            <AntDesign name="check" size={40} color="#006400" />
            <Text style={[styles.label, hasCar === 'Yes' && styles.labelChosen]}>
              Yes
            </Text>
          </ChoiceCard>
          <ChoiceCard chosen={hasCar === 'No'} onPress={() => setHasCar('No')}>
            <AntDesign name="close" size={40} color="#FF0000" />
            <Text style={[styles.label, hasCar === 'No' && styles.labelChosen]}>
              No
            </Text>
          </ChoiceCard>
        </View>

        <Pressable style={styles.proceedBtn} onPress={()=>{router.push('/(protected)/(home)')}}>
          <Text style={styles.proceedTxt}>Proceed</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#8454F5',
    padding: 30,
    justifyContent: 'space-evenly',
  },
  heading: { color: '#FFF', fontSize: 25, marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  label: { marginTop: 4, color: '#8454F5' },
  labelChosen: { color: '#FFF' },
  proceedBtn: {
    backgroundColor: '#141414',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  proceedTxt: { color: '#FFF', textAlign: 'center' },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    padding: 24,
    backgroundColor: '#141414',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalHeading: { fontSize: 18, fontWeight: '600', marginBottom: 6,color:'#fff' },
  modalText: { fontSize: 15, textAlign: 'center', marginBottom: 18 },
  modalBtn: {
    // backgroundColor: '#8454F5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  modalBtnText: { color: '#FFF', fontWeight: '600' },
});

export default Gender;
