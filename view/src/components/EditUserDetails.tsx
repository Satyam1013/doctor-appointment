/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

export default function EditProfileForm({ onClose }: { onClose: () => void }) {
  const { user, setUser } = useUser();
  const { token } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `https://doctor-appointment-5j6e.onrender.com/users/${user?._id}`,
        { firstName, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUser(res.data);
      onClose();
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Button title="Save Changes" onPress={handleUpdate} />
      <Button title="Cancel" color="red" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
});
