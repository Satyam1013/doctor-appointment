/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure this is installed

export default function OverlayFloatingButtons() {
  const navigation = useNavigation();

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/+919999999999');
  };

  const handleBookPress = () => {
    navigation.navigate('ConsultationOption' as never);
  };

  const handleConsultPress = () => {
    navigation.navigate('ConsultationOption' as never);
  };

  return (
    <View style={styles.container}>
      {/* Left: Book a Scan */}
      <TouchableOpacity style={styles.bookAScan} onPress={handleBookPress}>
        <MaterialIcons name="book-online" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Center: Consult Doctor */}
      <TouchableOpacity
        style={styles.consultButton}
        onPress={handleConsultPress}
      >
        <MaterialIcons name="local-hospital" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Right: WhatsApp */}
      <TouchableOpacity onPress={handleWhatsAppPress}>
        <Image
          source={require('../../assets/images/wa.png')}
          style={styles.whatsappIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    pointerEvents: 'box-none',
  },
  bookAScan: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  consultButton: {
    backgroundColor: '#0077b6',
    padding: 12,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  whatsappIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
