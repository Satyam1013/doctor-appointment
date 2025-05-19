/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OverlayFloatingButtons() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [buttonWidth, setButtonWidth] = useState(0);

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
      <TouchableOpacity style={styles.imageWrapper} onPress={handleBookPress}>
        <Image
          source={{
            uri: 'https://i.ibb.co/xKbs3w6D/book.jpg',
          }}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Center: Consult Doctor (reusing same Book image here) */}
      <TouchableOpacity
        style={[styles.centerWrapper, { left: width / 2 - buttonWidth / 2 }]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setButtonWidth(width);
        }}
        onPress={handleConsultPress}
      >
        <Image
          source={{
            uri: 'https://i.ibb.co/zhYjTxWq/consult.jpg',
          }}
          style={styles.centerIconImage}
        />
      </TouchableOpacity>

      {/* Right: WhatsApp */}
      <TouchableOpacity onPress={handleWhatsAppPress}>
        <Image
          source={{
            uri: 'https://i.ibb.co/DfpFd5JW/wa.jpg',
          }}
          style={styles.whatsappIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 65,
    left: 0,
    right: 0,
    zIndex: 20,
    pointerEvents: 'box-none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginLeft: -4,
  },
  iconImage: {
    width: 80,
    height: 25,
    resizeMode: 'contain',
  },
  centerWrapper: {
    position: 'absolute',
    bottom: -22,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 30,
    zIndex: 50,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  centerIconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  whatsappIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
  },
});
