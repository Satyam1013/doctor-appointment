/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const doctors = [
  {
    id: '1',
    image: require('../../assets/images/doc.png'),
    name: 'Dr. Smita Shah',
  },
  {
    id: '2',
    image: require('../../assets/images/doc.png'),
    name: 'Dr. Ramesh Kumar',
  },
];

export default function DoctorCard() {
  const renderItem = ({
    item,
  }: {
    item: { id: string; image: any; name: string };
  }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our Experts</Text>
      <Text style={styles.sectionSubtitle}>
        Meet the chief experts behind your care and safety
      </Text>

      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  scrollContainer: {
    paddingVertical: 4,
  },
  card: {
    width: 200,
    height: 200,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
  },
  name: {
    padding: 8,
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
});
