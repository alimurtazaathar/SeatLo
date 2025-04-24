import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactItem = ({ title, icon, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={onPress}>
      <View style={styles.contactIconContainer}>
        <Ionicons name={icon} size={24} color="#4A80F0" />
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
    </TouchableOpacity>
  );
};

const ContactScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      Alert.alert(
        'Message Sent',
        'We have received your message and will get back to you soon.',
        [{ text: 'OK', onPress: () => {
          setSubject('');
          setMessage('');
        }}]
      );
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact Options</Text>
        
        <ContactItem 
          title="Live Chat" 
          icon="chatbubble-ellipses-outline" 
          description="Chat with our support team (9AM-6PM)" 
          onPress={() => { /* Open live chat */ }}
        />
        
        <ContactItem 
          title="Call Support" 
          icon="call-outline" 
          description="1-800-CARPOOL (9AM-6PM)" 
          onPress={() => { /* Open phone app */ }}
        />
        
        <ContactItem 
          title="FAQ" 
          icon="help-circle-outline" 
          description="Find answers to common questions" 
          onPress={() => { /* Navigate to FAQ */ }}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Send Us a Message</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="What's this about?"
            value={subject}
            onChangeText={setSubject}
          />
          
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Tell us how we can help..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={sending}
          >
            {sending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitText}>Send Message</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Connect With Us</Text>
        
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={28} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={28} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={28} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-whatsapp" size={28} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#222222',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#8b5cf6',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F0F5FF',
  },
  contactDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#F0F5FF',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    paddingTop: 16,
  },
  addressHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
});

export default ContactScreen;

