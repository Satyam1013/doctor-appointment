import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FeatureStats() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.ibb.co/spBPtGHg/footer.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 120,
    overflow: 'hidden',
    backgroundColor: '#E9F9FA',
  },
  image: {
    width: screenWidth - 32,
    height: 180,
    borderRadius: 16,
  },
});
