/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const categories = [
  {
    title: 'Whitening booster gel',
    icon: require('../../assets/images/ecom/whiteningboostergel/1.png'),
  },
  {
    title: 'Whitening gel',
    icon: require('../../assets/images/ecom/whiteninggel/1.png'),
  },
  {
    title: 'Whitening pen',
    icon: require('../../assets/images/ecom/whiteningpen/1.png'),
  },
  {
    title: 'Teeth whitening kit',
    icon: require('../../assets/images/ecom/teethwhiteningkit/1.png'),
  },
  {
    title: 'Teeth whitening serum',
    icon: require('../../assets/images/ecom/teethwhiteningserum/1.png'),
  },
  {
    title: 'Teeth whitening strips',
    icon: require('../../assets/images/ecom/teethwhiteningstrips/1.png'),
  },
  {
    title: 'Tooth paste',
    icon: require('../../assets/images/ecom/toothpaste/1.png'),
  },
  {
    title: 'Water flosser',
    icon: require('../../assets/images/ecom/waterflosser/1.png'),
  },
  {
    title: 'Chewes',
    icon: require('../../assets/images/ecom/chewes/1.png'),
  },
  {
    title: 'Electronic tooth brush',
    icon: require('../../assets/images/ecom/electronictoothbrush/1.png'),
  },
  {
    title: 'Pull tool',
    icon: require('../../assets/images/ecom/pulltool/1.png'),
  },
  {
    title: 'Aligners and retainer',
    icon: require('../../assets/images/ecom/aligners/1.png'),
  },
  {
    title: 'Aligners foam',
    icon: require('../../assets/images/ecom/alignersfoam/1.png'),
  },
  {
    title: 'Check retractor',
    icon: require('../../assets/images/ecom/checkretractor/1.png'),
  },
];

// Sample ad placeholders (replace with actual ad images)
const ad1 = require('../../assets/images/banner.png');
const ad2 = require('../../assets/images/banner2.png');
const ad3 = require('../../assets/images/banner3.png');

// Randomly pick category items for mock products
const getRandomCategoryImage = () => {
  const randomItem = categories[Math.floor(Math.random() * categories.length)];
  return randomItem.icon;
};

const sections = [
  {
    title: 'Best Selling',
    data: [
      {
        id: '1',
        name: 'Amlant Tablet',
        price: '₹130',
        rating: '4.4',
        image: getRandomCategoryImage(),
      },
      {
        id: '2',
        name: 'Trailokya Vati',
        price: '₹180',
        rating: '4.5',
        image: getRandomCategoryImage(),
      },
    ],
    ad: ad1,
  },
  {
    title: 'Save Big With Combos',
    data: [
      {
        id: '3',
        name: 'Get the Glow Combo',
        price: '₹1,197',
        rating: '4.6',
        image: getRandomCategoryImage(),
      },
      {
        id: '4',
        name: 'Golden Radiance Combo',
        price: '₹1,087',
        rating: '4.7',
        image: getRandomCategoryImage(),
      },
    ],
    ad: ad2,
  },
  {
    title: 'Recommended For You',
    data: [
      {
        id: '5',
        name: 'Amla Churna',
        price: '₹88',
        rating: '4.4',
        image: getRandomCategoryImage(),
      },
      {
        id: '6',
        name: 'Fungiwin Ointment',
        price: '₹133',
        rating: '4.5',
        image: getRandomCategoryImage(),
      },
    ],
    ad: ad3,
  },
];

export default function EComScreen({ navigation }: any) {
  const renderProductCard = (item: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addButton}>
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
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', {
                category: item.title,
              })
            }
          >
            <View style={styles.imageWrapper}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <Text style={styles.label}>{item.title}</Text>
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderProductCard(item)}
            contentContainerStyle={styles.horizontalList}
          />

          <Image source={section.ad} style={styles.adImage} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 100,
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
