/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const categories = [
  { img: require('../../assets/images/cat.png') },
  { img: require('../../assets/images/cat2.png') },
  { img: require('../../assets/images/cat3.png') },
  { img: require('../../assets/images/cat4.png') },
  { img: require('../../assets/images/cat5.png') },
  { img: require('../../assets/images/cat6.png') },
  { img: require('../../assets/images/cat7.png') },
  { img: require('../../assets/images/cat8.png') },
  { img: require('../../assets/images/cat9.png') },
  { img: require('../../assets/images/cat10.png') },
];

const treatmentItems = [
  require('../../assets/images/videoposter.png'),
  require('../../assets/images/videoposter2.png'),
  require('../../assets/images/videoposter3.png'),
  require('../../assets/images/videoposter4.png'),
  require('../../assets/images/videoposter5.png'),
  require('../../assets/images/videoposter6.png'),
];

export default function MydentCenters({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mydent Centers</Text>
      </View>

      {/* Horizontal Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('TeethTreatmentScreen')}
          >
            <Image source={cat.img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Video Section Header */}
      <View style={styles.bgColor}>
        <View style={styles.videoSection}>
          <Text style={styles.title}>
            Understanding teeth alignment problems
          </Text>
        </View>

        {/* Video Grid */}
        <View style={styles.treatmentGrid}>
          {treatmentItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.treatmentItem}
              onPress={() =>
                navigation.navigate('TeethTreatmentScreen', {
                  videoUri: `/public/videos/v${idx + 1}.mp4`,
                })
              }
            >
              <Image
                source={item}
                style={styles.treatmentImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
  },
  bgColor: {
    backgroundColor: '#CEEDD9',
    marginHorizontal: -12,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAll: {
    color: '#1e90ff',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  item: {
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
  },
  videoSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  posterImage: {
    width: '100%',
    height: '100%',
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
  treatmentLabel: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
  },
});
