/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import Carousel from '../components/Carousel';

const faqs = [
  {
    question: 'What are invisible aligners?',
    answer:
      'Invisible aligners are clear, custom-made trays that gradually move your teeth into place without the need for metal braces.',
  },
  {
    question: 'Are aligners better than braces?',
    answer:
      'Aligners are discreet, removable, and more comfortable for many people. Braces may still be needed for more complex cases.',
  },
  {
    question: 'Are aligners painful?',
    answer:
      'Mild discomfort is normal initially, but aligners are generally pain-free and more comfortable than traditional braces.',
  },
  {
    question: 'How much does mydent treatment cost?',
    answer:
      'Treatment starts from ₹52,999 with EMI options starting at ₹80/day. Cost varies based on case complexity.',
  },
  {
    question: 'What materials are used in the aligners?',
    answer:
      'Mydent aligners are made from medical-grade, BPA-free thermoplastic for safe and comfortable wear.',
  },
];

const topCarousel = [
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner2.png'),
  require('../../assets/images/banner3.png'),
];

const MyDentAlignersScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };
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
      <Carousel images={topCarousel} />

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
      <View style={styles.card}>
        <Text style={styles.title}>Why should you go for clear aligners?</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerText, { flex: 2 }]}>
              The perks
            </Text>
            <Text
              style={[styles.cell, styles.alignCenter, styles.clearAlignerCol]}
            >
              Clear aligners
            </Text>
            <Text style={[styles.cell, styles.alignCenter]}>Braces</Text>
          </View>

          {/* Rows */}
          {[
            [
              'Easily removable while eating, drinking or even brushing',
              true,
              false,
            ],
            ['Invisible to the eyes', true, false],
            [
              'No restrictions on food. you can eat anything you want!',
              true,
              false,
            ],
            [
              'Easy to maintain good oral hygiene. you can brush & floss, everyday!',
              true,
              false,
            ],
            ['Frequent clinic visits', false, true],
            ['Comfort', true, false],
            ['Faster results (6–8 months)', true, false],
          ].map(([perk, clear, braces], index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, { flex: 2 }]}>{perk}</Text>
              <Text style={[styles.cell, styles.alignCenter]}>
                {clear ? '✅' : '❌'}
              </Text>
              <Text style={[styles.cell, styles.alignCenter]}>
                {braces ? '✅' : '❌'}
              </Text>
            </View>
          ))}
        </View>
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
      {/* Aligner Journey Section */}
      <View style={styles.section}>
        <Text style={styles.title}>
          Your smile makeOver journey with clear aligners
        </Text>
        {[
          {
            title: 'At - Experience Centre',
            description:
              'Book a scan at home or visit our 25+ experience centres for a scan and orthodontist consult',
            step: '01',
            video: require('../../assets/videos/mydentproducts1.mp4'),
          },
          {
            title: 'At - Home',
            description: 'Get your aligners delivered & start your treatment',
            step: '02',
            video: require('../../assets/videos/mydentproducts2.mp4'),
          },
          {
            title: 'Wear & Track',
            description:
              'Wear your aligners and track progress via our app with expert support',
            step: '03',
            video: require('../../assets/videos/mydentproducts3.mp4'),
          },
          {
            title: 'Enjoy Your Smile',
            description:
              'Complete your journey and maintain your perfect smile with retainers',
            step: '04',
            video: require('../../assets/videos/mydentproducts4.mp4'),
          },
        ].map((item, index) => (
          <View key={index} style={styles.videoStepContainer}>
            <Video
              source={item.video}
              style={styles.videoFull}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              isMuted
              shouldPlay
            />
            <Text style={styles.videoStepTitle}>{item.title}</Text>
            <View style={styles.videoStepInfo}>
              <Text style={styles.stepNumberLabel}>{item.step}</Text>
              <Text style={styles.stepDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Pricing */}
      <View style={styles.videoSection}>
        <Text style={styles.title}>Superior quality, affordable prices</Text>
        <Text style={styles.text}>
          mydent aligners, proudly #MadeInIndia, are 3D-printed in our own
          state-of-the-art labs, enabling us to provide best quality US FDA
          510(k) cleared aligners at prices similar to braces
        </Text>

        {/* Card with image and price info */}
        <View style={styles.priceCard}>
          {/* Left side: Pricing info */}
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Starting at</Text>
            <Text style={styles.priceValue}>₹52,999</Text>
            <Text style={styles.emiNote}>
              Affordable EMI options{'\n'}available starting at just{'\n'}
              <Text style={styles.bold}>₹80 per day</Text>
            </Text>
          </View>

          {/* Right side: Doctor image with badge */}
          <Image
            source={require('../../assets/images/mydentposter4.png')}
            style={styles.priceImage}
          />
        </View>

        {/* Comparison Table */}
        <View style={styles.comparisonTable}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>
              Traditional Braces
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableHeader,
                styles.highlightRed,
              ]}
            >
              mydent Aligners
            </Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>
              Other Brands
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>₹35,000 to ₹90,000</Text>
            <Text style={[styles.tableCell, styles.highlightRed]}>
              ₹52,999 to ₹1,30,000
            </Text>
            <Text style={styles.tableCell}>₹1,50,000 to ₹4,00,000</Text>
          </View>
        </View>
      </View>
      <View style={styles.faq}>
        <Text style={styles.title}>FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              activeOpacity={0.8}
            >
              <View style={styles.questionRow}>
                <Text style={styles.question}>{faq.question}</Text>
                <Text style={styles.icon}>
                  {activeIndex === index ? '▲' : '▼'}
                </Text>
              </View>
            </TouchableOpacity>
            {activeIndex === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>

      {/* CTA */}
      <Text style={styles.ctaText}>Ready to Start Your Smile Journey?</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Your Free Scan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 100, backgroundColor: '#ffffff' },
  section: { padding: 20 },
  videoSection: { padding: 20, backgroundColor: '#E6F0F8' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 6 },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333', // you can adjust color if you want
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  faq: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
  item: {
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
  answer: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  videoStepContainer: {
    marginBottom: 24,
  },
  videoFull: {
    width: '100%',
    aspectRatio: 16 / 9, // Maintain full visibility
    borderRadius: 12,
    backgroundColor: '#000',
  },
  videoStepTitle: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  videoStepInfo: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'flex-start',
  },
  stepNumberLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#3BC3FF',
  },
  stepDescription: {
    flex: 1,
    fontSize: 14,
    color: '#444',
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
    flexDirection: 'column',
    gap: 16,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9, // maintain standard video shape
    borderRadius: 8, // optional: keep it slightly rounded
    overflow: 'hidden',
  },

  circularVideo: {
    width: '100%',
    height: '100%',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerRow: {
    backgroundColor: '#f9f9ff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    margin: 16,
  },

  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 13,
    color: '#333',
  },
  alignCenter: {
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#444',
  },
  clearAlignerCol: {
    color: '#3BC3FF',
    fontWeight: 'bold',
  },
  priceCard: {
    flexDirection: 'row',
    backgroundColor: '#FDEDED',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceInfo: {
    flex: 1,
    marginRight: 12,
  },

  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },

  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3D00',
  },

  emiNote: {
    fontSize: 13,
    color: '#333',
    marginTop: 6,
    lineHeight: 18,
  },

  bold: {
    fontWeight: 'bold',
  },

  priceImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  comparisonTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
  },

  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
  },

  tableHeader: {
    backgroundColor: '#F2F2F2',
    fontWeight: 'bold',
  },

  highlightRed: {
    color: '#FF3D00',
  },
});

export default MyDentAlignersScreen;
