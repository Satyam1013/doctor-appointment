/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRoute } from '@react-navigation/native';
import { getBiteType } from '../api/bite-type';
import { ResizeMode, Video } from 'expo-av';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getCarousels } from '../api/carousel-api';
import Carousel from '../components/Carousel';

export default function BiteTypeVideosScreen() {
  const route = useRoute();
  const { title } = route.params as { title: string };

  const [carousel, setCarousel] = useState<{ uri: string }[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

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

    const fetchVideos = async () => {
      try {
        const res = await getBiteType();
        const bite = res.data.find((item: any) => item.title === title);
        if (bite) setVideos(bite.videos);
      } catch (err) {
        console.error('Failed to load bite type videos:', err);
      }
    };

    fetchCarousels();
    fetchVideos();
  }, [title]);

  return (
    <ScrollView style={styles.container}>
      <Carousel images={carousel} />

      <Text style={styles.heading}>Videos for: {title}</Text>

      {videos.length > 0 ? (
        videos.map((videoUrl, idx) => (
          <Video
            key={idx}
            source={{ uri: videoUrl }}
            style={styles.videoFull}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            isMuted
            shouldPlay
          />
        ))
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>No Videos available to play</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 110,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100, // optional, if you want vertical spacing
  },
  error: {
    fontSize: 18,
    color: '#FF0000',
    fontWeight: '600',
  },
  videoFull: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#000',
    marginTop: 12,
  },
});
