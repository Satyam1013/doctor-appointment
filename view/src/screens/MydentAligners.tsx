/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import Carousel from '../components/Carousel';
import FeatureStats from '../components/FeatureStats';
import { Ionicons } from '@expo/vector-icons';
import { getCarousels } from '../api/carousel-api';
import { getAligners } from '../api/aligners-api';
import TeethAlignmentProblems from '../components/TeethAlignmentProblems';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

const MyDentAlignersScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [topCarousel, setTopCarousel] = useState<{ uri: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [videos, setVideos] = useState<{ uri: string }[]>([]);
  const [price, setPrice] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      // 👇 Scroll to top on tab focus
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch carousels
        const carouselRes = await getCarousels();
        setTopCarousel(
          carouselRes.data.topCarousel.map((img: any) => ({
            uri: img.imageUrl,
          })),
        );

        // Fetch aligner data
        const alignerRes = await getAligners();
        const aligner = alignerRes.data;

        setImages(aligner[0].image.map((url: string) => ({ uri: url })));
        setVideos(aligner[0].video.map((url: string) => ({ uri: url })));
        setPrice(aligner[0].price);
      } catch (err) {
        console.error('Failed to fetch aligner or carousel data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      {/* Hero Section */}
      <View style={styles.landing}>
        <Text style={styles.title}>Discover Clear Aligners by mydent</Text>
        <Text style={styles.subtitle}>
          Achieve Your Dream Smile with mydent Clear Aligners
        </Text>
        <Image source={images[0]} style={styles.image} />
        <Text style={styles.text}>
          mydent's transparent aligners are designed to gently shift your teeth
          into place over time. These removable, custom-fit trays are a modern
          alternative to traditional braces—discreet, comfortable, and
          effective.
        </Text>
      </View>
      <TeethAlignmentProblems navigation={navigation} />
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
        <Image source={images[1]} style={styles.image} />
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
        <Text style={styles.text}>• Customized and Comfortable Fit</Text>
        <Text style={styles.text}>• Affordable and Transparent Pricing</Text>
        <Text style={styles.text}>• Expert-Supervised Treatment</Text>
      </View>
      {/* Technology */}
      <View style={styles.technology}>
        <Image source={images[2]} style={styles.image} />
        <Text style={styles.title}>The Technology Behind mydent Aligners</Text>
        <Text style={styles.text}>• Precision 3D Printing</Text>
        <Text style={styles.text}>• Punching & Thermoforming</Text>
        <Text style={styles.text}>• Robotic Automation</Text>
        <Text style={styles.text}>• Mobile App Integration</Text>
      </View>
      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.title}>Key Benefits of mydent Aligners</Text>
        <Text style={styles.text}>• Virtually Invisible and Dicreet</Text>
        <Text style={styles.text}>
          • Removable for Convenience and Flexibility
        </Text>
        <Text style={styles.text}>• Custom-Fit for Comfort and Precision</Text>
        <Text style={styles.text}>• Affordable and Transparent Pricing</Text>
        <Text style={styles.text}>• Faster Treatment Times for Many Cases</Text>

        <Image source={images[3]} style={styles.image} />
      </View>
      {/* 4 Steps */}
      <View style={styles.section}>
        <Text style={styles.title}>
          Transform Your Smile Seamlessly in Just 4 Stages
        </Text>
        {[
          'Book Your Digital Consultation',
          'Get Your 3D Smile Scan',
          'Receive Your Custom Aligners',
          'Track Progress with Professional Guidance',
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
          Your path to a stunning smile using clear aligners
        </Text>
        {[
          {
            title: 'At - mydent Centre',
            description:
              'Schedule a convenient at-homescan or visit one of our 100+ expert centers for a scan and consultation with an orthodontis',
            step: '01',
            video: videos[2],
          },
          {
            title: 'At - your residence',
            description:
              'Start your treatment as soon as your aligners arrive.',
            step: '02',
            video: videos[3],
          },
          {
            title: 'Insert and access',
            description:
              'Put on your aligners and track your treatment via our app with professional support every step of the way',
            step: '03',
            video: videos[1],
          },
          {
            title: 'Celebrate your smile',
            description:
              'Complete your smile journey and preserve your perfect results with retainer',
            step: '04',
            video: videos[0],
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
        <Text style={styles.title}>
          Top-Notch Quality, Pocket-Friendly Prices
        </Text>
        <Text style={styles.text}>
          Say hello to Mydent Aligners – proudly #MadeInIndia and crafted with
          love in our high-tech labs! We use super-precise 3D printing to create
          smiletransforming aligners that are US FDA 510(k) cleared sheets – so,
          they’re as safe and effective as they are sleek
        </Text>

        {/* Card with image and price info */}
        <View style={styles.priceCard}>
          {/* Left side: Pricing info */}
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Starting at</Text>
            <Text style={styles.priceValue}>₹{price}</Text>
            <Text style={styles.emiNote}>
              Affordable EMI options{'\n'}available starting at just{'\n'}
              <Text style={styles.bold}>₹80 per day</Text>
            </Text>
          </View>

          {/* Right side: Doctor image with badge */}
          <Image source={images[3]} style={styles.priceImage} />
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
              Mydent Aligners
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
        <View style={[styles.separator, { marginTop: 16 }]} />
        {faqs.map((faq, index) => (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              activeOpacity={0.8}
            >
              <View style={styles.questionRow}>
                <Text style={styles.question}>{faq.question}</Text>
                <Ionicons
                  name={
                    activeIndex === index
                      ? 'chevron-up-outline'
                      : 'chevron-down-outline'
                  }
                  size={20}
                  color="#888"
                />
              </View>
            </TouchableOpacity>
            {activeIndex === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
            {/* Horizontal line after each FAQ */}
            <View style={styles.separator} />
          </View>
        ))}
      </View>
      {/* CTA */}
      <Text style={styles.ctaText}>Ready to Start Your Smile Journey?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'ConsultationOption',
          })
        }
      >
        <Text style={styles.buttonText}>Book Your Free Scan</Text>
      </TouchableOpacity>
      <FeatureStats />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: 120,
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  technology: {
    padding: 16,
    backgroundColor: '#ffe6eb',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  landing: {
    padding: 16,
    backgroundColor: '#fff7ed',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    padding: 16,
    backgroundColor: '#e3f2fd', // light blue for contrast
    marginVertical: 8,
    borderRadius: 10,
  },
  videoSection: {
    padding: 16,
    backgroundColor: '#f1f8e9', // soft green
    marginVertical: 8,
    borderRadius: 10,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff3e0', // light orange
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  comparisonTable: {
    marginTop: 16,
    backgroundColor: '#ede7f6', // soft purple
    borderRadius: 8,
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
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

  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 22,
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
    borderRadius: 50,
    marginLeft: 12,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },
  tableHeader: {
    backgroundColor: '#F2F2F2',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  highlightRed: {
    color: '#D32F2F',
  },
});

export default MyDentAlignersScreen;
