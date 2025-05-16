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
      <View style={styles.header}>
        <Text style={styles.title}>Before vs After Treatment</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransformationScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
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
            <View style={styles.imageWrapper}>
              <Image
                source={item.img}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>View Story</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAll: {
    color: '#1e90ff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageWrapper: {
    height: 160,
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
});
