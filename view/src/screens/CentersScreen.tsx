/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import FeatureStats from '../components/FeatureStats';
import { getCenters } from '../api/centers-api';
import { getCarousels } from '../api/carousel-api';

type RootStackParamList = {
  Centers: { selectedCity?: string };
  MydentCenters: undefined;
};

type CentersRouteProp = RouteProp<RootStackParamList, 'Centers'>;

const services = [
  {
    id: 1,
    title: 'Laser toning for pigmentation',
    description:
      'Reduce skin pigmentation with 4 sessions package at just ₹15000/-',
    image: 'https://i.ibb.co/zHHBvZ9Y/logoblue.jpg',
  },
  {
    id: 2,
    title: 'Hydrafacial',
    description: 'Get intense skin hydration and glow at ₹8000/-',
    image: 'https://i.ibb.co/zHHBvZ9Y/logoblue.jpg',
  },
];

export default function Centers() {
  const route = useRoute<CentersRouteProp>();
  const [selectedCity, setSelectedCity] = useState('All');
  const [centers, setCenters] = useState<
    { cityName: string; imageUrl: string; clinic: any[]; _id: string }[]
  >([]);
  const [bottomCarousel, setBottomCarousel] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    getCenters()
      .then((res) => {
        const fetchedCenters = res.data;
        const allOption = { cityName: 'All', imageUrl: '', clinic: [] };
        setCenters([allOption, ...fetchedCenters]);
      })
      .catch((err) => {
        console.error('Failed to fetch centers:', err);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const selected = route.params?.selectedCity;
      if (selected) {
        setSelectedCity(selected);
      }
    }, [route.params?.selectedCity]),
  );

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();

        setBottomCarousel(
          res.data.bottomCarousel.map((img: any) => ({ uri: img.imageUrl })),
        );
      } catch (error) {
        console.error('Failed to load carousels:', error);
      }
    };

    fetchCarousels();
  }, []);

  const filteredClinics =
    selectedCity === 'All'
      ? centers.flatMap((city) => city.clinic)
      : centers.find((city) => city.cityName === selectedCity)?.clinic || [];

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
        {centers.map((city) => (
          <TouchableOpacity
            key={city._id || city.cityName}
            onPress={() => setSelectedCity(city.cityName)}
            style={[
              styles.cityButton,
              selectedCity === city.cityName && styles.activeCityButton,
            ]}
          >
            <Text
              style={[
                styles.cityButtonText,
                selectedCity === city.cityName && styles.activeCityButtonText,
              ]}
            >
              {city.cityName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ padding: 16 }}>
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <View key={clinic._id || clinic.clinicName} style={styles.card}>
              <Image
                source={{ uri: clinic.clinicImage }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{clinic.clinicName}</Text>

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
                  <Text style={styles.time}>
                    {clinic.timeFrom} - {clinic.timeTo}
                  </Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="phone"
                    color="#ff4d4d"
                    size={18}
                  />
                  <Text
                    style={styles.phone}
                    onPress={() =>
                      Linking.openURL(`tel:${clinic.centerNumber}`)
                    }
                  >
                    {clinic.centerNumber}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => {
                    if (clinic.directions) {
                      Linking.openURL(clinic.directions);
                    } else {
                      Alert.alert('No directions link available');
                    }
                  }}
                >
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
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
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
