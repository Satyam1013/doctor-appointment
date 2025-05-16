/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const doctors = [
  { id: '1', image: require('../../assets/images/doc.png') },
  { id: '2', image: require('../../assets/images/doc.png') },
];

export default function DoctorCard() {
  const renderItem = ({ item }: { item: { id: string; image: any } }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    width: Dimensions.get('window').width * 0.6,
    height: 190,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
