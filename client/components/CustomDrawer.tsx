import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSession } from "@/utils/ctx";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawer() {
  const { signOut } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("Mazdoor Bhai");
  const [isEditingName, setIsEditingName] = useState(false);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Ionicons name="create-outline" size={16} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.profileEmail}>k224150@nu.edu.pk</Text>
      </View>

      {/* Navigation Links */}
      <View style={{ padding: 20, paddingTop: 30, marginBottom: 'auto' }}>
        <Link href="/(app)/(home)" asChild>
          <Pressable>
            <Text style={styles.linkText}>Home</Text>
          </Pressable>
        </Link>

        <Link href="/(app)/(home)/complaint" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Complaint</Text>
          </Pressable>
        </Link>

        <Link href="/(app)/(home)/contact" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Contact Us</Text>
          </Pressable>
        </Link>

        <Link href="/(app)/(home)/settings" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Settings</Text>
          </Pressable>
        </Link>

        <Pressable style={{ paddingVertical: 30 }} onPress={signOut}>
          <Text style={{ color: 'red', fontSize: 15, fontWeight: "bold" }}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#222222',
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#4A80F0',
    borderRadius: 10,
    padding: 3,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 18,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    minWidth: 120,
    padding: 2,
  },
  nameEditIcon: {
    marginLeft: 8,
  },
  profileEmail: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  link: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    fontWeight: "bold",
  }
});
