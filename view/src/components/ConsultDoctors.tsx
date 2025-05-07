/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  Dimensions,
} from 'react-native';

const doctors = [
  { id: '1', image: require('../../assets/images/doc.png') },
  { id: '2', image: require('../../assets/images/doc.png') },
];

export default function DoctorCard({ navigation }: any) {
  const handleWhatsAppPress = (phoneNumber: string) => {
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  const handleBookPress = () => {
    navigation.navigate('ConsultationOption');
  };

  const renderItem = ({ item }: { item: { id: string; image: any } }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.buttonText} numberOfLines={1}>
            Book a Scan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={() => handleWhatsAppPress('+919999999999')}
        >
          <Image
            source={require('../../assets/images/wa.png')}
            style={styles.whatsappIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: Dimensions.get('window').width * 0.68,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  bookButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 24,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  whatsappIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
