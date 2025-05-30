/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { getFavorites } from '../api/fav-api';

type FavoriteItem = {
  _id: string;
  userId: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    // Add other product fields you use
  };
};

const FavProductScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteProducts(favorites.data);
      } catch (err) {
        console.error('Failed to load favorite products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddToCart = () => {
    // Add cart logic
  };

  const handleToggleFavorite = (productId: string, newState: boolean) => {
    setFavoriteProducts((prev) =>
      prev.filter((favItem: any) => {
        if (!newState) {
          return favItem.product._id !== productId; // Remove if unfavorited
        }
        return true; // Keep all if still favorite
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
      <Text style={styles.header}>Your Favorites</Text>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.product._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            item={item.product}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      />
    </View>
  );
};

export default FavProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 120,
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    color: '#333',
  },
  list: {
    paddingBottom: 60,
    paddingHorizontal: 4,
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
