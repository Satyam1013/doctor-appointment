/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { treatmentData } from '../constants/teethTreatment';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type TeethTreatmentRouteParams = {
  params: {
    routeKey: string;
  };
};

export default function TeethTreatmentScreen() {
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQIndex((prev) => (prev === index ? null : index));
  };

  const route = useRoute<RouteProp<TeethTreatmentRouteParams, 'params'>>();
  const { routeKey } = route.params || {};
  const data = treatmentData.find((item) => item.route === routeKey);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Treatment not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>

      {/* Intro Section */}
      <Section title={`What are ${routeKey}?`}>
        <Text style={styles.paragraph}>{data.intro.description}</Text>
        {data.intro.treatmentOverview.map((point, idx) => (
          <Text key={idx} style={styles.bullet}>
            • {point}
          </Text>
        ))}
      </Section>

      {/* Intro Illustration Image */}
      {data.images[0] && (
        <Image
          source={{ uri: data.images[0] }}
          style={styles.illustration}
          resizeMode="contain"
        />
      )}

      {/* Symptoms Image */}
      {data.images[1] && (
        <Image
          source={{ uri: data.images[1] }}
          style={styles.fullWidthImage}
          resizeMode="cover"
        />
      )}

      {/* Why Treat */}
      <Section title={`Why should you correct ${routeKey}?`}>
        {data.whyTreat.map((why, idx) => (
          <Text key={idx} style={styles.bullet}>
            • {why}
          </Text>
        ))}
      </Section>

      {/* Aligners Image */}
      {data.images[2] && (
        <Image
          source={{ uri: data.images[2] }}
          style={styles.fullWidthImage}
          resizeMode="cover"
        />
      )}

      {/* Journey / Process */}
      <Section title="How it Works – Your Smile Makeover Journey">
        {data.treatments.children.map((step, idx) => (
          <Text key={idx} style={styles.bullet}>
            • {step}
          </Text>
        ))}
      </Section>

      {/* Aligner Demo Image */}
      {data.images[3] && (
        <Image
          source={{ uri: data.images[3] }}
          style={styles.fullWidthImage}
          resizeMode="cover"
        />
      )}

      {/* Cost */}
      <Section title={`Cost of ${routeKey} treatment`}>
        {data.cost.map((costItem, idx) => (
          <Text key={idx} style={styles.bullet}>
            {costItem.method}: {costItem.range}
          </Text>
        ))}
      </Section>

      {/* Mydent Highlights */}
      <Section title={data.mydentHighlight.title}>
        {data.mydentHighlight.points.map((point, idx) => (
          <Text key={idx} style={styles.bullet}>
            • {point}
          </Text>
        ))}
      </Section>

      {/* FAQs */}
      <Section title={`FAQs about ${routeKey}`}>
        {/* Horizontal line after Section title */}
        <View style={styles.divider} />

        {data.faqs.map((faq, idx) => (
          <View key={idx} style={styles.faq}>
            <TouchableOpacity
              onPress={() => toggleFAQ(idx)}
              activeOpacity={0.8}
            >
              <View style={styles.faqRow}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={
                    activeFAQIndex === idx
                      ? 'chevron-up-outline'
                      : 'chevron-down-outline'
                  }
                  size={20}
                  color="#888"
                />
              </View>
            </TouchableOpacity>

            {/* Show answer if active */}
            {activeFAQIndex === idx && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}

            {/* Horizontal line after each question-answer */}
            <View style={styles.divider} />
          </View>
        ))}
      </Section>

      {/* Gallery */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 10 }}
      >
        {data.images.slice(4).map((img: any, idx) => (
          <Image
            key={idx}
            source={img}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginVertical: 2,
  },
  faq: {
    marginBottom: 12,
  },
  faqAnswer: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  illustration: {
    width: '100%',
    height: 200,
    marginVertical: 12,
  },
  fullWidthImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginVertical: 12,
  },
  galleryImage: {
    width: 350, // Increased width
    height: 300, // Increased height
    marginRight: 10,
    borderRadius: 15, // Optional: make corners rounder
  },
  faqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    flex: 1, // 🧩 Makes question take remaining space
    paddingRight: 10, // 🧩 Adds spacing before arrow
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  faqIcon: {
    fontSize: 16,
    color: '#1e90ff',
  },
});
