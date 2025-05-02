/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const categories = [
  { name: 'Ayurvedic', img: require('../../assets/images/cat.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat2.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat3.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat4.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat5.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat6.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat7.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat8.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat9.png') },
  { name: 'Ayurvedic', img: require('../../assets/images/cat10.png') },
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('MedicinesScreen')}
          >
            <Image source={cat.img} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    marginRight: 12, // space between items
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginBottom: 4,
  },
});
