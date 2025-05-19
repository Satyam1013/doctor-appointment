import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const categories = [
  { title: 'Under bite', icon: 'https: //i.ibb.co/Y70w2CK3/video.png' },
  { title: 'Open bite', icon: 'https://i.ibb.co/pGJyFZL/video2.png' },
  { title: 'Crooked teeth', icon: 'https://i.ibb.co/RTLKPd3q/video3.png' },
  { title: 'Gap teeth', icon: 'https://i.ibb.co/5gNP6fPv/video4.png' },
  {
    title: 'Deep bite',
    icon: 'https://i.ibb.co/nqzMPZ0m/video5.png',
  },
  {
    title: 'Cross bite',
    icon: 'https://i.ibb.co/3y09DJbX/video6.png',
  },
  {
    title: 'Forwardly placed teeth',
    icon: 'https://i.ibb.co/W4564g62/video7.png',
  },
  {
    title: 'Teeth Spacings',
    icon: 'https://i.ibb.co/nscrGgch/video8.png',
  },
  { title: 'Jaw correction', icon: 'https://i.ibb.co/1YW48x0v/video9.png' },
];

export default function FindTeethTypeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for medicines and doctors"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartText}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Image (Carousel dummy) */}
      <Image
        source={{ uri: 'https://i.ibb.co/x88xsysH/banner.png' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        Ayurvedic Doctors By Health Issues
      </Text>

      {/* Grid */}
      <View style={styles.grid}>
        {categories.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.card}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.label}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 12 },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  cartButton: {
    marginLeft: 8,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  cartText: { fontSize: 18 },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
  },
});
