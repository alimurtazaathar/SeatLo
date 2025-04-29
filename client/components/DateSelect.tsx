import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type DateSelectProps = {
  visible: boolean;
  onDismiss: () => void;
  onDateChange: (date: Date) => void;
  date: Date;
};

export const DateSelect = ({ visible, onDismiss, onDateChange, date }: DateSelectProps) => {
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      onDateChange(selectedDate);
    }
    onDismiss();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select Departure Date</Text>
          
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="inline"
            onChange={handleChange}
            accentColor="#8454F5"
            minimumDate={new Date()}
          />
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onDismiss}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width:'60%',
    backgroundColor: '#141414'
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
    textAlign:'center'
  }
});