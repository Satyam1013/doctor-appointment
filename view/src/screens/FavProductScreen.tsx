/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { getFavorites } from '../api/fav-api';
import { useCart } from '../contexts/CartContext';
import { addToCart } from '../api/cart-api';

type FavoriteItem = {
  _id: string;
  userId: string;
  product: {
    _id: string;
    quantity: number;
  };
};

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 2 - 20;

const removeDuplicateProducts = (items: FavoriteItem[]): FavoriteItem[] => {
  const uniqueMap = new Map<string, FavoriteItem>();
  items.forEach((item) => {
    if (!uniqueMap.has(item.product._id)) {
      uniqueMap.set(item.product._id, item);
    }
  });
  return Array.from(uniqueMap.values());
};

const FavProductScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        const uniqueFavorites = removeDuplicateProducts(favorites.data);
        setFavoriteProducts(uniqueFavorites);
      } catch (err) {
        console.error('Failed to load favorite products:', err);
        Alert.alert('Error', 'Unable to fetch favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddToCart = (
    product: FavoriteItem['product'],
    quantity: number,
  ) => {
    addToCart(product._id, quantity);
    Alert.alert(
      'Added to Cart',
      `$New product added with quantity ${quantity}`,
    );
  };

  const handleToggleFavorite = (productId: string, newState: boolean) => {
    setFavoriteProducts((prev) =>
      prev.filter((favItem) => {
        if (!newState) {
          return favItem.product._id !== productId;
        }
        return true;
      }),
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00BCD4" />
      </View>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.header}>Your Favorites</Text>}
        data={favoriteProducts}
        keyExtractor={(item) => item.product._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ProductCard
            item={item.product}
            style={{ width: itemWidth }}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    color: '#333',
  },
  list: {
    paddingBottom: 120,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
