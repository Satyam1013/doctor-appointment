import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CancelTicketScreen = () => {
  // Simulate ticket data
  const [ticket, setTicket] = useState({
    id: 'tk123',
    title: 'Aligner not fitting properly',
    status: 'OPEN',
    message: 'My aligner doesn’t fit well and feels loose on the lower jaw.',
  });

  const handleCancel = () => {
    if (ticket.status === 'CANCELLED') return;

    Alert.alert(
      'Cancel Ticket',
      'Are you sure you want to cancel this ticket?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // Simulate cancelling
            setTicket({ ...ticket, status: 'CANCELLED' });
            Alert.alert(
              'Ticket Cancelled',
              'Your support ticket has been cancelled.',
            );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ticket Details</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.label}>
          Status:{' '}
          <Text
            style={[
              styles.status,
              {
                color: ticket.status === 'OPEN' ? '#28a745' : '#dc3545',
              },
            ]}
          >
            {ticket.status}
          </Text>
        </Text>
        <Text style={styles.message}>{ticket.message}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.cancelButton,
          ticket.status === 'CANCELLED' && { backgroundColor: '#ccc' },
        ]}
        onPress={handleCancel}
        disabled={ticket.status === 'CANCELLED'}
      >
        <Ionicons name="close-circle-outline" size={20} color="#fff" />
        <Text style={styles.cancelButtonText}>
          {ticket.status === 'CANCELLED' ? 'Ticket Cancelled' : 'Cancel Ticket'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafa',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  message: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
