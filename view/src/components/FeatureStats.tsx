/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FeatureStats() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/footer.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 16, // left and right margin
    borderRadius: 16,
    overflow: 'hidden', // make borderRadius apply to child
    backgroundColor: '#E9F9FA',
  },
  image: {
    width: screenWidth - 32, // account for horizontal margin (16 + 16)
    height: 180,
    borderRadius: 16,
  },
});
