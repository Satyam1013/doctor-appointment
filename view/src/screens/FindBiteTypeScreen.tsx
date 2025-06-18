/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getCarousels } from '../api/carousel-api';
import Carousel from '../components/Carousel';

const categories = [
  { title: 'Under bite', icon: 'https://i.ibb.co/Y70w2CK3/video.png' },
  { title: 'Open bite', icon: 'https://i.ibb.co/pGJyFZL/video2.png' },
  { title: 'Crooked teeth', icon: 'https://i.ibb.co/RTLKPd3q/video3.png' },
  { title: 'Gap teeth', icon: 'https://i.ibb.co/5gNP6fPv/video4.png' },
  {
    title: 'Deep bite',
    icon: 'https://i.ibb.co/nqzMPZ0m/video5.png',
  },
  {
    title: 'Cross bite',
    icon: 'https://i.ibb.co/3y09DJbX/video6.png',
  },
  {
    title: 'Forwardly placed teeth',
    icon: 'https://i.ibb.co/W4564g62/video7.png',
  },
  {
    title: 'Teeth Spacings',
    icon: 'https://i.ibb.co/nscrGgch/video8.png',
  },
  { title: 'Jaw correction', icon: 'https://i.ibb.co/1YW48x0v/video9.png' },
];

export default function FindBiteTypeScreen({ navigation }: any) {
  const [carousel, setCarousel] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();
        setCarousel(
          res.data.biteTypeCarousel.map((img: any) => ({ uri: img.imageUrl })),
        );
      } catch (error) {
        console.error('Failed to load carousels:', error);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Carousel images={carousel} />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        Discover your bite type and See the transformation
      </Text>

      {/* Grid */}
      <View style={styles.grid}>
        {categories.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() =>
              navigation.navigate('BiteTypeVideosScreen', { title: item.title })
            }
          >
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.label}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },

  label: {
    textAlign: 'center',
    fontSize: 12,
  },
});
