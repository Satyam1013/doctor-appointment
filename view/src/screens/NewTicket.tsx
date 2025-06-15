import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewTicketScreen = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }
    setCategory('Class');
    // Replace this with your backend call
    console.log({ title, category, message });
    Alert.alert('Ticket Submitted', 'Your request has been sent.');
    setTitle('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Support Ticket</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Short summary of the issue"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{category}</Text>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </TouchableOpacity>

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Describe your issue in detail..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.attachment}>
        <Ionicons name="attach" size={20} color="#007bff" />
        <Text style={styles.attachText}>Attach File (optional)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f4f8',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  attachText: {
    marginLeft: 8,
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
