/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import Carousel from '../components/Carousel';
import ServiceCards from '../components/ServiceCards';
import FindBiteType from '../components/FindBiteType';
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
import TeethAlignmentProblems from '../components/TeethAlignmentProblems';
import { AuthContext } from '../contexts/AuthContext';

type CarouselItem = {
  uri: string;
  type: string;
  group: string;
  navigateTo: string;
};

export default function HomeScreen({ navigation }: any) {
  const { token } = useContext(AuthContext);
  const [topCarousel, setTopCarousel] = useState<CarouselItem[]>([]);
  const [bottomCarousel, setBottomCarousel] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
      return;
    }

    const fetchCarousels = async () => {
      try {
        const res = await getCarousels();

        // You can define navigation target per image here
        setTopCarousel(
          res.data.home.topCarousel.map((img: any, index: number) => ({
            uri: img.imageUrl,
            type: img.type,
            group: 'home',
            navigateTo:
              index === 0
                ? 'ConsultationOption'
                : index === 1
                  ? 'MydentCenters'
                  : index === 2
                    ? 'FindBiteType'
                    : 'DefaultScreen',
          })),
        );

        setBottomCarousel(
          res.data.home.bottomCarousel.map((img: any, index: number) => ({
            uri: img.imageUrl,
            type: img.type,
            group: 'home',
            navigateTo:
              index === 0
                ? 'Blogs'
                : index === 1
                  ? 'DoctorProfile'
                  : 'DefaultScreen',
          })),
        );
      } catch (error) {
        console.error('Failed to load carousels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, [token]);

  if (!token) return null;

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
        <FindBiteType navigation={navigation} />
        <TopProducts navigation={navigation} />
        <MydentCenters navigation={navigation} />
        <TeethAlignmentProblems navigation={navigation} />
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
    paddingBottom: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
