/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';

const services = [
  {
    title: 'Book Appointment',
    image: 'https://i.ibb.co/8gtxBxF5/book.png',
  },
  {
    title: 'Instant Video Consultation',
    image: 'https://i.ibb.co/xqKvY2zV/book2.png',
  },
  {
    title: 'Buy Products',
    image: 'https://i.ibb.co/yBRPkhPz/book4.png',
  },
  {
    title: 'Mydent AI',
    image:
      'https://i.ibb.co/Ld8mNMmX/Whats-App-Image-2025-05-24-at-5-47-21-PM.jpg',
    url: 'https://smile-view.invisalign.in/?campaign_name=SmileView-Consumer_IN_India-Consumer',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export default function ServiceCards({ navigation }: any) {
  const handlePress = (item: any) => {
    if (item.url) {
      Linking.openURL(item.url).catch((err) =>
        console.error('Failed to open URL:', err),
      );
    } else if (
      item.title === 'Book Appointment' ||
      item.title === 'Instant Video Consultation'
    ) {
      navigation.navigate('ConsultationOption');
    } else {
      navigation.navigate('ProductsTab', { title: item.title });
    }
  };

  return (
    <View style={styles.grid}>
      {services.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => handlePress(item)}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginTop: 6,
  },
  card: {
    width: CARD_WIDTH * 0.8,
    height: CARD_WIDTH * 1.1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
