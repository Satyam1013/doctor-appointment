import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

interface CarouselProps {
  images: ImageSourcePropType[];
}

const { width: screenWidth } = Dimensions.get('window');

const imageWidth = screenWidth;
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
  container: { height: 150, marginBottom: 16, zIndex: 1 },
  image: {
    width: imageWidth,
    height: 150,
  },
});
