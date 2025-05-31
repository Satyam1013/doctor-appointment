/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const treatmentItems = [
  {
    img: 'https://i.ibb.co/WW0YY1sj/teethgaps.png',
    route: 'teethgaps',
  },
  {
    img: 'https://i.ibb.co/1yPk7J8/crookedteeth.png',
    route: 'crookedteeth',
  },
  {
    img: 'https://i.ibb.co/1tzJZR1n/crossbite.png',
    route: 'crossbite',
  },
  {
    img: 'https://i.ibb.co/fV6zw10L/openbite.png',
    route: 'openbite',
  },
  {
    img: 'https://i.ibb.co/MkcZ04hZ/overbite.png',
    route: 'overbite',
  },
  {
    img: 'https://i.ibb.co/fGPvzr8D/underbite.png',
    route: 'underbite',
  },
];

export default function TeethAlignmentProblems({ navigation }: any) {
  return (
    <View style={styles.bgColor}>
      <Text style={styles.title}>Understanding teeth alignment problems</Text>
      <View style={styles.treatmentGrid}>
        {treatmentItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.treatmentItem}
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'TeethTreatmentScreen',
                params: { routeKey: item.route },
              })
            }
          >
            <Image
              source={{ uri: item.img }}
              style={styles.treatmentImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#E7FAFC',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  treatmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  treatmentItem: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  treatmentImage: {
    width: '100%',
    height: 130,
    aspectRatio: 0.75,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
});
