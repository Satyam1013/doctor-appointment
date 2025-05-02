/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const services = [
  {
    title: 'Book Appointment',
    desc: 'With Top Ayurvedic Doctors',
    image: require('../../assets/images/book.png'),
  },
  {
    title: 'Instant Video Consultation',
    desc: 'Connects within 60 seconds',
    image: require('../../assets/images/book2.png'),
  },
  {
    title: 'Buy Medicines',
    desc: 'Top Ayurvedic Products',
    image: require('../../assets/images/book3.png'),
  },
  {
    title: 'Beauty Products',
    desc: 'Exclusive lifestyle products',
    image: require('../../assets/images/book4.png'),
  },
];

export default function ServiceCards() {
  return (
    <View style={styles.grid}>
      {services.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '80%',
    height: '100%',
    margin: 'auto',
  },
});
