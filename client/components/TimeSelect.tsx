import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type TimeSelectProps = {
  visible: boolean;
  onDismiss: () => void;
  onTimeChange: (hours: number, minutes: number) => void;
  time: Date;
};

export const TimeSelect = ({ visible, onDismiss, onTimeChange, time }: TimeSelectProps) => {
  const handleChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      onTimeChange(hours, minutes);
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
          <Text style={styles.modalTitle}>Select Departure Time</Text>
          
          <DateTimePicker
            testID="timeTimePicker"
            value={time}
            mode="time"
            display={Platform.OS==='ios'?'inline':'clock'}
            onChange={handleChange}
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
    backgroundColor: '#f0f0f0'
  },
  cancelText: {
    color: '#8454F5',
    fontWeight: '600'
  }
});