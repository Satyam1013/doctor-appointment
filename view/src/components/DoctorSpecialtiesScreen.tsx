/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const categories = [
  { title: 'Ayurvedic', img: require('../../assets/images/video.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video2.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video3.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video4.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video5.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video6.png') },
  { title: 'Ayurvedic', img: require('../../assets/images/video7.png') },
];

export default function DoctorSpecialties({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Ayurvedic Doctor By Specialties</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindDoctorScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('FindDoctorScreen')}
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
