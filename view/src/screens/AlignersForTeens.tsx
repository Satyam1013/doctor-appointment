/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';

export default function AlignersForTeensScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Aligners for Teens | mydent</Text>
      <Text style={styles.subheading}>
        Clear Aligners & Braces Designed for Your Teen’s Perfect Smile
      </Text>
      <Text style={styles.text}>
        Orthodontist-approved smile solutions tailored for growing teens—because
        confidence starts with a healthy smile.
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
        “I used to be embarrassed to smile because of the gap in my front teeth.
        With mydent, everything changed.”
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

      <Text style={styles.sectionTitle}>Pricing & Plans for Every Budget</Text>
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
      <Text style={styles.bullet}>✔ Boosts facial symmetry & appearance</Text>
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

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <Text style={styles.bullet}>
        What are clear aligners? Invisible, removable trays that gently move
        teeth without metal brackets.
      </Text>
      <Text style={styles.bullet}>
        How are they different from braces? Aligners are discreet, removable,
        and easier to manage.
      </Text>
      <Text style={styles.bullet}>
        Are they safe and comfortable? Yes. Made from medical-grade PET-G and
        custom-molded.
      </Text>
      <Text style={styles.bullet}>
        How long before results show? 2–3 months for changes; full results in
        6–18 months.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
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
});
