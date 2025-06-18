/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCoins } from '../api/coins-api';

interface CoinsProps {
  coins: number;
  bonus: number;
  purchased: number;
  consultation: number;
  createdAt: Date;
  userId: any;
}

const MyDentCoinsScreen = () => {
  const [coins, setCoins] = useState<CoinsProps | null>(null);

  const formattedDate = coins?.createdAt
    ? new Date(coins.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const coinDetails = [
    {
      id: '1',
      title: 'Referral Bonus',
      amount: `+${coins?.bonus ?? 0}`,
      createdAt: coins?.createdAt,
    },
    {
      id: '2',
      title: 'Purchased Coins',
      amount: `-${coins?.purchased ?? 0}`,
      createdAt: coins?.createdAt,
    },
    {
      id: '3',
      title: 'Consultation Coins',
      amount: `+${coins?.consultation ?? 0}`,
      createdAt: coins?.createdAt,
    },
  ];

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await getCoins();
      const data = res.data;
      setCoins(data);
    } catch (err) {
      console.error('Failed to fetch aligner or carousel data:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MyDent Coins</Text>

      {/* Coin Balance Card */}
      <View style={styles.balanceCard}>
        <Ionicons name="wallet" size={32} color="#fff" />
        <Text style={styles.coinAmount}>{coins?.coins ?? 0} Coins</Text>
        <Text style={styles.coinLabel}>Available Balance</Text>
      </View>

      {/* Redeem Button */}
      <TouchableOpacity style={styles.redeemButton}>
        <Text style={styles.redeemButtonText}>Redeem Coins</Text>
      </TouchableOpacity>

      {/* Coin History */}
      <Text style={styles.sectionTitle}>Coin History</Text>
      <FlatList
        data={coinDetails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>{formattedDate}</Text>
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
