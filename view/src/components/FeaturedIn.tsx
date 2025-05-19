import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FeaturedIn() {
  const images = [
    { uri: 'https://i.ibb.co/5hRkvbWH/news.png' },
    { uri: 'https://i.ibb.co/N6GWXPvV/news2.png' },
    { uri: 'https://i.ibb.co/N2ZHzJfz/news3.png' },
    { uri: 'https://i.ibb.co/nqVjH0hq/news4.png' },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.fullWidthBg}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {images.map((img, idx) => (
            <View key={idx} style={styles.card}>
              <Image source={img} style={styles.image} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
  },
  fullWidthBg: {
    width: screenWidth,
    backgroundColor: '#00A29B',
    paddingVertical: 12,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // ensures zoomed image is clipped inside rounded corners
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 30,
    transform: [{ scale: 2 }],
  },
});
