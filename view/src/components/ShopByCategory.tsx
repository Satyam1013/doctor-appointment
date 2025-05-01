/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const categories = [
  { name: 'Ayurvedic', img: require('../../assets/images/logo.jpeg') },
  {
    name: 'Personal Care',
    img: require('../../assets/images/logo.jpeg'),
  },
  { name: 'Homeopathy', img: require('../../assets/images/logo.jpeg') },
  { name: 'Immunity', img: require('../../assets/images/logo.jpeg') },
];

export default function ShopByCategory({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop By Category</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicinesScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('MedicinesScreen')}
          >
            <Image source={cat.img} style={styles.image} />
            <Text style={styles.name}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  viewAll: { color: '#1e90ff' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: { alignItems: 'center', width: '23%' },
  image: { width: 50, height: 50, borderRadius: 25, marginBottom: 4 },
  name: { fontSize: 12, textAlign: 'center' },
});
