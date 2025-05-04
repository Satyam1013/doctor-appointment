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
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';

const categories = [
  { name: 'Ayurvedic', img: require('../../assets/images/cat.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat2.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat3.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat4.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat5.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat6.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat7.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat8.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat9.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat10.png') },
];

const videos = [
  { uri: '/videos/v1.mp4' },
  { uri: '/videos/v2.mp4' },
  { uri: '/videos/v3.mp4' },
  { uri: '/videos/v4.mp4' },
  { uri: '/videos/v5.mp4' },
  { uri: '/videos/v6.mp4' },
];

export default function ShopByCategory({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Category Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop By Category</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicinesScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('MedicinesScreen')}
          >
            <Image source={cat.img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Video Section */}
      <View style={styles.videoSection}>
        <Text style={styles.title}>Treatment Videos</Text>
        <View style={styles.videoGrid}>
          {videos.map((vid, idx) => (
            <Video
              key={idx}
              source={vid}
              onError={(e) => console.log('Video error:', e)}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              style={styles.video}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  viewAll: { color: '#1e90ff' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginBottom: 4,
  },
  videoSection: {
    marginTop: 20,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  video: {
    flexBasis: '48%',
    aspectRatio: 1080 / 1350,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#000',
  },
});
