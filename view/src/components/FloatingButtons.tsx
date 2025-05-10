/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OverlayFloatingButtons() {
  const [buttonWidth, setButtonWidth] = useState(0);

  const navigation = useNavigation();

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/+919999999999');
  };

  const handleBookPress = () => {
    navigation.navigate('ConsultationOption');
  };

  const handleConsultPress = () => {
    navigation.navigate('ConsultationOption');
  };

  return (
    <View style={styles.container}>
      {/* Left: Book a Scan */}
      <TouchableOpacity style={styles.bookAScan} onPress={handleBookPress}>
        <MaterialIcons name="book-online" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Center: Consult Doctor */}
      <TouchableOpacity
        style={[styles.consultButton, { left: width / 2 - buttonWidth / 2 }]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidth(width);
        }}
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
    pointerEvents: 'box-none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bookAScan: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  consultButton: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#0077b6',
    padding: 4,
    borderRadius: 30,
    zIndex: 50,
    elevation: 10,
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
