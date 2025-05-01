/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function BeforeAfterTreatment({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Exclusive Therapy Services</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('TreatmentInfoScreen')}
      >
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={styles.image}
        />
        <Text style={styles.cardText}>
          Click here to see why our aligners can do for you
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  card: {
    backgroundColor: '#ffe4e1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: { width: '100%', height: 150, borderRadius: 8 },
  cardText: { marginTop: 8, fontWeight: '500', textAlign: 'center' },
});
