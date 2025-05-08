/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const categories = [
  { title: 'Under bite', img: require('../../assets/images/video.png') },
  { title: 'Open bite', img: require('../../assets/images/video2.png') },
  { title: 'Crooked teeth', img: require('../../assets/images/video3.png') },
  { title: 'Gap teeth', img: require('../../assets/images/video4.png') },
  { title: 'Deep bite', img: require('../../assets/images/video5.png') },
  { title: 'Cross bite', img: require('../../assets/images/video6.png') },
  {
    title: 'Forwardly placed teeth',
    img: require('../../assets/images/video7.png'),
  },
];

export default function FindTeethType({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find your bite type</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindTeethTypeScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('FindTeethTypeScreen')}
          >
            <Image source={item.img} style={styles.image} />
            <Text style={styles.itemText}>{item.title}</Text>
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
  item: { alignItems: 'center', marginRight: 16 },
  image: { width: 50, height: 50, borderRadius: 25, marginBottom: 4 },
  itemText: { marginTop: 4, fontSize: 12 },
});
