/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import ServiceCards from '../components/ServiceCards';
import DoctorSpecialties from '../components/DoctorSpecialtiesScreen';
import TopDoctors from '../components/TopDoctors';
import ShopByCategory from '../components/ShopByCategory';
import Transformation from '../components/Transformation';
import BeforeAfterTreatment from '../components/Treatment';
import MapPicker from '../components/MapPicker';
import { Platform } from 'react-native';

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
      <Transformation navigation={navigation} />
      <BeforeAfterTreatment />
      {Platform.OS !== 'web' && <MapPicker />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
