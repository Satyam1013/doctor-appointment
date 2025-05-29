/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { createOrder, verifyPayment } from '../api/payment-api';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('0');
  const [upi, setUpi] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const amountInPaise = parseInt(amount) * 100;

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

      RazorpayCheckout.open({
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
      })
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
      <Card style={styles.card}>
        <Card.Title title="Payment Summary" />
        <Card.Content>
          <TextInput
            label="Amount (₹)"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
            style={styles.input}
          />
          <TextInput
            label="UPI ID"
            value={upi}
            keyboardType="email-address"
            onChangeText={setUpi}
            autoCapitalize="none"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handlePayment}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Pay Now
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 10,
    elevation: 4,
    borderRadius: 10,
  },
  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#F7D449',
  },
});
