/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRoute } from '@react-navigation/native';
import { getBiteType } from '../api/bite-type';
import { ResizeMode, Video } from 'expo-av';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { getCarousels } from '../api/carousel-api';
import Carousel from '../components/Carousel';
import { CarouselItem } from './Home';

export default function BiteTypeVideosScreen() {
  const route = useRoute();
  const { title } = route.params as { title: string };

  const [carousel, setCarousel] = useState<CarouselItem[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(Video | null)[]>([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();
        setCarousel(
          res.data.home.biteTypeCarousel.map((img: any) => ({
            uri: img.imageUrl,
            type: img.type,
            group: 'biteType',
            navigateTo: img.screenName || 'DefaultScreen',
          })),
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

  const handlePlayPause = async (index: number) => {
    const currentRef = videoRefs.current[index];
    if (!currentRef) return;

    const status = await currentRef.getStatusAsync();

    if ('isLoaded' in status && status.isLoaded) {
      if (status.isPlaying) {
        await currentRef.pauseAsync();
        setPlayingIndex(null);
      } else {
        // Pause others
        await Promise.all(
          videoRefs.current.map(async (ref, i) => {
            if (ref && i !== index) {
              const s = await ref.getStatusAsync();
              if ('isLoaded' in s && s.isLoaded && s.isPlaying) {
                await ref.pauseAsync();
              }
            }
          }),
        );

        await currentRef.playAsync();
        setPlayingIndex(index);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Carousel images={carousel} />

      <Text style={styles.heading}>Videos for: {title}</Text>

      {videos.length > 0 ? (
        videos.map((videoUrl, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPress={() => handlePlayPause(idx)}
          >
            <Video
              ref={(ref) => (videoRefs.current[idx] = ref)}
              source={{ uri: videoUrl }}
              style={styles.videoFull}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              isLooping
            />
          </TouchableWithoutFeedback>
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
    paddingVertical: 100,
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
