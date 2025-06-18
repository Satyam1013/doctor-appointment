/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTicket, updateTicketStatus } from '../api/tickets-api';

const CancelTicketScreen = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicket();
        if (response?.data?.length) {
          setTickets(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        Alert.alert('Error', 'Could not load ticket data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleCancel = (ticketId: string) => {
    const ticket = tickets.find((t) => t._id === ticketId);
    if (!ticket || ticket.status === 'closed') return;

    Alert.alert(
      'Cancel Ticket',
      'Are you sure you want to cancel this ticket?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = await updateTicketStatus(ticketId, 'closed');
              setTickets((prev) =>
                prev.map((t) => (t._id === ticketId ? updated : t)),
              );
              Alert.alert('Success', 'Ticket has been cancelled.');
            } catch (error) {
              console.error('Cancel failed:', error);
              Alert.alert('Error', 'Failed to cancel the ticket.');
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!tickets.length) {
    return (
      <View style={styles.center}>
        <Text>No tickets found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Tickets</Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.label}>
              Status:{' '}
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === 'open'
                        ? '#28a745'
                        : item.status === 'closed'
                          ? '#dc3545'
                          : '#6c757d',
                  },
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
            </Text>
            <Text style={styles.message}>{item.message}</Text>

            <TouchableOpacity
              style={[
                styles.cancelButton,
                item.status === 'closed' && { backgroundColor: '#ccc' },
              ]}
              onPress={() => handleCancel(item._id)}
              disabled={item.status === 'closed'}
            >
              <Ionicons name="close-circle-outline" size={20} color="#fff" />
              <Text style={styles.cancelButtonText}>
                {item.status === 'closed' ? 'Ticket Closed' : 'Cancel Ticket'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    marginBottom: 16,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 20,
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
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
