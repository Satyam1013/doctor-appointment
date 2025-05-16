/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../api/cart-api';

type CartItem = {
  id: string;
  quantity: number;
  product: {
    title: string;
    price: number;
  };
};

export default function CartScreen() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
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

  const onUpdateQuantity = async (id: any, quantity: any) => {
    try {
      await updateCartItem(id, quantity);
      fetchCart();
    } catch {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  const onRemoveItem = async (id: any) => {
    try {
      await removeCartItem(id);
      fetchCart();
    } catch {
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text>{item.product.title}</Text>
      <Text>Qty: {item.quantity}</Text>
      <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
      <TouchableOpacity
        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
        }
      >
        <Text style={styles.button}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onRemoveItem(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (!cartItems.length)
    return (
      <View style={styles.emptyContainer}>
        <Text>Your cart is empty</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.clearButton}
        onPress={async () => {
          await clearCart();
          fetchCart();
        }}
      >
        <Text style={styles.clearText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  button: { fontSize: 22, color: '#007bff', marginHorizontal: 8 },
  remove: { color: 'red', marginLeft: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  clearButton: {
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  clearText: { color: '#fff', fontWeight: 'bold' },
});
