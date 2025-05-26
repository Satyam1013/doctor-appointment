/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
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
    title: 'Buy Medicines',
    image: 'https://i.ibb.co/yBRPkhPz/book4.png',
  },
  {
    title: 'Beauty Products',
    image: 'https://i.ibb.co/TMcrzV5w/book3.png',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export default function ServiceCards({ navigation }: any) {
  const handlePress = (title: string) => {
    if (
      title === 'Book Appointment' ||
      title === 'Instant Video Consultation'
    ) {
      navigation.navigate('ConsultationOption');
    } else {
      navigation.navigate('ProductsTab', { title });
    }
  };

  return (
    <View style={styles.grid}>
      {services.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => handlePress(item.title)}
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
    height: CARD_WIDTH,
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
