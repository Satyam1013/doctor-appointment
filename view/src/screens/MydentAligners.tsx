/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';

const videoSources = [
  require('../../assets/videos/mydentproducts1.mp4'),
  require('../../assets/videos/mydentproducts2.mp4'),
  require('../../assets/videos/mydentproducts3.mp4'),
  require('../../assets/videos/mydentproducts4.mp4'),
];

const MyDentAlignersScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Discover Clear Aligners by mydent</Text>
        <Text style={styles.subtitle}>
          Achieve Your Dream Smile with mydent Clear Aligners
        </Text>
        <Image
          source={require('../../assets/images/mydentposter1.png')}
          style={styles.image}
        />
        <Text style={styles.text}>
          mydent's transparent aligners are designed to gently shift your teeth
          into place over time. These removable, custom-fit trays are a modern
          alternative to traditional braces—discreet, comfortable, and
          effective.
        </Text>
      </View>

      {/* How it Works */}
      <View style={styles.section}>
        <Text style={styles.title}>How Do mydent Aligners Work?</Text>
        <Text style={styles.text}>• Wear time: 16–18 hours per day</Text>
        <Text style={styles.text}>
          • Tray change: Every 2 weeks (based on your orthodontist's plan)
        </Text>
        <Text style={styles.text}>
          • Monitoring: Regular virtual or in-person check-ins
        </Text>
      </View>

      {/* Problems We Address */}
      <View style={styles.section}>
        <Image
          source={require('../../assets/images/mydentposter2.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Dental Problems We Can Address</Text>
        <Text style={styles.text}>
          Spacing, crowding, overbite, underbite, and more
        </Text>
      </View>

      {/* Braces vs mydent Aligners */}
      <View style={styles.section}>
        <Text style={styles.title}>Braces vs mydent Aligners</Text>
        <Text style={styles.text}>
          Removable: ✅ | Invisible: ✅ | Food Restrictions: ❌
        </Text>
        <Text style={styles.text}>
          Easy Oral Hygiene: ✅ | Comfort: ✅ | Faster Results: ✅ (6–8 months)
        </Text>
      </View>

      {/* Why Choose mydent */}
      <View style={styles.section}>
        <Text style={styles.title}>Why Choose mydent?</Text>
        <Text style={styles.text}>• Certified Quality & FDA approved</Text>
        <Text style={styles.text}>
          • In-house manufacturing & 100+ orthodontists
        </Text>
        <Text style={styles.text}>• App-based monitoring & home visits</Text>
      </View>

      {/* Technology */}
      <View style={styles.section}>
        <Image
          source={require('../../assets/images/mydentposter3.png')}
          style={styles.image}
        />
        <Text style={styles.title}>The Technology Behind mydent Aligners</Text>
        <Text style={styles.text}>• Precision 3D Printing</Text>
        <Text style={styles.text}>• Punching & Thermoforming</Text>
        <Text style={styles.text}>• Robotic Automation</Text>
        <Text style={styles.text}>• Mobile App Integration</Text>
      </View>

      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.title}>Key Benefits of mydent Aligners</Text>
        <Text style={styles.text}>• Practically invisible</Text>
        <Text style={styles.text}>• Safe, pain-free & comfortable</Text>
        <Text style={styles.text}>• Eat anything | Free consultation</Text>
      </View>

      {/* 4 Steps */}
      <View style={styles.section}>
        <Text style={styles.title}>Start Your Smile Makeover in 4 Steps</Text>
        {[
          'Book a 3D Scan at Home',
          'Get Your Custom Smile Plan',
          'Aligners Delivered to You',
          'Monitor Progress with Our Experts',
        ].map((step, idx) => (
          <View key={idx} style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{idx + 1}</Text>
            </View>
            <Text style={styles.text}>{step}</Text>
          </View>
        ))}
      </View>
      {/* Video Previews - Circular Layout */}
      <View style={styles.section}>
        <Text style={styles.title}>See Our Aligners in Action</Text>
        <View style={styles.videoRow}>
          {videoSources.map((source, index) => (
            <View key={index} style={styles.videoWrapper}>
              <Video source={source} style={styles.circularVideo} />
            </View>
          ))}
        </View>
      </View>

      {/* Pricing */}
      <View style={styles.section}>
        <Text style={styles.title}>
          mydent Aligners – High Quality, Affordable Price
        </Text>
        <Image
          source={require('../../assets/images/mydentposter4.png')}
          style={styles.image}
        />
        <Text style={styles.text}>From ₹52,999 | EMIs starting at ₹80/day</Text>
        <Text style={styles.text}>Traditional Braces: ₹35,000–₹90,000</Text>
        <Text style={styles.text}>mydent Aligners: ₹52,999–₹1,30,000</Text>
        <Text style={styles.text}>Other Brands: ₹1,50,000–₹4,00,000</Text>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Your Free Scan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 100, backgroundColor: '#ffffff' },
  section: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 6 },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3BC3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: { color: '#fff', fontWeight: 'bold' },
  button: {
    backgroundColor: '#3BC3FF',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  videoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  videoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginVertical: 10,
  },

  circularVideo: {
    width: '100%',
    height: '100%',
  },
});

export default MyDentAlignersScreen;
