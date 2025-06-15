import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function BeforeAfterTreatment() {
  const navigation = useNavigation<NavigationProp<any>>();

  // const handleOpenLink = () => {
  //   Linking.openURL(
  //     'https://smile-view.invisalign.in/?campaign_name=SmileView-Consumer_IN_India-Consumer',
  //   );
  // };
  const handlePress = () => {
    navigation.navigate('SmilePreview');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Exclusive Therapy Services</Text>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image
          source={{ uri: 'https://i.ibb.co/JWgXbwRD/ad.png' }}
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
