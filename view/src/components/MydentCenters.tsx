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

export default function MydentCenters({ navigation }: any) {
  const [centers, setCenters] = useState<
    { cityName: string; imageUrl: string; _id: string }[]
  >([]);
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
                  selectedCity: center.cityName,
                })
              }
            >
              <Image
                source={{ uri: center.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={{ marginTop: 4 }}>{center.cityName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
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
  viewAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});
