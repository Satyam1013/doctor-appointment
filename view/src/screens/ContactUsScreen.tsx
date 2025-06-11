/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { addToCart } from '../api/cart-api';
import FeatureStats from '../components/FeatureStats';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import Transformation from '../components/Transformation';
import ProductCard from '../components/ProductCard';
import { getContactUs } from '../api/contact-us-api';
import { AVPlaybackSource, ResizeMode, Video } from 'expo-av';
import { getDoctorAssignment } from '../api/user-api';

const products = [
  {
    title: 'Whitening pen',
    _id: '682779a388e60dac093dbb8a',
    images: 'https://i.ibb.co/KjDBqrgG/1.png',
    price: 599,
    originalPrice: 899,
  },
  {
    title: 'Whitening gel',
    _id: '682779a388e60dac093dbb89',
    images: 'https://i.ibb.co/pBXnQNXm/1.png',
    price: 899,
    originalPrice: 1299,
  },
];

const programSteps = [
  { title: 'Full month Intraoral scan', sessions: '1 Live Session' },
  { title: 'Orthodontist Consultation', sessions: '3 Session' },
  { title: 'Aligner Plan Confirmation', sessions: '2 Session' },
  { title: 'Counselling and monitoring', sessions: '3 Session' },
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

interface DoctorAssignment {
  doctor: {
    _id: string;
    name: string;
    specialization?: string;
    email?: string;
    place?: string;
  };
  step: number;
  assignedAt: Date;
}

const formatAppointmentDateTime = (date: Date | null) => {
  if (!date) return { dateString: '', timeString: '' };

  return {
    dateString: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    timeString: date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };
};

export default function ContactUsScreen() {
  const [activeAlignerIndex, setActiveAlignerIndex] = useState<number | null>(
    null,
  );
  const [video, setVideo] = useState<AVPlaybackSource | undefined>(undefined);

  const [doctorAssignment, setDoctorAssignment] =
    useState<DoctorAssignment | null>(null);

  const navigation = useNavigation<NavigationProp<any>>();
  const { user } = useUser();

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      // 👇 Scroll to top on tab focus
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await getDoctorAssignment();
        const assignment = {
          ...res.data,
          assignedAt: new Date(res.data.assignedAt),
        };
        setDoctorAssignment(assignment);
      } catch (err) {
        console.error('Failed to fetch doctor assignment:', err);
      }
    };

    const fetchContactData = async () => {
      try {
        const res = await getContactUs();
        const video = res.data[0];
        setVideo({ uri: video.video });
      } catch (err) {
        console.error('Failed to fetch contact data:', err);
      }
    };

    fetchDoctorData();
    fetchContactData();
  }, []);

  const toggleAlignerFAQ = (index: number) => {
    setActiveAlignerIndex(activeAlignerIndex === index ? null : index);
  };

  const handleAddToCart = async (product: any, quantity: number) => {
    try {
      if (!product || !product._id) {
        Alert.alert('Error', 'Product ID is missing');
        return;
      }
      await addToCart(product._id, quantity);
      Alert.alert('Success', `${product.title} added to cart`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      {/* 1. Welcome Section */}
      <View style={styles.welcomeContainer}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: 'https://i.ibb.co/35mrrKZh/consultant.jpg' }}
              style={styles.profileImage}
            />
            <Text style={styles.helloText}>Hello, {user?.firstName}</Text>
          </View>
          <Text style={styles.subText}>
            Start your journey of Aligners with us
          </Text>

          <TouchableOpacity style={styles.coordinatorButton}>
            <Text style={styles.buttonText}>
              Reach out to your program co-ordinator
            </Text>
            <Text style={styles.timeText}>🕒 8Am - 11Pm</Text>
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
          {programSteps.map((item, index) => {
            // Get current step from doctorAssignment (default to 0 if not available)
            const currentStep = doctorAssignment?.step || 0;
            // Step numbers start at 1, so we compare with index+1
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <View key={index} style={styles.stepContainer}>
                {/* Circle marker - filled if completed or current */}
                <View
                  style={[
                    styles.circle,
                    isCompleted || isCurrent
                      ? styles.filledCircle
                      : styles.hollowCircle,
                    isCurrent && styles.currentCircle, // Add special style for current step
                  ]}
                />

                {/* Vertical connector line - filled if next step is completed */}
                {index !== programSteps.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                      isCompleted && styles.completedLine,
                    ]}
                  />
                )}

                {/* Text container */}
                <View style={styles.stepTextWrapper}>
                  <Text
                    style={[
                      styles.stepTitle,
                      (isCompleted || isCurrent) && styles.completedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.stepSession}>{item.sessions}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      {/* 3. Schedule */}
      <View style={styles.todayAppointmentCard}>
        <Text style={styles.todayTitle}>Today's Appointment</Text>

        {doctorAssignment ? (
          <>
            <Text style={styles.appointmentId}>
              Appointment ID: {doctorAssignment.doctor._id}
            </Text>
            <View style={styles.doctorInfo}>
              <Image
                source={{ uri: 'https://i.ibb.co/35mrrKZh/consultant.jpg' }}
                style={styles.expertImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.doctorName}>
                  {doctorAssignment.doctor.name}
                </Text>
                <Text style={styles.doctorSpeciality}>
                  {doctorAssignment.doctor.specialization}
                </Text>
                <Text style={styles.ratingStars}>★★★★★</Text>
                <View style={styles.timeRow}>
                  <Text style={styles.scheduleTime}>
                    🕒{' '}
                    {
                      formatAppointmentDateTime(doctorAssignment.assignedAt)
                        .timeString
                    }
                  </Text>
                  <Text style={[styles.scheduleDate, { marginLeft: 10 }]}>
                    📅{' '}
                    {
                      formatAppointmentDateTime(doctorAssignment.assignedAt)
                        .dateString
                    }
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
          </>
        ) : (
          <View style={styles.noAppointmentContainer}>
            <Image
              source={{ uri: 'https://i.ibb.co/35mrrKZh/consultant.jpg' }}
              style={styles.noAppointmentImage}
            />
            <Text style={styles.noAppointmentText}>
              No appointment scheduled
            </Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book an Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* 4. Team of Experts*/}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Your Team of IOS certified Orthodontist
        </Text>
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
                source={{ uri: 'https://i.ibb.co/35mrrKZh/consultant.jpg' }}
                style={styles.expertImage}
              />
              <Text style={styles.expertName}>{name}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          Schedule Appointments
        </Text>
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
      {/* 5. Video Section */}
      <View style={styles.videoStepContainer}>
        {/* Heading and View All button */}
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Testimonials</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Video component */}
        <Video
          source={video}
          style={styles.videoFull}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          isMuted
          shouldPlay
        />
      </View>
      {/* 6. Product Section & FAQs */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Buy Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductsTab')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productRow}>
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              onAddToCart={(product: any, quantity: any) =>
                handleAddToCart(product, quantity)
              }
              onToggleFavorite={(id: string, isFav: boolean) => {
                console.log('Favorite toggled:', id, isFav);
              }}
            />
          ))}
        </View>

        <Transformation navigation={navigation} />

        <View style={[styles.faq, { marginTop: 24 }]}>
          <Text style={styles.title}>Aligner FAQs</Text>
          <View style={[styles.separator, { marginTop: 16 }]} />

          {alignerFAQs.map((faq, index) => (
            <View key={index}>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => toggleAlignerFAQ(index)}
                  activeOpacity={0.8}
                >
                  <View style={styles.questionRow}>
                    <Text style={styles.question}>{faq.question}</Text>
                    <Ionicons
                      name={
                        activeAlignerIndex === index
                          ? 'chevron-up-outline'
                          : 'chevron-down-outline'
                      }
                      size={20}
                      color="#888"
                    />
                  </View>
                </TouchableOpacity>
                {activeAlignerIndex === index && (
                  <Text style={styles.answer}>{faq.answer}</Text>
                )}
              </View>

              {/* Horizontal line after each FAQ */}
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </View>
      <FeatureStats />
      <View style={styles.footerContainer}>
        {/* Quick Links */}
        <Text style={styles.footerHeading}>Quick Links</Text>
        <View style={styles.linkColumns}>
          <View style={styles.linkColumn}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
              <Text style={styles.linkText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProductsTab')}
            >
              <Text style={styles.linkText}>Order Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'TermsAndConditionsScreen',
                })
              }
            >
              <Text style={styles.linkText}>Cancellation & Refund</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('FavProductScreen')}
            >
              <Text style={styles.linkText}>Favorite Page</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'TermsAndConditionsScreen',
                })
              }
            >
              <Text style={styles.linkText}>Terms and Conditions | mydent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'TermsAndConditionsScreen',
                })
              }
            >
              <Text style={styles.linkText}>Shipping Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
              <Text style={styles.linkText}>Cart Page</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkColumn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransformationScreen')}
            >
              <Text style={styles.linkText}>Success Stories</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Mydent')}>
              <Text style={styles.linkText}>Mydent Aligners</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CentersTab')}>
              <Text style={styles.linkText}>Mydent Centers</Text>
            </TouchableOpacity>

            <Text style={styles.linkText}>support@mydent.com</Text>

            <Text style={[styles.linkText, { marginTop: 10 }]}>Mobile:</Text>
            <Text style={styles.linkText}>+91 9849492909</Text>
          </View>
        </View>

        {/* About Company */}
        <Text style={styles.footerHeading}>About Company</Text>
        <Text style={styles.linkText}>
          Corporate Office Address:
          {'\n'}VM Steel Project S.O, Pragati Maidan, Pivot Building, AMTZ
          Campus, Visakhapatnam, Andhra Pradesh 530031
        </Text>

        {/* Footer Note */}
        <Text style={styles.footerNote}>@2025, Mydent</Text>
      </View>
      );
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fb',
    flex: 1,
    paddingBottom: 120,
  },
  currentCircle: {
    backgroundColor: '#FFC107', // Yellow for current step
    borderColor: '#FFC107',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00A67E',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#007BFF', // Or any accent color
  },
  faq: {
    padding: 20,
    borderRadius: 12,
  },
  item: {
    marginBottom: 12,
  },
  videoStepContainer: {
    margin: 16,
  },
  videoFull: {
    width: '100%',
    aspectRatio: 16 / 9, // Maintain full visibility
    borderRadius: 12,
    backgroundColor: '#000',
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
    maxWidth: 300,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#65B300', // Matches your image's green heading
    marginBottom: 12,
  },
  timelineContainer: {
    paddingLeft: 10,
    position: 'relative',
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    position: 'relative',
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 2,
    marginRight: 10,
    zIndex: 1,
  },

  filledCircle: {
    backgroundColor: '#00AEEF',
  },

  hollowCircle: {
    borderWidth: 2,
    borderColor: '#00AEEF',
    backgroundColor: '#fff',
  },

  verticalLine: {
    position: 'absolute',
    top: 12,
    left: 4,
    height: '100%',
    width: 2,
    backgroundColor: '#00AEEF',
    zIndex: 0,
  },

  stepTextWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  stepTitle: {
    color: '#00AEEF',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  stepSession: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginLeft: 10,
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

  stepTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
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
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 16,
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
  completedLine: {
    backgroundColor: '#4CAF50', // Green for completed connectors
  },
  completedText: {
    fontWeight: 'bold',
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
  footerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -60,
    paddingBottom: 120,
  },
  footerHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  linkColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkColumn: {
    flex: 1,
    marginRight: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  footerNote: {
    marginTop: 16,
    fontSize: 12,
    color: '#777',
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  whatsappIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  noAppointmentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noAppointmentImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  noAppointmentText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
