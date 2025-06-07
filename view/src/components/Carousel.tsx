import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
  Dimensions,
  View,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CarouselProps {
  images: ImageSourcePropType[];
}

const { width: screenWidth } = Dimensions.get('window');

export default function Carousel({ images }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<any>>(); // Or define your stack type

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

  const handlePress = () => {
    navigation.navigate('ConsultationOption');
  };

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
        {images.map((img, idx) => (
          <Pressable key={idx} onPress={handlePress}>
            <Image source={img} style={styles.image} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    marginBottom: 16,
    zIndex: 1,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: 200,
    resizeMode: 'cover',
  },
});
