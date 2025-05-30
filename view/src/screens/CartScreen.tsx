/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../api/cart-api';

type CartItem = {
  _id: string;
  quantity: number;
  product: {
    title: string;
    price: number;
    quantity: number;
  };
};

export default function CartScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const onUpdateQuantity = async (id: string, quantity: number) => {
    try {
      await updateCartItem(id, quantity);
      fetchCart();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        'Failed to update item. Please try again.';
      Alert.alert('Error', message);
    }
  };

  const onRemoveItem = async (id: string) => {
    try {
      await removeCartItem(id);
      fetchCart();
    } catch {
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.productTitle}>{item.product.title}</Text>
        <Text style={styles.productPrice}>
          ₹{(item.product.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text
              style={[
                styles.qtyButton,
                item.quantity <= 1 && styles.disabledButton,
              ]}
            >
              -
            </Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => onUpdateQuantity(item._id, item.quantity + 1)}
            disabled={item.quantity >= item.product.quantity}
          >
            <Text
              style={[
                styles.qtyButton,
                item.quantity >= item.product.quantity && styles.disabledButton,
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => onRemoveItem(item._id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (!cartItems.length)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <Text style={styles.heading}>🛒 Cart</Text>

        {cartItems.map((item) => renderItem({ item }))}

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={async () => {
              await clearCart();
              fetchCart();
            }}
          >
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                from: 'cart',
                amount: totalAmount,
              })
            }
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#007bff',
  },
  disabledButton: {
    opacity: 0.4,
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  remove: {
    color: '#ff3b30',
    fontSize: 14,
  },
  summaryContainer: {
    padding: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});
