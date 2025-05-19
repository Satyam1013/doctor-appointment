/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const products = [
  { img: require('../../assets/images/top.jpg') },
  { img: require('../../assets/images/top2.jpg') },
  { img: require('../../assets/images/top3.jpg') },
];

export default function Transformation({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Transformations</Text>
      <Text style={styles.sectionSubtitle}>Before vs After Treatment</Text>

      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransformationScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {products.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() =>
              navigation.navigate('TransformationBlogDetailsScreen', {
                blog: item,
              })
            }
          >
            <Image source={item.img} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  viewAll: {
    fontSize: 13,
    color: '#1e90ff',
    fontWeight: '500',
  },
  scrollRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  card: {
    width: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 220,
  },
  cardFooter: {
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
});
