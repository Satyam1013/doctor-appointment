/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getCenters } from '../api/centers-api';

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
  const [centers, setCenters] = useState<
    { name: string; imageUrl: string; _id: string }[]
  >([]);
  console.log('✨ ~ centers:', centers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCenters()
      .then((res) => {
        setCenters(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch centers:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mydent Centers</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CentersTab')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {centers.map((center) => (
            <TouchableOpacity
              key={center._id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('CentersTab', {
                  selectedCity: center.name,
                })
              }
            >
              <Image
                source={{ uri: center.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={{ marginTop: 4 }}>{center.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Rest of your treatmentItems section stays same */}
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
