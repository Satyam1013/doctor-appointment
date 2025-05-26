/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import Carousel from '../components/Carousel';
import ServiceCards from '../components/ServiceCards';
import FindTeethType from '../components/FindTeethType';
import TopProducts from '../components/TopProducts';
import MydentCenters from '../components/MydentCenters';
import Transformation from '../components/Transformation';
import BeforeAfterTreatment from '../components/Treatment';
import ClinicVisitCard from '../components/VisitClinic';
import FeaturedIn from '../components/FeaturedIn';
import FeatureStats from '../components/FeatureStats';
import DoctorCard from '../components/ConsultDoctors';
import Blogs from '../components/Blogs';
import { getCarousels } from '../api/carousel-api';

export default function HomeScreen({ navigation }: any) {
  const [topCarousel, setTopCarousel] = useState<{ uri: string }[]>([]);
  const [bottomCarousel, setBottomCarousel] = useState<{ uri: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();
        setTopCarousel(
          res.data.topCarousel.map((img: any) => ({ uri: img.imageUrl })),
        );
        setBottomCarousel(
          res.data.bottomCarousel.map((img: any) => ({ uri: img.imageUrl })),
        );
      } catch (error) {
        console.error('Failed to load carousels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Carousel images={topCarousel} />
        <ServiceCards navigation={navigation} />
        <FindTeethType navigation={navigation} />
        <TopProducts navigation={navigation} />
        <MydentCenters navigation={navigation} />
        <Transformation navigation={navigation} />
        <BeforeAfterTreatment />
        <ClinicVisitCard onPress={() => navigation.navigate('CentersTab')} />
        <Carousel images={bottomCarousel} />
        <DoctorCard />
        <FeaturedIn />
        <Blogs navigation={navigation} />
        <FeatureStats />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
