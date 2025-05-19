/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { addToCart } from '../api/cart-api';
import FeatureStats from '../components/FeatureStats';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const products = [
  {
    title: 'Whitening pen',
    _id: '682779a388e60dac093dbb8a',
    icon: 'https://i.ibb.co/KjDBqrgG/1.png',
    price: 899,
  },
  {
    title: 'Whitening gel',
    _id: '682779a388e60dac093dbb89',
    icon: 'https://i.ibb.co/pBXnQNXm/1.png',
    price: 899,
  },
];

const programSteps = [
  { title: 'Orientation & Patient Information', sessions: '1 Live session' },
  { title: 'Gynaecologist Consultation', sessions: '4 Sessions' },
  { title: 'Nutritionist Consultation', sessions: '3 Sessions' },
  { title: 'Yoga & Meditation Consultation', sessions: '3 Sessions' },
  { title: 'Well being counselling & Monitoring', sessions: '3 Sessions' },
];

const alignerFAQs = [
  {
    question: 'Do aligners cause pain?',
    answer:
      'Mild discomfort is normal when starting aligners or switching to a new set. It means your teeth are moving as planned. This usually subsides within a few days.',
  },
  {
    question: 'I feel discomfort while wearing my aligners. What should I do?',
    answer:
      'Discomfort can be managed by:\n\n• Wearing the aligners as instructed (usually 20–22 hours a day)\n• Using chewies to seat aligners properly\n• Taking a mild pain reliever if needed\n• Contacting the Mydent support team if pain is sharp or persistent',
  },
  {
    question: 'How do I properly wear and remove my aligners?',
    answer:
      'To wear: Gently push them over your front teeth, then press down on your molars using your fingertips.\n\nTo remove: Use your fingers to lift the aligners from the molars on one side, then the other, and gently peel them off the front teeth.\n\nAlways use clean, dry hands and avoid using sharp objects.',
  },
  {
    question: 'When can I expect to see visible results?',
    answer:
      'Most users notice changes within 6–8 weeks. However, this can vary based on the complexity of your case and your consistency in wearing the aligners.',
  },
  {
    question: 'How can I avoid relapse after completing my treatment?',
    answer:
      'Relapse can be prevented by:\n\n• Wearing your retainers as instructed after treatment\n• Following post-treatment care guidance\n• Attending follow-ups if advised by your orthodontist',
  },
  {
    question: 'What are Mydent Booster Aligners and Enhancement Aligners?',
    answer:
      'Booster Aligners are used to speed up or improve the results of ongoing treatment.\n\nEnhancement Aligners are provided after your initial treatment if slight corrections are still needed. These are designed to perfect your smile and ensure long-term stability.',
  },
  {
    question:
      'What dental procedures might be involved in my treatment journey?',
    answer:
      'Your treatment might include:\n\n• IPR (Interproximal Reduction) to create space between teeth\n• Attachments or buttons to help guide tooth movement\n• Dental cleanings before and during treatment\n• Extractions in select cases (rare for aligner-only plans)\n\nAll procedures are planned by a licensed orthodontist based on your need',
  },
];

export default function ContactUsScreen() {
  const [activeAlignerIndex, setActiveAlignerIndex] = useState<number | null>(
    null,
  );
  const navigation = useNavigation<NavigationProp<any>>();
  const { user } = useUser();

  const toggleAlignerFAQ = (index: number) => {
    setActiveAlignerIndex(activeAlignerIndex === index ? null : index);
  };

  const handleAddToCart = async (product: any) => {
    try {
      if (!product || !product._id) {
        Alert.alert('Error', 'Product ID is missing');
        return;
      }
      await addToCart(product._id, 1);
      Alert.alert('Success', `${product.title} added to cart`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. Welcome Section */}
      <View style={styles.welcomeContainer}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={styles.profileRow}>
            <Image
              source={require('../../assets/images/consultant.jpg')}
              style={styles.profileImage}
            />
            <Text style={styles.helloText}>Hello, {user?.firstName}</Text>
          </View>
          <Text style={styles.subText}>
            Start your journey of Parenthood with us
          </Text>

          <TouchableOpacity style={styles.coordinatorButton}>
            <Text style={styles.buttonText}>
              Reach out to your program co-ordinator
            </Text>
            <Text style={styles.timeText}>🕒 10am - 6pm</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side: Bell Icon */}
        <TouchableOpacity style={styles.bellIconWrapper}>
          <Ionicons name="notifications-outline" size={24} color="#00788D" />
        </TouchableOpacity>
      </View>

      {/* 2. Program Structure Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Program Structure</Text>
        <View style={styles.timelineContainer}>
          {programSteps.map((item, index) => (
            <View key={index} style={styles.stepContainer}>
              {/* Connector Line */}
              {index !== programSteps.length - 1 && (
                <View style={styles.verticalLine} />
              )}
              {/* Circle */}
              <View
                style={[
                  styles.circle,
                  index === 0 ? styles.filledCircle : styles.hollowCircle,
                ]}
              />
              {/* Content */}
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepSession}>{item.sessions}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 3. Schedule */}
      <View style={styles.todayAppointmentCard}>
        <Text style={styles.todayTitle}>Today Appointment</Text>
        <Text style={styles.appointmentId}>
          Appointment ID: 345567872782889
        </Text>
        <View style={styles.doctorInfo}>
          <Image
            source={require('../../assets/images/consultant.jpg')}
            style={styles.expertImage}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.doctorName}>Dr. Preeti Chhabra</Text>
            <Text style={styles.doctorSpeciality}>
              Gynae and Fertility, General Medicine & Others
            </Text>
            <Text style={styles.ratingStars}>★★★★★</Text>
            <View style={styles.timeRow}>
              <Text style={styles.scheduleTime}>🕒 1:30PM</Text>
              <Text style={[styles.scheduleDate, { marginLeft: 10 }]}>
                📅 10 Aug
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join video call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.uploadRow}>
          <Text style={styles.uploadText}>📎 Upload Reports</Text>
          <TouchableOpacity>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Team of Experts*/}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Your Team Of Experts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.expertsContainer}
        >
          {[
            'Dr. Nandini',
            'Dr. Preeti',
            'Dr. Anshu',
            'Dr. Pallvi',
            'Dr. Jyoti',
          ].map((name, idx) => (
            <View key={idx} style={styles.expertBox}>
              <Image
                source={require('../../assets/images/consultant.jpg')}
                style={styles.expertImage}
              />
              <Text style={styles.expertName}>{name}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Schedule</Text>
        {[
          {
            name: 'Dr. Preeti Chhabra',
            type: 'Gynaecologist',
            time: '1:30PM',
            date: '15 Aug',
          },
          {
            name: 'Dr. Anshu Sharma',
            type: 'Nutritionist',
            time: '5:00PM',
            date: '20 Aug',
          },
          {
            name: 'Dr. Pallvi Rathee',
            type: 'Yoga & Meditation',
            time: '10:00AM',
            date: '25 Aug',
          },
          {
            name: 'Dr. Jyoti Kumar',
            type: 'Counselling & Monitoring',
            time: '10:00AM',
            date: '30 Aug',
          },
        ].map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.scheduleDoctor}>{item.name}</Text>
              <Text style={styles.scheduleInfo}>{item.type}</Text>
            </View>
            <View>
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <Text style={styles.scheduleDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 5. Product Section & FAQs */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Buy Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductsTab')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productRow}>
          {products.map((item) => (
            <View key={item._id} style={styles.productCard}>
              <Image source={{ uri: item.icon }} style={styles.productImage} />
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={[styles.faq, { marginTop: 24 }]}>
          <Text style={styles.title}>Aligner FAQs</Text>
          {alignerFAQs.map((faq, index) => (
            <View key={index} style={styles.item}>
              <TouchableOpacity
                onPress={() => toggleAlignerFAQ(index)}
                activeOpacity={0.8}
              >
                <View style={styles.questionRow}>
                  <Text style={styles.question}>{faq.question}</Text>
                  <Text style={styles.icon}>
                    {activeAlignerIndex === index ? '▲' : '▼'}
                  </Text>
                </View>
              </TouchableOpacity>
              {activeAlignerIndex === index && (
                <Text style={styles.answer}>{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <FeatureStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fb',
    flex: 1,
    paddingBottom: 120,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: '#00AEEF',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  faq: {
    padding: 20,
    borderRadius: 12,
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

  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#E6F9FB',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  leftSection: {
    flex: 1,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },

  helloText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00788D',
  },

  subText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },

  coordinatorButton: {
    backgroundColor: '#00AEEF',
    padding: 10,
    borderRadius: 12,
    maxWidth: 250,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  timeText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },

  bellIconWrapper: {
    padding: 8,
  },

  bellIcon: {
    width: 24,
    height: 24,
    tintColor: '#00788D',
  },
  welcomeSection: {
    backgroundColor: '#e5f8ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00A67E',
    marginBottom: 12,
  },
  timelineContainer: {
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#00A67E',
    marginLeft: 7,
  },
  stepContainer: {
    position: 'relative',
    marginBottom: 20,
    paddingLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#00AEEF',
    fontWeight: '600',
  },
  verticalLine: {
    position: 'absolute',
    top: 12,
    left: -2,
    height: '100%',
    width: 2,
    backgroundColor: '#00AEEF',
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    left: -10,
    top: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  filledCircle: {
    backgroundColor: '#00AEEF',
  },
  hollowCircle: {
    borderWidth: 2,
    borderColor: '#00AEEF',
    backgroundColor: '#fff',
  },
  stepTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  stepTitle: {
    color: '#00AEEF',
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
  },
  stepSession: {
    fontSize: 14,
    color: '#3b3b3b',
    fontWeight: '500',
  },
  programText: {
    fontSize: 15,
    color: '#444',
  },
  sessionText: {
    color: '#00A67E',
    fontWeight: '600',
  },
  expertsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  expertBox: {
    alignItems: 'center',
    marginRight: 16,
  },
  expertImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 6,
    backgroundColor: '#ddd',
  },
  expertName: {
    fontSize: 13,
    color: '#333',
  },
  scheduleItem: {
    backgroundColor: '#eaf7ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleDoctor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scheduleInfo: {
    fontSize: 14,
    color: '#666',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00AEEF',
    textAlign: 'right',
  },
  scheduleDate: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  faqText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  todayAppointmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  appointmentId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00AEEF',
  },
  doctorSpeciality: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  ratingStars: {
    color: '#4CAF50',
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  joinButton: {
    backgroundColor: '#00A67E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  rescheduleButton: {
    borderColor: '#00AEEF',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  rescheduleText: {
    color: '#00AEEF',
    fontWeight: '600',
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
  },
  viewText: {
    fontSize: 14,
    color: '#00AEEF',
    fontWeight: '600',
  },
});
