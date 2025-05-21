import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
  Dimensions,
  View,
} from 'react-native';

interface CarouselProps {
  images: ImageSourcePropType[];
}

const { width: screenWidth } = Dimensions.get('window');

export default function Carousel({ images }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        scrollEnabled={true}
      >
        <Image
          source={{
            uri: 'https://doctor-appointment-5j6e.onrender.com/uploads/carousel/1747813657177-415987041.png',
          }}
          style={{ width: screenWidth, height: 200, resizeMode: 'cover' }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    marginBottom: 16,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: 180,
    resizeMode: 'cover',
  },
});
