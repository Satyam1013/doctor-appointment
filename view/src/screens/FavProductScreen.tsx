/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/product-api';

type Product = {
  _id: string;
  isFavorite: boolean;
  // Add other product fields as needed
  [key: string]: any;
};

const FavProductScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const products = await getAllProducts();
        const favorites = products.filter(
          (product: any) => product.isFavorite === true,
        );
        setFavoriteProducts(favorites);
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
      prev.map((p: any) =>
        p._id === productId ? { ...p, isFavorite: newState } : p,
      ),
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
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
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
