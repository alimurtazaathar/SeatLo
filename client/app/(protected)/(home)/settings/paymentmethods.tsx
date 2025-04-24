import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type PaymentMethod = {
  id: string;
  type: 'card' | 'wallet';
  last4: string;
  isDefault: boolean;
  cardBrand?: string;
};

type NewCard = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

export default function Profile() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', last4: '4242', isDefault: true, cardBrand: 'visa' },
    { id: '2', type: 'card', last4: '1881', isDefault: false, cardBrand: 'mastercard' },
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState<NewCard>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const addPaymentMethod = () => {
    setShowAddModal(true);
  };

  const validateCard = (): boolean => {
    // Simple validation - in a real app you'd want more robust validation
    if (newCard.cardNumber.length !== 16 || !/^\d+$/.test(newCard.cardNumber)) {
      Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(newCard.expiryDate)) {
      Alert.alert('Invalid Expiry', 'Please enter expiry date in MM/YY format');
      return false;
    }

    if (newCard.cvv.length < 3 || !/^\d+$/.test(newCard.cvv)) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3 or 4-digit CVV');
      return false;
    }

    if (newCard.cardholderName.trim().length < 2) {
      Alert.alert('Invalid Name', 'Please enter the cardholder name');
      return false;
    }

    return true;
  };

  const handleAddCard = () => {
    if (!validateCard()) return;

    // Detect card brand (simplified)
    const cardNumber = newCard.cardNumber;
    let cardBrand = 'creditcard';
    if (/^4/.test(cardNumber)) cardBrand = 'visa';
    else if (/^5[1-5]/.test(cardNumber)) cardBrand = 'mastercard';

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      last4: cardNumber.slice(-4),
      isDefault: paymentMethods.length === 0,
      cardBrand
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setShowAddModal(false);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
  };

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const removePaymentMethod = (id: string) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(methods => {
              const newMethods = methods.filter(method => method.id !== id);
              // If we removed the default, make the first one default
              if (newMethods.length > 0 && !newMethods.some(m => m.isDefault)) {
                newMethods[0].isDefault = true;
              }
              return [...newMethods];
            });
          }
        }
      ]
    );
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    let cleaned = text.replace(/\D/g, '');
    // Limit to 16 characters
    cleaned = cleaned.slice(0, 16);
    // Add spaces every 4 digits for better readability
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned.slice(0, 5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Methods</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addPaymentMethod}
          >
            <Ionicons name="add" size={24} color="#8b5cf6" />
            <Text style={styles.addButtonText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {paymentMethods.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="card-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No payment methods added</Text>
          </View>
        ) : (
          <View style={styles.paymentList}>
            {paymentMethods.map(method => (
              <View key={method.id} style={[
                styles.paymentCard,
                method.isDefault && styles.defaultCard
              ]}>
                <View style={styles.cardInfo}>
                <Ionicons 
                  name={method.type === 'card' ? 'card' : 'wallet'} 
                  size={24} 
                  color="#8b5cf6" 
                />
                  <View style={styles.cardDetails}>
                    
                    <Text style={styles.cardType}>
                      {method.type === 'card' ? 
                        method.cardBrand ? 
                          method.cardBrand.charAt(0).toUpperCase() + method.cardBrand.slice(1) 
                          : 'Credit Card' 
                        : 'Digital Wallet'}
                    </Text>
                    <Text style={styles.cardNumber}>
                      •••• {method.last4}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <View style={styles.defaultToggle}>
                    <Text style={styles.defaultText}>Default</Text>
                    <Switch
                      value={method.isDefault}
                      onValueChange={() => setDefaultMethod(method.id)}
                      trackColor={{ false: '#e0e0e0', true: '#8b5cf6' }}
                      thumbColor={method.isDefault ? '#f8f8f8' : '#f8f8f8'}
                    />
                  </View>
                  <TouchableOpacity 
                    onPress={() => removePaymentMethod(method.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash-outline" size={22} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <Modal
          visible={showAddModal}
          animationType="slide"
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Card</Text>
                <TouchableOpacity 
                  onPress={() => setShowAddModal(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                value={formatCardNumber(newCard.cardNumber)}
                onChangeText={(text) => setNewCard({...newCard, cardNumber: text.replace(/\s/g, '')})}
                maxLength={19} // 16 digits + 3 spaces
              />
              
              <View style={styles.rowInputs}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/YY"
                  value={formatExpiryDate(newCard.expiryDate)}
                  onChangeText={(text) => setNewCard({...newCard, expiryDate: formatExpiryDate(text)})}
                  maxLength={5}
                />
                
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVV"
                  keyboardType="numeric"
                  value={newCard.cvv}
                  onChangeText={(text) => setNewCard({...newCard, cvv: text.replace(/\D/g, '')})}
                  maxLength={4}
                  secureTextEntry
                />
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                value={newCard.cardholderName}
                onChangeText={(text) => setNewCard({...newCard, cardholderName: text})}
                autoCapitalize="words"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddCard}
                >
                  <Text style={[styles.buttonText, styles.saveButtonText]}>Add Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#222222',
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    marginLeft: 10,
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  paymentList: {
    padding: 16,
  },
  paymentCard: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  defaultCard: {
    borderColor: '#8b5cf6',
    backgroundColor: '#222222',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDetails: {
    marginLeft: 16,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardNumber: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  defaultToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultText: {
    marginRight: 10,
    color: '#666',
    fontSize: 14,
  },
  removeButton: {
    padding: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  modalContent: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  closeButton: {
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});