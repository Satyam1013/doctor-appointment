import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const coinHistory = [
  {
    id: '1',
    title: 'Completed Consultation',
    amount: '+50',
    date: '12 Jun 2025',
  },
  { id: '2', title: 'Purchased Aligners', amount: '-200', date: '10 Jun 2025' },
  { id: '3', title: 'Referral Bonus', amount: '+100', date: '05 Jun 2025' },
];

const MyDentCoinsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MyDent Coins</Text>

      {/* Coin Balance Card */}
      <View style={styles.balanceCard}>
        <Ionicons name="wallet" size={32} color="#fff" />
        <Text style={styles.coinAmount}>350 Coins</Text>
        <Text style={styles.coinLabel}>Available Balance</Text>
      </View>

      {/* Redeem Button */}
      <TouchableOpacity style={styles.redeemButton}>
        <Text style={styles.redeemButtonText}>Redeem Coins</Text>
      </TouchableOpacity>

      {/* Coin History */}
      <Text style={styles.sectionTitle}>Coin History</Text>
      <FlatList
        data={coinHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.historyAmount,
                { color: item.amount.startsWith('+') ? '#28a745' : '#dc3545' },
              ]}
            >
              {item.amount}
            </Text>
          </View>
        )}
      />

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>How to earn more coins?</Text>
        <Text style={styles.infoText}>• Complete your profile</Text>
        <Text style={styles.infoText}>• Refer friends to MyDent</Text>
        <Text style={styles.infoText}>• Book consultations and follow-ups</Text>
      </View>
    </View>
  );
};

export default MyDentCoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafa',
    paddingBottom: 120,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  balanceCard: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  coinAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  coinLabel: {
    fontSize: 16,
    color: '#e6e6e6',
    marginTop: 4,
  },
  redeemButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  redeemButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#eef6ff',
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007bff',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
