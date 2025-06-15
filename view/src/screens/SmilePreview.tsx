/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SmilePreview() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelfie = async () => {
    if (!ageConfirmed) {
      Alert.alert(
        'Age Confirmation Required',
        'You must confirm you are 18 or older.',
      );
      return;
    }

    Alert.alert(
      'Select Option',
      'Choose image source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.ibb.co/ZRHLLpxQ/logo.jpg' }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}>
          Let’s get started with your new smile
        </Text>
        <Text style={styles.subheading}>
          Take a smiling selfie and we’ll show you how your smile can be
          transformed.
        </Text>

        <View style={styles.tips}>
          <Text style={styles.tip}>✔️ Ensure sufficient light</Text>
          <Text style={styles.tip}>✔️ Remove glasses or hat</Text>
          <Text style={styles.tip}>✔️ Keep your head straight</Text>
          <Text style={styles.tip}>✔️ Look at camera and smile brightly</Text>
        </View>

        <View style={styles.switchRow}>
          <Switch value={ageConfirmed} onValueChange={setAgeConfirmed} />
          <Text style={styles.switchText}>
            I confirm that I am 18 years or older
          </Text>
        </View>

        <View style={styles.switchRow}>
          <Switch
            value={marketingConsent}
            onValueChange={setMarketingConsent}
          />
          <Text style={styles.switchText}>
            I agree to receive information about MyDent products and offers
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: ageConfirmed ? '#2563eb' : '#9ca3af' },
          ]}
          onPress={handleSelfie}
          disabled={!ageConfirmed}
        >
          <Text style={styles.buttonText}>Take a Selfie</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Your photo will only be used to simulate your smile preview and
          improve your experience.
        </Text>

        {/* Uploaded Selfie Preview */}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}

        {/* Scrollable Mydent Slider */}
        <Text style={[styles.heading, { marginTop: 24, marginBottom: 8 }]}>
          Can you tell who has Mydent on?
        </Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <Image
            source={{
              uri: 'https://i.ibb.co/DgwFvtKw/Screenshot-2025-06-15-183523.png',
            }}
            style={styles.sliderImage}
            resizeMode="contain"
          />
          <Image
            source={{
              uri: 'https://i.ibb.co/67cj1tb2/Screenshot-2025-06-15-183538.png',
            }}
            style={styles.sliderImage}
            resizeMode="contain"
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#111827',
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    elevation: 5,
  },
  logo: {
    height: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  subheading: {
    textAlign: 'center',
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
  },
  tips: {
    marginTop: 16,
  },
  tip: {
    fontSize: 14,
    marginBottom: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  switchText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    marginTop: 16,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
  sliderImage: {
    width: SCREEN_WIDTH - 70, // subtract padding/margin if any
    height: SCREEN_WIDTH - 40, // or a fixed height
    borderRadius: 10,
  },
});
