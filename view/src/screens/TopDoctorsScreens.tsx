/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DoctorDetailsScreen({ route }: any) {
  const { doctor } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={doctor.img} style={styles.image} resizeMode="cover" />

      <View style={styles.details}>
        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.about}>
          Dr. {doctor.name} is a highly experienced practitioner specializing in{' '}
          {doctor.specialization}. With {doctor.exp} of expertise and a patient
          satisfaction rating of {doctor.rating}, the doctor has helped
          thousands of patients with effective Ayurvedic treatments and holistic
          care. Book an appointment to consult with the expert today.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 400 },
  details: { padding: 16 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  about: { fontSize: 15, lineHeight: 22, color: '#333' },
});
