/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FeatureStats() {
  const images = [
    require('../../assets/images/features.png'),
    require('../../assets/images/features2.png'),
    require('../../assets/images/features3.png'),
    require('../../assets/images/features4.png'),
  ];

  return (
    <View style={styles.container}>
      {images.map((img, idx) => (
        <Image key={idx} source={img} style={styles.image} resizeMode="cover" />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#E9F9FA', // same light blue background
    padding: 16,
    borderRadius: 12,
  },
  image: {
    width: (screenWidth - 48) / 2, // two columns with gap
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
});
