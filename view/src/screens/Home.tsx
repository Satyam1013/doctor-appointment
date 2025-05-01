/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import ServiceCards from '../components/ServiceCards';
import DoctorSpecialties from '../components/DoctorSpecialtiesScreen';
import TopDoctors from '../components/TopDoctorsScreen';
import ShopByCategory from '../components/ShopByCategory';
import Medicines from '../components/MedicinesScreen';
import BeforeAfterTreatment from '../components/Treatment';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <Carousel />
      <ServiceCards />
      <DoctorSpecialties navigation={navigation} />
      <TopDoctors navigation={navigation} />
      <ShopByCategory navigation={navigation} />
      <Medicines navigation={navigation} />
      <BeforeAfterTreatment navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
