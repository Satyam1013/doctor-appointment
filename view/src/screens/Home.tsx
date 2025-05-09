/* eslint-disable @typescript-eslint/no-require-imports */
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

export default function HomeScreen({ navigation }: any) {
  const topCarousel = [
    require('../../assets/images/banner.png'),
    require('../../assets/images/banner2.png'),
    require('../../assets/images/banner3.png'),
  ];
  const bottomCarousel = [
    require('../../assets/images/adbottom.jpeg'),
    require('../../assets/images/adbottom2.png'),
    require('../../assets/images/adbottom3.png'),
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel images={topCarousel} />
        <ServiceCards navigation={navigation} />
        <FindTeethType navigation={navigation} />
        <TopProducts navigation={navigation} />
        <MydentCenters navigation={navigation} />
        <Transformation navigation={navigation} />
        <BeforeAfterTreatment />
        <ClinicVisitCard onPress={() => navigation.navigate('ClinicMap')} />
        <Carousel images={bottomCarousel} />
        <DoctorCard />
        <FeaturedIn />
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
});
