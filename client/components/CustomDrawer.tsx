import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { useState } from "react";
import { Link, Href, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSession } from "@/utils/ctx";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomDrawer() {
  const { signOut } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("Mazdoor Bhai");
  const [isEditingName, setIsEditingName] = useState(false);
  const userEmail = "k224150@nu.edu.pk";

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to navigate to profile screen with user data
  const navigateToProfile = () => {
    router.push({
      pathname: "/(protected)/(home)/profile",
      params: {
        userInfo: JSON.stringify({
          fullName: userName,
          email: userEmail,
          profileImage: profileImage
        })
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile section */}
      <View style={styles.profileSection}>
        <Pressable onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("@/assets/images/shutter-2008488_1280.webp")
            }
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </View>
        </Pressable>

        {/* Editable Name */}
        <View style={styles.nameContainer}>
          {isEditingName ? (
            <TextInput
              style={styles.nameInput}
              value={userName}
              onChangeText={setUserName}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <Pressable onPress={() => setIsEditingName(true)}>
              <Text style={styles.profileName}>{userName}</Text>
            </Pressable>
          )}
          <Pressable onPress={() => setIsEditingName((prev) => !prev)} style={styles.nameEditIcon}>
            <Ionicons name="create-outline" size={16} color="#8b5cf6" />
          </Pressable>
        </View>

        <Text style={styles.profileEmail}>{userEmail}</Text>
      </View>

      {/* Navigation Links */}
      <View style={styles.navContainer}>
        <NavItem 
          href="/(protected)/(home)" 
          icon="home-outline" 
          label="Home" 
        />
        <Pressable style={styles.navItem} onPress={navigateToProfile}>
          <Ionicons name="person" size={22} color="#8b5cf6" />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
        <NavItem 
          href="/(protected)/(home)/complaint" 
          icon="alert-circle-outline" 
          label="Complaint" 
        />
        <NavItem 
          href="/(protected)/(home)/contact" 
          icon="mail-outline" 
          label="Contact Us" 
        />
        <NavItem 
          href="/(protected)/(home)/ratings" 
          icon="star-outline" 
          label="My Ratings" 
        />
        <NavItem 
          href="/(protected)/(home)/ride-history" 
          icon="time-outline" 
          label="Ride History" 
        />
        <NavItem 
          href="/(protected)/(home)/settings" 
          icon="settings-outline" 
          label="Settings" 
        />
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={signOut}>
        <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Use Href type from expo-router instead of custom ValidRoutes
interface NavItemProps {
  href: Href;
  icon: string;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => (
  <Link href={href} asChild>
    <Pressable style={styles.navItem}>
      <Ionicons name={icon as any} size={22} color="#8b5cf6" />
      <Text style={styles.navText}>{label}</Text>
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#222222',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    padding: 5,
    borderWidth: 2,
    borderColor: '#222222',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  profileName: {
    fontSize: 20,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 20,
    color: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#8b5cf6',
    minWidth: 150,
    padding: 2,
    textAlign: 'center',
  },
  nameEditIcon: {
    marginLeft: 8,
  },
  profileEmail: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 5,
  },
  navContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  navText: {
    fontSize: 16,
    color: '#f8fafc',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginHorizontal: 20,
    paddingBottom:40
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
    borderBottomColor: '#333333',
    marginLeft:15,
    
  },
});