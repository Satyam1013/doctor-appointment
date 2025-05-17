/* eslint-disable prettier/prettier */
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
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { addToCart } from '../api/cart-api';

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

export default function ContactUsScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { user } = useUser();

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
      <View style={styles.welcomeSection}>
        <Text style={styles.helloText}>Hello, {user?.firstName}</Text>
        <Text style={styles.subText}>
          Start your journey of aligners with us
        </Text>
        <TouchableOpacity style={styles.coordinatorButton}>
          <Text style={styles.buttonText}>
            Reach out to your program co-ordinator
          </Text>
          <Text style={styles.timeText}>🕒 10am - 6pm</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Program Structure Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Program Structure</Text>
        {[
          {
            title: 'Orientation & Patient Information',
            sessions: '1 Live session',
          },
          { title: 'Gynaecologist Consultation', sessions: '4 Sessions' },
          { title: 'Nutritionist Consultation', sessions: '3 Sessions' },
          { title: 'Yoga & Meditation Consultation', sessions: '3 Sessions' },
          {
            title: 'Well being counselling & Monitoring',
            sessions: '3 Sessions',
          },
        ].map((item, index) => (
          <View key={index} style={styles.programItem}>
            <Ionicons
              name="ellipse"
              size={10}
              color="#00A67E"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.programText}>
              {item.title} -{' '}
              <Text style={styles.sessionText}>{item.sessions}</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* 3. Team of Experts & Schedule */}
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

      {/* 4. Product Section & FAQs */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Buy Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductsTab')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productRow}>
            {products.slice(0, 2).map((item) => (
              <View key={item._id} style={styles.productCard}>
                <Image
                  source={{ uri: item.icon }}
                  style={styles.productImage}
                />
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
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>FAQs</Text>
        {[
          'How is it different from other program?',
          'How long will it take to complete?',
          'How can I book a program?',
          'What will be the procedure?',
          'What benefit will I get?',
        ].map((faq, idx) => (
          <Text key={idx} style={styles.faqText}>
            • {faq}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fb',
    flex: 1,
    padding: 16,
    paddingBottom: 120,
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: '#00AEEF',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  welcomeSection: {
    backgroundColor: '#e5f8ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  helloText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00A67E',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginTop: 6,
  },
  coordinatorButton: {
    marginTop: 12,
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
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
    color: '#3b3b3b',
    marginBottom: 12,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
  },
  scheduleDate: {
    fontSize: 13,
    color: '#333',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A67E',
  },
  faqText: {
    fontSize: 15,
    color: '#444',
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#00AEEF',
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00A67E',
  },
});
