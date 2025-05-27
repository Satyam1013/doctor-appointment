/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const doctors = [
  { img: 'https://i.ibb.co/LdTLjzdt/doctor5.png' }, // index 0
  { img: 'https://i.ibb.co/JWKKQk7M/doctor2.png' }, // index 1
  { img: 'https://i.ibb.co/fVtnwVYy/doctor3.png' }, // index 2
  { img: 'https://i.ibb.co/dw5WMwj3/doctor6.png' }, // index 3
  { img: 'https://i.ibb.co/nqRzR2Qq/doctor4.png' }, // index 4
  { img: 'https://i.ibb.co/LzcYw7rR/doctor.png' }, // index 5
];

export default function TopProducts({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {doctors.map((doc, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => {
              if (idx === 4 || idx === 5) {
                navigation.navigate('ProductsTab');
              } else if (idx === 1) {
                navigation.navigate('AlignersForTeensScreen');
              } else if (idx === 0) {
                navigation.navigate('Mydent');
              } else {
                navigation.navigate('DoctorDetailsScreen', { doctor: doc });
              }
            }}
          >
            <Image
              source={{ uri: doc.img }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: '#fff0f0' },
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
