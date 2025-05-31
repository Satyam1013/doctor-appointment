/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useRoute } from '@react-navigation/native';
import { createOrder, verifyPayment } from '../api/payment-api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

// ✅ Grab the correct type for icon names
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const PaymentScreen = () => {
  const route = useRoute();
  const { amount } = route.params as { amount: number };
  const [upi, setUpi] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const upiApps = [
    { id: 'google_pay', label: 'Google Pay' },
    { id: 'phonepe', label: 'PhonePe' },
    { id: 'paytm', label: 'PayTM' },
    { id: 'cred', label: 'CRED UPI' },
  ];

  const handlePayment = async () => {
    const amountInPaise = amount * 100;

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

  const PaymentMethodCard = ({
    label,
    offer,
    iconName,
  }: {
    label: string;
    offer?: string;
    iconName: IconName; // ✅ Use the correct type
  }) => (
    <View style={styles.methodCard}>
      <View style={styles.methodIconPlaceholder}>
        <MaterialCommunityIcons name={iconName} size={24} color="#555" />
      </View>
      <View style={styles.methodTextContainer}>
        <Text style={styles.methodLabel}>{label}</Text>
        {offer && <Text style={styles.methodOffer}>{offer}</Text>}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color="#999" />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.header}>Select Payment Method</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your UPI ID"
            value={upi}
            onChangeText={setUpi}
            keyboardType="email-address"
          />

          <View style={styles.upiRow}>
            {upiApps.map((app) => (
              <TouchableOpacity
                key={app.id}
                style={[
                  styles.upiAppButton,
                  selectedUpiApp === app.id && styles.selectedUpiApp,
                ]}
                onPress={() => setSelectedUpiApp(app.id)}
              >
                <Text style={styles.upiAppText}>{app.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <PaymentMethodCard
            label="Credit / Debit / ATM Card"
            offer="Save up to 1.5%"
            iconName="credit-card-outline"
          />
          <PaymentMethodCard
            label="EMI"
            offer="3–6 months EMI"
            iconName="calendar-clock"
          />
          <PaymentMethodCard label="Net Banking" iconName="bank-outline" />
          <PaymentMethodCard label="Wallet" iconName="wallet-outline" />
          <PaymentMethodCard label="Pay Later" iconName="clock-outline" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.total}>₹{amount}</Text>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : 'Pay'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    paddingHorizontal: 16,
    color: '#000',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  methodIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  methodOffer: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  upiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  upiAppButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    width: '48%',
  },
  selectedUpiApp: {
    backgroundColor: '#F7D449',
  },
  upiAppText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#aaa',
  },
  footer: {
    // position: 'absolute',
    bottom: 0,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingBottom: 140,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#F7D449',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  payButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
