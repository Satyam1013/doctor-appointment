/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Video from 'react-native-video';

const sections = [
  {
    title: 'teeth gap treatment: how to fix your diastema?',
    image: require('../../assets/images/video7.png'),
    video: null,
    content:
      'teeth gap or Diastema refers to a gap between your teeth. Though the gap can be in between any of your two teeth, it is commonly observed in between the two front teeth. The size of the gap varies from person to person. The larger the gap, the more severe your dental case.',
  },
  {
    title: 'teeth gap symptoms',
    video: require('../../public/videos/v6.mp4'),
    content:
      '• pain - if the gap in between your teeth is caused by underlying gum disease, then you may experience pain every time you bite or chew your food.\n\n• redness - gums turning bright red or purplish is common with gum disease.\n\n• swelling or tenderness - swollen or bleeding gums and loose teeth are other signs.',
  },
  {
    title: 'why do you need to correct your teeth gap?',
    image: require('../../assets/images/blog5.png'),
    content:
      'Teeth gaps don’t just affect self-esteem, but can lead to dental complications like bone loss, gum disease, and difficulty chewing. Early treatment helps avoid these issues.',
  },
  {
    title: 'teeth gap causes',
    video: require('../../public/videos/v2.mp4'),
    content:
      '• advanced gum disease - can damage tissues and bones.\n\n• poor habits - like thumb-sucking or lip biting in childhood can lead to gaps.',
  },
  {
    title: 'how To treat teeth gap?',
    image: require('../../assets/images/videoposter.png'),
    video: null,
    content:
      'For children, gaps might close naturally. For adults, options include braces, clear aligners, and cosmetic procedures like bonding or veneers.',
  },
];

export default function TeethTreatmentScreen() {
  return (
    <ScrollView style={styles.container}>
      {sections.map((sec, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.heading}>{sec.title}</Text>

          {sec.image && (
            <Image source={sec.image} style={styles.image} resizeMode="cover" />
          )}

          {sec.video && (
            <Video
              source={sec.video}
              style={styles.video}
              resizeMode="cover"
              controls
              paused
            />
          )}

          <Text style={styles.content}>{sec.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f5f7fa',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#000',
  },
  content: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});
