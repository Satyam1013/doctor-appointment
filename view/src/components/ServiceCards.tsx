/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const services = [
  {
    title: 'Book Appointment',
    desc: 'With Top Ayurvedic Doctors',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    title: 'Instant Video Consultation',
    desc: 'Connects within 60 seconds',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    title: 'Buy Medicines',
    desc: 'Top Ayurvedic Products',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    title: 'Beauty Products',
    desc: 'Exclusive lifestyle products',
    image: require('../../assets/images/logo.jpeg'),
  },
];

export default function ServiceCards() {
  return (
    <View style={styles.grid}>
      {services.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
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
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 40, height: 40, alignSelf: 'center', marginBottom: 6 },
  title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  desc: { fontSize: 12, textAlign: 'center', color: '#777' },
});
