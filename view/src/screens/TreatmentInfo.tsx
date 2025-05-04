/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function TreatmentInfoScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={styles.image}
      />
      <Text style={styles.title}>Why is treatment important?</Text>
      <Text style={styles.text}>
        - Straightens teeth for better oral health{'\n'}- Improves smile
        aesthetics{'\n'}- Reduces jaw pain & misalignment{'\n'}- Boosts
        confidence and social life
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 16, lineHeight: 24 },
});
