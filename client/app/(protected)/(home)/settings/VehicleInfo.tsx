import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  isDefault: boolean;
}

const initialVehicles: Vehicle[] = [
  {
    id: '1',
    registrationNumber: 'ABC-123',
    make: 'Toyota',
    model: 'Corolla',
    color: 'Silver',
    isDefault: true
  }
];

const emptyVehicle = {
  registrationNumber: '',
  make: '',
  model: '',
  color: '',
  isDefault: false
};

export default function Profile() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>(emptyVehicle);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const validateForm = () => {
    const { registrationNumber, make, model, color } = newVehicle;
    if (!registrationNumber.trim()) return Alert.alert('Error', 'Registration number is required');
    if (!make.trim()) return Alert.alert('Error', 'Make is required');
    if (!model.trim()) return Alert.alert('Error', 'Model is required');
    if (!color.trim()) return Alert.alert('Error', 'Color is required');
    return true;
  };

  const handleSaveVehicle = () => {
    if (!validateForm()) return;

    const updatedVehicles = newVehicle.isDefault
      ? vehicles.map(v => ({ ...v, isDefault: false }))
      : [...vehicles];

    if (editingVehicle) {
      // Update existing vehicle
      const updated = updatedVehicles.map(v => 
        v.id === editingVehicle.id ? { ...newVehicle, id: editingVehicle.id } : v
      );
      setVehicles(updated);
    } else {
      const isFirstVehicle = vehicles.length === 0;
      setVehicles([
        ...updatedVehicles,
        { ...newVehicle, id: Date.now().toString(), isDefault: isFirstVehicle || newVehicle.isDefault }
      ]);
    }

    closeModal();
  };

  // Improved vehicle removal functionality
  const initiateDeleteVehicle = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setConfirmDeleteModalVisible(true);
  };

  const confirmDeleteVehicle = () => {
    if (!vehicleToDelete) return;
    
    try {
      setVehicles(currentVehicles => {
        // Get remaining vehicles after deletion
        const remainingVehicles = currentVehicles.filter(v => v.id !== vehicleToDelete.id);
        
        // If we're deleting the default vehicle and there are remaining vehicles,
        // set the first one as default
        if (vehicleToDelete.isDefault && remainingVehicles.length > 0) {
          remainingVehicles[0] = {...remainingVehicles[0], isDefault: true};
        }
        
        return remainingVehicles;
      });
      
      // Show success message
      Alert.alert(
        'Vehicle Removed',
        `${vehicleToDelete.make} ${vehicleToDelete.model} has been removed successfully.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      // Handle any errors during deletion
      Alert.alert(
        'Error',
        'There was a problem removing the vehicle. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Error removing vehicle:', error);
    } finally {
      // Close modal and reset state
      setConfirmDeleteModalVisible(false);
      setVehicleToDelete(null);
    }
  };

  const cancelDeleteVehicle = () => {
    setConfirmDeleteModalVisible(false);
    setVehicleToDelete(null);
  };

  const handleSetDefault = (id: string) => {
    setVehicles(vehicles.map(v => ({ ...v, isDefault: v.id === id })));
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle({
      registrationNumber: vehicle.registrationNumber,
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      isDefault: vehicle.isDefault
    });
    setModalVisible(true);
  };

  const openAddModal = () => {
    setEditingVehicle(null);
    setNewVehicle(emptyVehicle);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingVehicle(null);
    setNewVehicle(emptyVehicle);
  };

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <View style={styles.vehicleCard}>
      {item.isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultBadgeText}>Default</Text>
        </View>
      )}
      
      <View style={styles.vehicleHeader}>
        <View style={styles.vehicleTitle}>
          <Text style={styles.vehicleMakeModel}>
            {item.make} {item.model}
          </Text>
          <Text style={styles.vehicleReg}>{item.registrationNumber}</Text>
        </View>
      </View>
      
      <View style={styles.vehicleFooter}>
        <View style={styles.colorContainer}>
          <Text style = {styles.carColorHeading}>Color: </Text>
          <Text style={styles.colorText}>{item.color}</Text>
          <View style={[styles.colorDot, { backgroundColor: item.color.toLowerCase() }]} />
        </View>
        
        <View style={styles.footerActions}>
          {!item.isDefault && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleSetDefault(item.id)}
            >
              <Ionicons name="star-outline" size={16} color="#8b5cf6" />
              <Text style={styles.actionText}>Set Default</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openEditModal(item)}
          >
            <Ionicons name="create-outline" size={16} color="#8b5cf6" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => initiateDeleteVehicle(item)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
            <Text style={[styles.actionText, styles.deleteText]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Vehicles</Text>
        <Text style={styles.headerSubtitle}>
          Manage your vehicles for easier ride bookings
        </Text>
      </View>

      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.vehiclesContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="car-outline" size={64} color="#8b5cf6" />
            <Text style={styles.emptyStateText}>No vehicles added yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first vehicle to get started
            </Text>
          </View>
        }
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Ionicons name="add-circle" size={20} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add New Vehicle</Text>
      </TouchableOpacity>

      {/* Vehicle Add/Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#8b5cf6" />
              </TouchableOpacity>
            </View>

            {['registrationNumber', 'make', 'model', 'color'].map((field) => (
              <View key={field}>
                <Text style={styles.inputLabel}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}*
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={`e.g., ${field === 'registrationNumber' ? 'ABC-123' : field}`}
                  value={String(newVehicle[field as keyof typeof newVehicle] ?? '')}
                  onChangeText={(text) => setNewVehicle({...newVehicle, [field]: text})}
                />
              </View>
            ))}

            <View style={styles.defaultOption}>
              <Text style={styles.defaultText}>Set as default vehicle</Text>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  newVehicle.isDefault ? styles.toggleActive : styles.toggleInactive
                ]}
                onPress={() => setNewVehicle({...newVehicle, isDefault: !newVehicle.isDefault})}
              >
                <View style={[
                  styles.toggleKnob,
                  newVehicle.isDefault ? styles.toggleKnobRight : styles.toggleKnobLeft
                ]} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveVehicle}
            >
              <Text style={styles.saveButtonText}>
                {editingVehicle ? 'Save Changes' : 'Add Vehicle'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={cancelDeleteVehicle}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.deleteModalView]}>
            <View style={styles.deleteIconContainer}>
              <View style={styles.deleteIconCircle}>
                <Ionicons name="trash" size={32} color="#FFFFFF" />
              </View>
            </View>
            
            <Text style={styles.deleteModalTitle}>Remove Vehicle</Text>
            
            {vehicleToDelete && (
              <Text style={styles.deleteModalText}>
                Are you sure you want to remove your {vehicleToDelete.make} {vehicleToDelete.model}? 
                {vehicleToDelete.isDefault && " This is your default vehicle."}
              </Text>
            )}
            
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.cancelButton]}
                onPress={cancelDeleteVehicle}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.confirmDeleteButton]}
                onPress={confirmDeleteVehicle}
              >
                <Text style={styles.confirmDeleteText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  vehiclesContainer: {
    paddingHorizontal: 16,
  },
  vehicleCard: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  defaultBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    width: 57
  },
  defaultBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleTitle: {
    flex: 1,
  },
  vehicleMakeModel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  vehicleReg: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  vehicleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorText: {
    fontSize: 14,
    color: '#AAAAAA',
    marginRight: 8,
  },
  carColorHeading:{
    fontSize: 14,
    color: '#8b5cf6',
    marginRight: 8,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  footerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    padding: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#8b5cf6',
    marginLeft: 4,
  },
  deleteButton: {
    marginLeft: 16,
  },
  deleteText: {
    color: '#FF3B30',
  },
  addButton: {
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  defaultOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  defaultText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#8b5cf6',
  },
  toggleInactive: {
    backgroundColor: '#666666',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobLeft: {
    alignSelf: 'flex-start',
  },
  toggleKnobRight: {
    alignSelf: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteModalView: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  deleteIconContainer: {
    marginBottom: 16,
  },
  deleteIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  deleteModalText: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  deleteModalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#333333',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmDeleteButton: {
    backgroundColor: '#8b5cf6',
  },
  confirmDeleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});