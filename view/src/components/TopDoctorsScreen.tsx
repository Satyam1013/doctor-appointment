/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const doctors = [
  { name: 'Dr. Rajesh Singh', img: require('../../assets/images/logo.jpeg') },
  { name: 'Dr. Shailendra', img: require('../../assets/images/logo.jpeg') },
  {
    name: 'Dr. Rakesh Sharma',
    img: require('../../assets/images/logo.jpeg'),
  },
];

export default function TopDoctors({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Doctors</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TopDoctorsScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {doctors.map((doc, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => navigation.navigate('TopDoctorsScreen')}
          >
            <Image source={doc.img} style={styles.image} />
            <Text style={styles.name}>{doc.name}</Text>
            <Text style={styles.desc}>Diabetes, General Medicine</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    elevation: 2,
  },
  image: { width: '100%', height: 80, borderRadius: 8 },
  name: { marginTop: 6, fontWeight: '600', textAlign: 'center' },
  desc: { fontSize: 12, textAlign: 'center', color: '#777' },
});
