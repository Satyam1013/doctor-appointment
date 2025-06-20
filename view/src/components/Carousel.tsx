// Carousel.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CarouselProps {
  images: {
    uri: string;
    type: string;
    group: string;
    navigateTo: string;
  }[];
}

const { width: screenWidth } = Dimensions.get('window');
const horizontalMargin = 10;
const imageWidth = screenWidth - horizontalMargin * 2;

export default function Carousel({ images }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handlePress = (screen: string) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        scrollEnabled
      >
        {images.map((img, idx) => (
          <View key={idx} style={styles.imageWrapper}>
            <Pressable onPress={() => handlePress(img.navigateTo)}>
              <Image source={{ uri: img.uri }} style={styles.image} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: imageWidth,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
});
