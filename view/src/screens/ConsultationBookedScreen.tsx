/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function ConsultationBookedScreen({ navigation, route }: any) {
  const { slotDate = 'Fri 16 May 25', slotTime = '1:20 PM to 1:35 PM' } =
    route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>your video-consultation is booked!</Text>

        <Text style={styles.description}>
          For a doctor to be better prepared for the session, we need you to
          fill an easy pre-consultation form. It is mandatory to complete this
          form before the session.
        </Text>

        <View style={styles.appointmentBox}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.iconSmall}
            />
            <Text style={styles.slotText}>{slotDate}</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.iconSmall}
            />
            <Text style={styles.slotText}>{slotTime}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('ConsultationDetailsScreen')}
        >
          <Text style={styles.detailsButtonText}>consultation details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    color: '#222',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  appointmentBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconSmall: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  slotText: {
    fontSize: 15,
    color: '#333',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#d43f3f',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  detailsButtonText: {
    color: '#d43f3f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
