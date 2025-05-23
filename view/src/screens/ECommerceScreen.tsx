/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useEffect, useState } from 'react';
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

const ad1 = 'https://i.ibb.co/x88xsysH/banner.png';
const ad2 = 'https://i.ibb.co/JWgXbwRD/ad.png';
const ad3 = 'https://i.ibb.co/1f0q1t54/banner3.png';

const sections = [
  {
    title: 'Best Selling',
    data: [
      {
        title: 'Aligners and retainer',
        _id: '682779a388e60dac093dbb93',
        image: 'https://i.ibb.co/m5mprWW4/1.png',
        price: 4999,
      },
      {
        title: 'Pull tool',
        _id: '682779a388e60dac093dbb92',
        image: 'https://i.ibb.co/S41Y360P/1.png',
        price: 499,
      },
    ],
    ad: ad1,
  },
  {
    title: 'Save Big With Combos',
    data: [
      {
        title: 'Tooth paste',
        _id: '682779a388e60dac093dbb8e',
        image: 'https://i.ibb.co/kVwPKD5v/1.png',
        price: 199,
      },
      {
        title: 'Water flosser',
        _id: '682779a388e60dac093dbb8f',
        image: 'https://i.ibb.co/vCQrD1rC/1.png',
        price: 2000,
      },
    ],
    ad: ad2,
  },
  {
    title: 'Recommended For You',
    data: [
      {
        title: 'Whitening pen',
        _id: '682779a388e60dac093dbb8a',
        image: 'https://i.ibb.co/KjDBqrgG/1.png',
        price: 599,
      },
      {
        title: 'Teeth whitening kit',
        _id: '682779a388e60dac093dbb8b',
        image: 'https://i.ibb.co/Jwspv8Yz/1.png',
        price: 2100,
      },
    ],
    ad: ad3,
  },
];

export default function EComScreen({ navigation }: any) {
  const [topCarousel, setTopCarousel] = useState<{ uri: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

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

    fetchCarousels();
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  const handleAddToCart = async (product: any) => {
    try {
      if (!product || !product._id) {
        Alert.alert('Error', 'Product ID is missing');
        return;
      }
      await addToCart(product._id, 1);
      Alert.alert('Success', `${product.title} added to cart`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  const renderProductCard = (item: {
    title: string;
    _id: string;
    image: string;
    price: number;
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardName} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardPrice}>₹{item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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
            renderItem={({ item }) => renderProductCard(item)}
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
    // paddingHorizontal: 12,
    paddingTop: 16,
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
  card: {
    width: 160,
    height: 220,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  cardName: {
    fontSize: 12,
    marginTop: 6,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 6,
  },
  addText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  adImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 12,
  },
});
