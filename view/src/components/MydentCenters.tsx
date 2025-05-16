/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  { img: require('../../assets/images/ahmedabad.png') },
  { img: require('../../assets/images/bengaluru.png') },
  { img: require('../../assets/images/chennai.png') },
  { img: require('../../assets/images/delhi.png') },
  { img: require('../../assets/images/hyderabad.png') },
  { img: require('../../assets/images/jaipur.png') },
  { img: require('../../assets/images/kolkata.png') },
  { img: require('../../assets/images/lucknow.png') },
  { img: require('../../assets/images/mumbai.png') },
  { img: require('../../assets/images/pune.png') },
];

const cityNames = [
  'Ahmedabad',
  'Bengaluru',
  'Chennai',
  'Delhi',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Lucknow',
  'Mumbai',
  'Pune',
];

const treatmentItems = [
  {
    img: require('../../assets/images/teethgaps.png'),
    route: 'teethgaps',
  },
  {
    img: require('../../assets/images/overbite.png'),
    route: 'overbite',
  },
  {
    img: require('../../assets/images/crossbite.png'),
    route: 'crossbite',
  },
  {
    img: require('../../assets/images/underbite.png'),
    route: 'underbite',
  },
  {
    img: require('../../assets/images/openbite.png'),
    route: 'openbite',
  },
  {
    img: require('../../assets/images/crookedteeth.png'),
    route: 'crookedteeth',
  },
];

export default function MydentCenters({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mydent Centers</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CentersTab')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
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
            onPress={() =>
              navigation.navigate('CentersTab', {
                selectedCity: cityNames[idx],
              })
            }
          >
            <Image source={cat.img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bgColor}>
        <Text style={styles.title}>Understanding teeth alignment problems</Text>
        <View style={styles.treatmentGrid}>
          {treatmentItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.treatmentItem}
              onPress={() =>
                navigation.navigate('TeethTreatmentScreen', {
                  routeKey: item.route,
                })
              }
            >
              <Image
                source={item.img}
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
    backgroundColor: '#E7FAFC',
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
  viewAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});
