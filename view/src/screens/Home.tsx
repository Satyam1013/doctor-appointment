/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ScrollView, StyleSheet, View } from 'react-native';
import Carousel from '../components/Carousel';
import ServiceCards from '../components/ServiceCards';
import FindTeethType from '../components/FindTeethType';
import TopProducts from '../components/TopProducts';
import MydentCenters from '../components/MydentCenters';
import Transformation from '../components/Transformation';
import BeforeAfterTreatment from '../components/Treatment';
import React from 'react';
import ClinicVisitCard from '../components/VisitClinic';
import FeaturedIn from '../components/FeaturedIn';
import FeatureStats from '../components/FeatureStats';
import DoctorCard from '../components/ConsultDoctors';
import Blogs from '../components/Blogs';

export default function HomeScreen({ navigation }: any) {
  const topCarousel = [
    { uri: 'https://i.ibb.co/x88xsysH/banner.png' },
    { uri: 'https://i.ibb.co/JWgXbwRD/ad.png' },
    { uri: 'https://i.ibb.co/1f0q1t54/banner3.png' },
  ];
  const bottomCarousel = [
    { uri: 'https://i.ibb.co/vCsV1v7m/adbottom.jpg' },
    { uri: 'https://i.ibb.co/hRzqDXng/adbottom2.png' },
    { uri: 'https://i.ibb.co/TMtXpC68/adbottom3.png' },
  ];

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
});
