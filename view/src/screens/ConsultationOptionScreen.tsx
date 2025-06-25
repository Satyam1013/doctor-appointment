/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ConsultationOptionScreen({ navigation }: any) {
  const handleContinue = () => {
    navigation.navigate('AgeSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please select</Text>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://i.ibb.co/ymT3s03K/Whats-App-Image-2025-06-13-at-1-49-35-AM.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Talk to Our Expert Doctor First</Text>
        <Text style={styles.desc}>
          Before beginning your scan or 3D impression, you'll have a video
          consultation with our doctor. During this session, the doctor will
          assess your case and provide personalized guidance on the best
          treatment plan for your smile transformation.
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>₹ 199</Text>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F8FC', padding: 16 },
  header: { fontSize: 16, color: '#D43F3F', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  desc: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 18, color: '#D43F3F', fontWeight: 'bold' },
  button: {
    backgroundColor: '#D43F3F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
