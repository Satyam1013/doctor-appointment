/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const doctors = [
  { img: require('../../assets/images/doctor.png') },
  { img: require('../../assets/images/doctor2.png') },
  { img: require('../../assets/images/doctor3.png') },
  { img: require('../../assets/images/doctor4.png') },
  { img: require('../../assets/images/doctor5.png') },
  { img: require('../../assets/images/doctor6.png') },
];

export default function TopProducts({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Doctors</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorDetailsScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {doctors.map((doc, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() =>
              navigation.navigate('DoctorDetailsScreen', { doctor: doc })
            }
          >
            <Image source={doc.img} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: '#fff0f0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  viewAll: { color: '#1e90ff' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    aspectRatio: 0.8,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
