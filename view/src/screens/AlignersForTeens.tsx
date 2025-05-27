/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LayoutAnimation, TouchableOpacity, View } from 'react-native';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';

const faqBullets = [
  {
    question: 'What are clear aligners?',
    answer:
      'Clear aligners are invisible, removable trays that gently move teeth into proper alignment without using metal brackets or wires.',
  },
  {
    question: 'How are they different from braces?',
    answer:
      'Unlike traditional braces, aligners are discreet, removable, and more comfortable. They make eating, brushing, and flossing much easier.',
  },
  {
    question: 'Are they safe and comfortable?',
    answer:
      'Yes, aligners are made from medical-grade PET-G plastic, custom-molded for each patient to ensure comfort and safety.',
  },
  {
    question: 'How long before results show?',
    answer:
      'You may start seeing noticeable changes in 2–3 months, with full results typically achieved within 6 to 18 months.',
  },
];

export default function AlignersForTeensScreen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Aligners for Teens | mydent</Text>
        <Text style={styles.subheading}>
          Clear Aligners & Braces Designed for Your Teen’s Perfect Smile
        </Text>
        <Text style={styles.text}>
          Orthodontist-approved smile solutions tailored for growing
          teens—because confidence starts with a healthy smile.
        </Text>

        <Image
          source={require('../../assets/images/teen-girl.jpg')}
          style={styles.image}
        />

        <Text style={styles.sectionTitle}>
          How mydent Teen Aligners & Braces Work
        </Text>
        <Text style={styles.text}>
          Specially crafted by certified orthodontists, mydent teen aligners and
          braces help fix gaps, crowding, and bite issues. Using gentle,
          controlled force, they gradually shift teeth into place—ensuring your
          teen gets a straighter, more confident smile without disrupting their
          daily life.
        </Text>

        <Image
          source={require('../../assets/images/aligner-model.png')}
          style={styles.image}
        />

        <Text style={styles.sectionTitle}>Why mydent Is Perfect for Teens</Text>
        <Text style={styles.bullet}>
          🦷 Custom-Fit for Ages 13–19 – Comfortable fit for developing jaws.
        </Text>
        <Text style={styles.bullet}>
          🧑‍⚕️ Expert-Led Care – Monitored by experienced dentists and
          orthodontists.
        </Text>
        <Text style={styles.bullet}>
          📈 Lasting Results, Healthy Smile – Backed by tech and clinical
          precision.
        </Text>

        <Text style={styles.sectionTitle}>What We Treat</Text>
        <Text style={styles.bullet}>• Spacing or gaps</Text>
        <Text style={styles.bullet}>• Crowding</Text>
        <Text style={styles.bullet}>• Crossbite</Text>
        <Text style={styles.bullet}>• Overbite / Underbite</Text>
        <Text style={styles.bullet}>• Protrusion</Text>
        <Text style={styles.bullet}>• Open bite</Text>

        <Text style={styles.sectionTitle}>
          The Benefits of mydent Teen Aligners
        </Text>
        <Text style={styles.bullet}>✅ Discreet & Nearly Invisible</Text>
        <Text style={styles.bullet}>✅ Easy to Maintain Oral Hygiene</Text>
        <Text style={styles.bullet}>✅ Boosts Self-Esteem</Text>
        <Text style={styles.bullet}>✅ Results That Last</Text>
        <Text style={styles.bullet}>✅ Pain-Free and Comfortable</Text>

        <Text style={styles.sectionTitle}>Real Teen, Real Transformation</Text>
        <Text style={styles.quote}>
          “I used to be embarrassed to smile because of the gap in my front
          teeth. With mydent, everything changed.”
          {'\n'}— Divya, Age 16 • 12 aligners • 6-month treatment
        </Text>

        <Text style={styles.sectionTitle}>Why Parents Trust mydent</Text>
        <Text style={styles.bullet}>🏥 300,000+ Smiles Analyzed</Text>
        <Text style={styles.bullet}>
          🦷 US FDA 510(k) Cleared & ISO 13485 Certified
        </Text>
        <Text style={styles.bullet}>
          📱 App-Based Monitoring with 24/7 Support
        </Text>
        <Text style={styles.bullet}>
          📦 Full Kit Delivered Home with Doctor Support
        </Text>

        <Text style={styles.sectionTitle}>
          Pricing & Plans for Every Budget
        </Text>
        <Text style={styles.bullet}>
          • One-Time Payment Plans starting at ₹30,000 – ₹80,000
        </Text>
        <Text style={styles.bullet}>• EMIs Starting at Just ₹80/day</Text>
        <Text style={styles.bullet}>• Treatment Duration: 8–18 months</Text>
        <Text style={styles.bullet}>
          • Free Consultation to assess your teen’s specific dental needs
        </Text>

        <Text style={styles.sectionTitle}>Why Early Treatment Matters</Text>
        <Text style={styles.bullet}>✔ Corrects bite and jaw issues</Text>
        <Text style={styles.bullet}>
          ✔ Boosts facial symmetry & appearance
        </Text>
        <Text style={styles.bullet}>✔ Improves speech clarity</Text>
        <Text style={styles.bullet}>✔ Prevents cavities and gum issues</Text>
        <Text style={styles.bullet}>
          ✔ Supports healthy long-term dental alignment
        </Text>

        <Text style={styles.sectionTitle}>
          Visit a mydent Smile Centre Near You
        </Text>
        <Text style={styles.bullet}>
          📍 Locations: Mumbai, Bangalore, Delhi, Hyderabad, Pune, Chennai,
          Chandigarh, Jaipur, Noida
        </Text>

        <Text style={styles.sectionTitle}>The mydent Guarantee</Text>
        <Text style={styles.text}>
          Your smile goals are our promise. We commit to delivering your desired
          results—backed by expert care and cutting-edge technology. Just follow
          your treatment plan 100%.
        </Text>

        <View style={styles.faq}>
          <Text style={styles.title}>FAQs</Text>
          <View style={[styles.separator, { marginTop: 16 }]} />
          {faqBullets.map((faq, index) => (
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  answer: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  bullet: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    marginBottom: 6,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    resizeMode: 'contain',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  faq: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
});
