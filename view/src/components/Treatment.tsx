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
  Linking,
} from 'react-native';

export default function BeforeAfterTreatment() {
  const handleOpenLink = () => {
    Linking.openURL(
      'https://smile-view.invisalign.in/?campaign_name=SmileView-Consumer_IN_India-Consumer',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Exclusive Therapy Services</Text>

      <TouchableOpacity style={styles.card} onPress={handleOpenLink}>
        <Image
          source={require('../../assets/images/ad.png')}
          style={styles.image}
        />
        <Text style={styles.cardText}>
          Click here to see what our aligners can do for you
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
