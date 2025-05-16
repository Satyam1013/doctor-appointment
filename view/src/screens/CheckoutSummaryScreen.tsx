/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

export default function CheckoutSummaryScreen({ navigation }: any) {
  const handlePayment = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/consultant.jpg')}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>video consultation</Text>
          <Text style={styles.subtitle}>teeth alignment</Text>
          <Text style={styles.price}>₹199</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.promoBox}>
        <Text style={styles.promoText}>Promotions</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.priceBox}>
        <View style={styles.priceRow}>
          <Text style={styles.label}>Total (with tax)</Text>
          <Text style={styles.value}>₹ 399</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.label}>Discount on MRP</Text>
          <Text style={[styles.value, { color: 'green' }]}>–₹ 200</Text>
        </View>
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Payable Amount</Text>
          <Text style={styles.totalValue}>₹ 199</Text>
        </View>
      </View>

      <Text style={styles.savings}>
        You’ll save ₹ 200 on this order/purchase
      </Text>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Make Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    padding: 20,
    paddingBottom: 120,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#6c757d',
    marginVertical: 4,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  promoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  promoText: {
    fontWeight: '500',
    fontSize: 16,
  },
  arrow: {
    fontSize: 24,
    color: '#d43f3f',
  },
  priceBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  totalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  savings: {
    textAlign: 'center',
    color: 'green',
    marginVertical: 16,
    fontSize: 14,
  },
  payButton: {
    backgroundColor: '#d43f3f',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
