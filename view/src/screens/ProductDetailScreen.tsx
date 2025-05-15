/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Product, productData } from '../constants/productData';

const formatTitleToKey = (title: string) =>
  title.toLowerCase().replace(/ /g, '');

export default function ProductDetailScreen({ route }: any) {
  const { category } = route.params;
  const key = formatTitleToKey(category);
  const product = productData[key];

  const possibleSections: { label: string; key: keyof Product }[] = [
    { label: 'Product Details', key: 'productDetails' },
    { label: 'Benefits', key: 'benefits' },
    { label: 'How to Use', key: 'howToUse' },
    { label: 'Ingredients', key: 'ingredients' },
    { label: 'Caution', key: 'caution' },
    { label: 'Information', key: 'information' },
  ];

  const sections = possibleSections.filter((section) => product[section.key]);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {product.images.map((imgSrc: any, idx: number) => (
          <Image key={idx} source={imgSrc} style={styles.productImage} />
        ))}
      </ScrollView>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.tags}>
          {product.tags.map((tag, idx) => (
            <Text key={idx} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <Text style={styles.price}>
          ₹{product.price}{' '}
          <Text style={styles.strike}>₹{product.originalPrice}</Text>{' '}
          <Text style={styles.discount}>{discount}% off</Text>
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.sectionContainer}>
        {sections.map(({ label, key }) => (
          <View key={label} style={styles.section}>
            <TouchableOpacity
              onPress={() => toggleSection(label)}
              style={[
                styles.sectionHeader,
                expandedSection === label && styles.sectionHeaderActive,
              ]}
            >
              <Text style={styles.sectionTitle}>{label.toLowerCase()}</Text>
              <Text style={styles.plus}>
                {expandedSection === label ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedSection === label && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionText}>
                  {product[key] || 'No data available'}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  productImage: { width: 400, height: 300, resizeMode: 'cover' },
  detailsContainer: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
  },
  price: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  strike: { textDecorationLine: 'line-through', color: '#888', fontSize: 16 },
  discount: { color: 'green', fontWeight: '600', fontSize: 16 },
  description: { fontSize: 14, color: '#333', lineHeight: 20 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 16 },
  section: { marginBottom: 12 },
  sectionHeader: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderActive: {
    backgroundColor: '#dbeeff',
  },
  sectionTitle: {
    textTransform: 'lowercase',
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
  plus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#ff4d4d',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
