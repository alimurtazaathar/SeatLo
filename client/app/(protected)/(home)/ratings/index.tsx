import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface RatingScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface RatingsData {
  id: string;
  date: string;
  time: string;
  route: string;
  driver: string;
  passenger?: string;
  role: 'driver' | 'passenger';
  rating: number;
  review?: string;
  profilePic?: string;
}

export default function Ratings({ navigation }: RatingScreenProps) {
  const [role, setRole] = useState<'passenger' | 'driver'>('passenger');
  const [selectedRide, setSelectedRide] = useState<RatingsData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [ratings, setRatings] = useState<RatingsData[]>([
    {
      id: '1',
      date: 'April 27, 2025',
      time: '8:30 AM',
      route: 'Mochi Morh - GC - Millinium - Fast',
      driver:'You',
      passenger: 'John Smith',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'driver',
      rating: 5,
      review: 'Excellent driver, very punctual and safe driving!'
    },
    {
      id: '2',
      date: 'April 25, 2025',
      time: '5:45 PM',
      route: 'Disco Bakery - Milliium - Drigh rd - Fast',
      driver:'You',
      passenger: 'Sarah Johnson',
      profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'driver',
      rating: 2,
      review: 'Took a longer route than necessary'
    },
    {
      id: '3',
      date: 'April 23, 2025',
      time: '9:15 AM',
      route: 'North Nazimabad - Aysha Manzil - GC - Fast',
      driver: 'You',
      passenger: 'Mike Anderson',
      profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'driver',
      rating: 4,
      review: 'Polite driver, no issues'
    },
    {
      id: '4',
      date: 'April 22, 2025',
      time: '7:00 PM',
      route: 'North Nazimabad - Aysha Manzil - GC - Fast',
      driver: 'Emily',
      passenger: 'You',
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'passenger',
      rating: 3,
      review: 'Was late to the pickup point'
    },
    {
      id: '5',
      date: 'April 20, 2025',
      time: '3:30 PM',
      route: 'North Nazimabad - Aysha Manzil - GC - Fast',
      driver: 'Robert Davis',
      passenger: 'You',
      profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
      role: 'passenger',
      rating: 4,
      
    },
  ]);

  const filteredRides = ratings.filter(ride => ride.role === role);

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={20}
            color={star <= rating ? '#FFD700' : '#D3D3D3'}
          />
        ))}
      </View>
    );
  };

  const openReviewModal = (ride: RatingsData) => {
    setSelectedRide(ride);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ratings and Reviews</Text>
      </View>

      <View style={styles.roleToggleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'passenger' && styles.activeRole]}
          onPress={() => setRole('passenger')}
        >
          <Text style={[styles.roleText, role === 'passenger' && styles.activeRoleText]}>
          Passenger
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'driver' && styles.activeRole]}
          onPress={() => setRole('driver')}
        >
          <Text style={[styles.roleText, role === 'driver' && styles.activeRoleText]}>
          Driver
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ridesList}>
        {filteredRides.map((ride) => (
          <TouchableOpacity 
            key={ride.id} 
            style={styles.rideCard}
            onPress={() => openReviewModal(ride)}
          >
            <View style={styles.rideHeader}>
              <Text style={styles.rideDate}>
                {ride.date} • {ride.time}
              </Text>
              {renderStars(ride.rating)}
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeMarkers}>
                <View style={styles.markerDot} />
              </View>
              <View style={styles.routeDetails}>
                <Text style={styles.routePoint}>Route: {ride.route}</Text>
              </View>
            </View>

            <View style={styles.rideInfo}>
              <View style={styles.driverInfo}>
                {ride.profilePic && (
                  <Image
                    source={{ uri: ride.profilePic }}
                    style={styles.driverAvatar}
                  />
                )}
                <Text style={styles.driverName}>
                  {ride.role === 'driver' ? ride.passenger : ride.driver}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8b5cf6" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Review Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRide && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedRide.role === 'driver' ? 'Passenger Review' : 'Driver Review'}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#8b5cf6" />
                  </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                  {selectedRide.profilePic && (
                    <Image
                      source={{ uri: selectedRide.profilePic }}
                      style={styles.modalAvatar}
                    />
                  )}
                  <View>
                    <Text style={styles.userName}>
                      {selectedRide.role === 'driver' ? selectedRide.passenger : selectedRide.driver}
                    </Text>
                    <Text style={styles.rideDateTime}>
                      {selectedRide.date} • {selectedRide.time}
                    </Text>
                  </View>
                </View>

                <Text style={styles.routeText}>Route: {selectedRide.route}</Text>

                <View style={styles.ratingContainer}>
                  {renderStars(selectedRide.rating)}
                  <Text style={styles.ratingText}>{selectedRide.rating}/5</Text>
                </View>

                {selectedRide.review ? (
                  <View style={styles.reviewContainer}>
                    <Text style={styles.reviewTitle}>Their Review:</Text>
                    <Text style={styles.reviewText}>"{selectedRide.review}"</Text>
                  </View>
                ) : (
                  <Text style={styles.noReviewText}>No review provided</Text>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: "#8b5cf6",
    fontWeight: 'bold',
  },
  roleToggleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeRole: {
    backgroundColor: '#8b5cf6',
  },
  roleText: {
    color: '#D3D3D3',
    fontWeight: '500',
  },
  activeRoleText: {
    color: 'white',
  },
  ridesList: {
    flex: 1,
  },
  rideCard: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rideDate: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  routeMarkers: {
    width: 24,
    alignItems: 'center',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8b5cf6',
    marginTop: 6,
  },
  routeDetails: {
    flex: 1,
  },
  routePoint: {
    fontSize: 16,
    color: '#8b5cf6',
    marginBottom: 4,
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
    marginTop: 8,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  driverName: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: '#8b5cf6',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  rideDateTime: {
    fontSize: 12,
    color: '#D3D3D3',
  },
  routeText: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  reviewContainer: {
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: 'white',
    fontStyle: 'italic',
  },
  noReviewText: {
    fontSize: 14,
    color: '#D3D3D3',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#8b5cf6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});