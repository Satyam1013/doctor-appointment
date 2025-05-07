import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';

interface CarouselProps {
  images: ImageSourcePropType[];
}

export default function Carousel({ images }: CarouselProps) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {images.map((img, idx) => (
        <Image key={idx} source={img} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: 150, marginBottom: 12 },
  image: { width: 350, height: 150, borderRadius: 10, marginHorizontal: 6 },
});
