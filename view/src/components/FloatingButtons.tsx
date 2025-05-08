/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FloatingButtons() {
  const navigation = useNavigation();

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/+919999999999');
  };

  const handleBookPress = () => {
    navigation.navigate('ConsultationOption' as never);
  };

  return (
    <>
      {/* WhatsApp Button - Bottom Right (icon only) */}
      <View style={styles.whatsappContainer}>
        <TouchableOpacity onPress={handleWhatsAppPress}>
          <Image
            source={require('../../assets/images/wa.png')}
            style={styles.whatsappIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Book a Scan Button - Bottom Left (pill red) */}
      <View style={styles.bookContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookText}>Book a Scan</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  whatsappContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  bookContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
  },
  whatsappIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bookButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
