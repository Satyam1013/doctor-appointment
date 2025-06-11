/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Carousel from '../components/Carousel';
import { addToCart } from '../api/cart-api';
import FeatureStats from '../components/FeatureStats';
import { getCarousels } from '../api/carousel-api';
import { getAllProducts } from '../api/product-api';
import ProductCard from '../components/ProductCard';
import {
  addToFavorite,
  getFavorites,
  removeFavoriteItem,
} from '../api/fav-api';
import { useFocusEffect } from '@react-navigation/native';

const ad1 = 'https://i.ibb.co/x88xsysH/banner.png';
const ad2 = 'https://i.ibb.co/JWgXbwRD/ad.png';
const ad3 = 'https://i.ibb.co/1f0q1t54/banner3.png';

export default function EComScreen({ navigation }: any) {
  const [topCarousel, setTopCarousel] = useState<{ uri: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const bestSellers = categories.filter((p) => p.bestSeller);
  const combos = categories.filter((p) => p.combos);
  const recommended = categories.filter((p) => p.recommended);

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      // 👇 Scroll to top on tab focus
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );

  const sections = [
    {
      title: 'Best Selling',
      data: bestSellers,
      ad: ad1,
    },
    {
      title: 'Save Big With Combos',
      data: combos,
      ad: ad2,
    },
    {
      title: 'Recommended For You',
      data: recommended,
      ad: ad3,
    },
  ].filter((section) => section.data.length > 0); // Avoid empty sections

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();
        setTopCarousel(
          res.data.topCarousel.map((img: any) => ({ uri: img.imageUrl })),
        );
      } catch (error) {
        console.error('Failed to load carousels:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setCategories(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const favRes = await getFavorites();
        setFavorites(favRes.data.map((item: any) => item.productId));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchCarousels();
    fetchProducts();
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleToggleFavorite = async (productId: string, newState: boolean) => {
    try {
      if (newState) {
        await addToFavorite(productId);
        setFavorites((prev) => [...prev, productId]);
      } else {
        await removeFavoriteItem(productId);
        setFavorites((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  const handleAddToCart = async (product: any, quantity: number) => {
    try {
      if (!product || !product._id) {
        Alert.alert('Error', 'Product ID is missing');
        return;
      }
      await addToCart(product._id, quantity);
      Alert.alert('Success', `${product.title} added to cart`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <Text style={styles.header}>Oral Care Categories</Text>
      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', {
                productId: item._id,
              })
            }
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.images[0] }} style={styles.icon} />
            </View>
            <Text style={styles.label}>{item.title || item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.grid}
      />

      {/* Sections with Ads */}
      {sections.map((section) => (
        <View key={section.title} style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={section.data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onAddToCart={(product: any, quantity: number) =>
                  handleAddToCart(product, quantity)
                }
                onToggleFavorite={() =>
                  handleToggleFavorite(item._id, !favorites.includes(item._id))
                }
              />
            )}
            contentContainerStyle={styles.horizontalList}
          />

          <Carousel images={topCarousel} />
        </View>
      ))}
      <FeatureStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  item: {
    width: '22%',
    margin: '1.5%',
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  label: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
  },
  sectionWrapper: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 13,
    color: '#007bff',
  },
  horizontalList: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    gap: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
