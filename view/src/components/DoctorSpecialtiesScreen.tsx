/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const specialities = [
  { title: 'Diabetes', icon: 'needle' },
  { title: 'Gynae', icon: 'human-female' },
  { title: 'Sexual', icon: 'heart' },
  { title: 'Digestive', icon: 'food' },
  { title: 'Skin', icon: 'face' },
];

export default function DoctorSpecialties({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Ayurvedic Doctor By Specialties</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorSpecialtiesScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {specialities.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            onPress={() => navigation.navigate('DoctorSpecialtiesScreen')}
          >
            <Icon name={item.icon} size={32} color="#1e90ff" />
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
  itemText: { marginTop: 4, fontSize: 12 },
});
