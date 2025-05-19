/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

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
  { img: 'https://i.ibb.co/d4sRZBkM/top.jpg' },
  { img: 'https://i.ibb.co/mCzkYKwb/top2.jpg' },
  { img: 'https://i.ibb.co/RGrv0vh3/top3.jpg' },
  { img: 'https://i.ibb.co/9k3HSkQv/top4.jpg' },
  { img: 'https://i.ibb.co/8njCwJp3/top5.jpg' },
  { img: 'https://i.ibb.co/rGKmXFmP/top6.png' },
  { img: 'https://i.ibb.co/QvMt5R4Q/top7.jpg' },
  { img: 'https://i.ibb.co/9kFQLP6Q/top8.png' },
  { img: 'https://i.ibb.co/5xf0RRw2/top9.jpg' },
  { img: 'https://i.ibb.co/Y4ySZ6Kx/top10.jpg' },
  { img: 'https://i.ibb.co/q3ByqRT2/top11.jpg' },
  { img: 'https://i.ibb.co/23cnTL7D/top12.jpg' },
  { img: 'https://i.ibb.co/99gh6d36/top13.jpg' },
  { img: 'https://i.ibb.co/Ld04SLYs/top14.jpg' },
  { img: 'https://i.ibb.co/KcRJVtLR/top15.jpg' },
  { img: 'https://i.ibb.co/Kpyw2VWn/top16.png' },
  { img: 'https://i.ibb.co/HTgdzLqN/top17.jpg' },
  { img: 'https://i.ibb.co/gMhDRM76/top18.jpg' },
  { img: 'https://i.ibb.co/Qjq4zwyj/top19.jpg' },
  { img: 'https://i.ibb.co/67XcFTrg/top20.jpg' },
  { img: 'https://i.ibb.co/nMLDRxDd/top21.jpg' },
];

export default function TransformationScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Before vs After Treatment</Text>

      <View style={styles.grid}>
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
            <Image
              source={{ uri: item.img }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 12 },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 0.8,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
