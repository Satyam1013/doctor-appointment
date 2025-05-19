/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import { RouteProp, useRoute } from '@react-navigation/native';
import FeatureStats from '../components/FeatureStats';

type RootStackParamList = {
  Centers: { selectedCity?: string };
  MydentCenters: undefined;
};

type CentersRouteProp = RouteProp<RootStackParamList, 'Centers'>;

const clinics = [
  {
    id: 1,
    city: 'Mumbai',
    name: 'Mumbai - Kharghar',
    image: 'https://i.ibb.co/PsMJw9bB/1.png',
    address:
      'No 23, Shree Krishna Paradise, Utsav Chowk, Sector 12, Kharghar, Navi Mumbai 410210',
    time: 'Mon - Sun : 8:00 AM - 8:00 PM',
    phone: '8422858004',
  },
  {
    id: 2,
    city: 'Bengaluru',
    name: 'Bengaluru - Indiranagar',
    image: 'https://i.ibb.co/pBXnQNXm/1.png',
    address: '12, 1st Cross, Indiranagar, Bangalore 560038',
    time: 'Mon - Sat : 9:00 AM - 6:00 PM',
    phone: '9876543210',
  },
];

const cities = [
  'All',
  'Ahmedabad',
  'Bengaluru',
  'Chennai',
  'Delhi',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Lucknow',
  'Mumbai',
  'Pune',
];

const bottomCarousel = [
  { uri: 'https://i.ibb.co/vCsV1v7m/adbottom.jpg' },
  { uri: 'https://i.ibb.co/hRzqDXng/adbottom2.png' },
  { uri: 'https://i.ibb.co/TMtXpC68/adbottom3.png' },
];

const services = [
  {
    id: 1,
    title: 'Laser toning for pigmentation',
    description:
      'Reduce skin pigmentation with 4 sessions package at just ₹15000/-',
    image: require('../../assets/images/features.png'),
  },
  {
    id: 2,
    title: 'Hydrafacial',
    description: 'Get intense skin hydration and glow at ₹8000/-',
    image: require('../../assets/images/features2.png'),
  },
];

export default function Centers() {
  const route = useRoute<CentersRouteProp>();
  const [selectedCity, setSelectedCity] = useState('All');

  useEffect(() => {
    if (route.params && route.params.selectedCity) {
      setSelectedCity(route.params.selectedCity);
    }
  }, [route.params]);

  const filteredClinics =
    selectedCity === 'All'
      ? clinics
      : clinics.filter((clinic) => clinic.city === selectedCity);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Carousel images={bottomCarousel} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Discover your nearest mydent experience centre
        </Text>
        <Text style={styles.headerSubtitle}>
          Transform your smile, skin & hair with our expert orthodontists and
          dermats
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cityTabs}
      >
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => setSelectedCity(city)}
            style={[
              styles.cityButton,
              selectedCity === city && styles.activeCityButton,
            ]}
          >
            <Text
              style={[
                styles.cityButtonText,
                selectedCity === city && styles.activeCityButtonText,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ padding: 16 }}>
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <View key={clinic.id} style={styles.card}>
              <Image source={clinic.image} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{clinic.name}</Text>

                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    color="#ff4d4d"
                    size={18}
                  />
                  <Text style={styles.address}>{clinic.address}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="clock"
                    color="#ff4d4d"
                    size={18}
                  />
                  <Text style={styles.time}>{clinic.time}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="phone"
                    color="#ff4d4d"
                    size={18}
                  />
                  <Text
                    style={styles.phone}
                    onPress={() => Linking.openURL(`tel:${clinic.phone}`)}
                  >
                    {clinic.phone}
                  </Text>
                </View>

                <TouchableOpacity style={styles.directionButton}>
                  <MaterialCommunityIcons name="map" color="#fff" size={18} />
                  <Text style={styles.directionText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ padding: 16, color: '#888' }}>
            No clinics available in this city.
          </Text>
        )}
      </View>

      {/* Services Section */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Text style={styles.servicesTitle}>
          Services available at our centre
        </Text>
        <Text style={styles.servicesSubtitle}>Exclusive discounts</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <FeatureStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  cityTabs: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  cityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 20,
  },
  activeCityButton: {
    backgroundColor: '#ff4d4d',
  },
  cityButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeCityButtonText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  address: {
    marginLeft: 6,
    flex: 1,
    color: '#555',
    fontSize: 14,
  },
  time: {
    marginLeft: 6,
    color: '#555',
    fontSize: 14,
  },
  phone: {
    marginLeft: 6,
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  directionText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  servicesSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  serviceCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
});
