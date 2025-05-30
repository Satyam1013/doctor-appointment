/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { createOrder, verifyPayment } from '../api/payment-api';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const { amount } = route.params as { amount: number };
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);
  const [upi, setUpi] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const amountInPaise = amount * 100;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert(
        'Invalid Amount',
        'Please enter a valid amount greater than 0.',
      );
      return;
    }

    if (!upi || !upi.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID.');
      return;
    }

    try {
      setLoading(true);
      const { id: order_id, amount } = await createOrder(amountInPaise, upi);

      const options: any = {
        name: 'Mydent',
        description: 'Dental Product Purchase',
        currency: 'INR',
        amount,
        order_id,
        key: 'yfUqsbfAGKQkXC4w6agUSs66',
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: { color: '#F7D449' },
      };

      if (selectedUpiApp) {
        options.config = {
          display: {
            blocks: {
              upi: {
                name: 'UPI Apps',
                instruments: [{ method: 'upi', apps: [selectedUpiApp] }],
              },
            },
            sequence: ['block.upi'],
            preferences: { show_default_blocks: false },
          },
        };
      }

      RazorpayCheckout.open(options)
        .then(async (paymentData: any) => {
          const verifyRes = await verifyPayment({
            order_id: paymentData.razorpay_order_id,
            payment_id: paymentData.razorpay_payment_id,
            signature: paymentData.razorpay_signature,
          });
          console.log('✨ ~ verifyRes:', verifyRes);
          Alert.alert(
            '✅ Payment Successful',
            'Transaction verified successfully.',
          );
        })
        .catch((error: any) => {
          Alert.alert('❌ Payment Failed', error?.description || 'Cancelled');
        });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Order Summary</Text>
        <Text style={styles.amountText}>₹{amount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>UPI</Text>
        <TextInput
          label="UPI ID"
          value={upi}
          keyboardType="email-address"
          onChangeText={setUpi}
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.upiAppRow}>
          {[
            { id: 'google_pay', label: 'GPay' },
            { id: 'phonepe', label: 'PhonePe' },
            { id: 'paytm', label: 'Paytm' },
            { id: 'cred', label: 'CRED UPI' },
          ].map((app) => (
            <Button
              key={app.id}
              mode={selectedUpiApp === app.id ? 'contained' : 'outlined'}
              onPress={() => setSelectedUpiApp(app.id)}
              style={styles.upiAppButton}
            >
              {app.label}
            </Button>
          ))}
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handlePayment}
        loading={loading}
        disabled={loading}
        style={styles.payButton}
      >
        Pay Now
      </Button>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  upiAppRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  upiAppButton: {
    width: '48%',
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#F7D449',
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
});
