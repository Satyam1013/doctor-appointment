/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const categories: { img: string }[] = [
  { img: 'https://i.ibb.co/6Rffw5Gk/ahmedabad.png' },
  { img: 'https://i.ibb.co/99y75Czg/bengaluru.png' },
  { img: 'https://i.ibb.co/C56PSmTL/chennai.png' },
  { img: 'https://i.ibb.co/KPGK73W/delhi.png' },
  { img: 'https://i.ibb.co/xSJ9yv6B/hyderabad.png' },
  { img: 'https://i.ibb.co/v67zsBhn/jaipur.png' },
  {
    img: 'https://i.ibb.co/20cZw49R/kolkata.png',
  },
  { img: 'https://i.ibb.co/kVKdC9YY/lucknow.png' },
  {
    img: 'https://i.ibb.co/QjDqSmpt/mumbai.png',
  },
  { img: 'https://i.ibb.co/KjzGy6rX/pune.png' },
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
    img: 'https://i.ibb.co/WW0YY1sj/teethgaps.png',
    route: 'teethgaps',
  },
  {
    img: 'https://i.ibb.co/MkcZ04hZ/overbite.png',
    route: 'overbite',
  },
  {
    img: 'https://i.ibb.co/1tzJZR1n/crossbite.png',
    route: 'crossbite',
  },
  {
    img: 'https://i.ibb.co/fGPvzr8D/underbite.png',
    route: 'underbite',
  },
  {
    img: 'https://i.ibb.co/fV6zw10L/openbite.png',
    route: 'openbite',
  },
  {
    img: 'https://i.ibb.co/1yPk7J8/crookedteeth.png',
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
            <Image source={{ uri: cat.img }} style={styles.image} />
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
                source={{ uri: item.img }}
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
