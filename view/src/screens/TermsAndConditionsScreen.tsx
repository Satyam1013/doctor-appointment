import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function TermsAndConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.subtitle}>Welcome to Mydent</Text>
        <Text style={styles.paragraph}>
          mydent is a brand operated under mydent Pvt Ltd. By using our
          website/app, you (the customer) agree unconditionally to our terms and
          conditions whether or not you've read them. Your continued use of this
          platform constitutes acceptance of all terms outlined herein. If you
          disagree with any part of these terms, kindly refrain from using the
          website/app.
        </Text>

        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.heading}>{section.title}</Text>
            {Array.isArray(section.content) ? (
              section.content.map((item, i) => (
                <Text key={i} style={styles.bullet}>
                  {'\u2022'} {item}
                </Text>
              ))
            ) : (
              <Text style={styles.paragraph}>{section.content}</Text>
            )}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.heading}>12. Contact Information</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>mydent Pvt Ltd{'\n'}</Text>
            VM Steel Project S.O, Pragati Maidan, Pivot Building, AMTZ Campus,
            Visakhapatnam, Andhra Pradesh 530031{'\n\n'}
            <Text style={styles.bold}>Customer Support:</Text> +91 9849492909
            {'\n'}
            <Text style={styles.bold}>Email:</Text> support@mydent.in{'\n'}
            <Text style={styles.bold}>Working Hours:</Text> Mon–Sat (9 AM – 8
            PM)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sections = [
  {
    title: '1. Regulatory Compliance',
    content:
      'In accordance with current medical device regulations, it is mandatory to purchase from authorized suppliers such as mydent and to sell only to qualified dental/medical practitioners. Therefore, customers are required to submit their dental/medical registration or drug license number before placing an order. Mydent is not responsible for the authenticity of details submitted.',
  },
  {
    title: '2. General Terms',
    content: [
      'All users must ensure their own due diligence before purchasing.',
      'mydent assumes no liability for how products are used or the outcomes thereof.',
      'We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion without prior notice.',
      'Products remain the property of Mydent until full payment is received and verified through banking procedures.',
      'Once dispatched, orders cannot be altered.',
    ],
  },
  {
    title: '3. Order, Delivery & Cancellations',
    content: [
      'Order changes are not permitted once shipped.',
      'Delays due to external factors (e.g. festive seasons, tech issues, weather) are not our responsibility, but we strive to minimize them.',
      'In the event of order cancellation due to product unavailability, the customer will be notified and refunded accordingly.',
      'Refunds are subject to banking timelines and may take up to 7–10 working days to reflect.',
    ],
  },
  {
    title: '4. Account & Security',
    content: [
      'Customers are responsible for their own account information and confidentiality.',
      'Any unauthorized use should be reported to: support@mydent.in',
      'We may ask for account re-verification in case of any security concerns.',
    ],
  },
  {
    title: '5. Product Information & Pricing',
    content: [
      'Product images are indicative and actual items may vary.',
      'Pricing and availability are subject to change without prior notice.',
      'mydent retains the right to cancel or suspend any order until fully processed and delivered.',
    ],
  },
  {
    title: '6. Returns & Replacements',
    content: [
      'Items must be returned in original packaging, unused, and intact.',
      'Partial returns (for orders with multiple items) are allowed if all components are returned undamaged.',
      'Some categories are non-returnable.',
      'Refunds initiated within 24–48 business hours of receiving returned items.',
      'Prepaid refunds go back to the original payment method.',
      'For COD orders, customers must provide bank details for transfer.',
      'Refunds may take 7–10 working days to reflect.',
      'More details at: www.mydent.in/return-policy',
    ],
  },
  {
    title: '7. Payments',
    content: [
      'Supported payment modes include Credit/Debit Cards, Net Banking, UPI (PhonePe, Google Pay, Paytm), Wallets, and COD (in selected locations).',
      'mydent is not responsible for any failed transactions due to customer-end internet/bank issues.',
    ],
  },
  {
    title: '8. Loyalty & Reward Coins',
    content: [
      'Reward coins are earned on select purchases and credited after delivery.',
      'Only 5% of cart value can be redeemed per order.',
      'Coins expire in 60 days from date of issue.',
      'Full policy at: www.mydent.in/rewards',
    ],
  },
  {
    title: '9. Privacy Policy',
    content:
      'mydent collects customer information (name, contact, address, payment, location) to process orders, improve experience, and notify users of offers. We do not sell, rent, or misuse personal data. Read full privacy policy here: www.mydent.in/privacy-policy',
  },
  {
    title: '10. Limited Use License',
    content:
      'mydent grants a limited, non-exclusive license to access and use this platform for personal and commercial purposes. All other rights are reserved.',
  },
  {
    title: '11. Jurisdiction',
    content:
      'All disputes will be subject to the exclusive jurisdiction of courts located in Visakhapatnam, Andhra Pradesh.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingBottom: 120,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2A2A2A',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#555',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D43F3F',
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  bullet: {
    fontSize: 15,
    color: '#444',
    paddingLeft: 12,
    lineHeight: 22,
    marginBottom: 4,
  },
  section: {
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
});
