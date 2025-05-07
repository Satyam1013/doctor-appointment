/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
// components/ClinicVisitCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Props {
  onPress: () => void;
}

export default function ClinicVisitCard({ onPress }: Props) {
  return (
    <>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/hospital.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Want to Visit Clinic?</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 32, height: 32, marginRight: 8 },
  text: { fontSize: 16, fontWeight: '600', color: '#0097a7' },
  arrow: { fontSize: 24, color: '#0097a7' },
});
