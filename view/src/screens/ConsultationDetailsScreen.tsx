/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function ConsultationDetailsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🎥 Video Consultation</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>upcoming</Text>
        </View>

        <Text style={styles.concern}>
          Concern:{' '}
          <Text style={{ fontWeight: 'bold' }}>laser hair removal</Text>
        </Text>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Details Submitted</Text>
            <TouchableOpacity>
              <Text style={styles.viewLink}>view</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.doctorRow}>
            <Image
              source={require('../../assets/images/doctor.png')} // use real image or placeholder
              style={styles.doctorImage}
            />
            <View>
              <Text style={styles.doctorName}>Dr. Jayasree</Text>
              <Text style={styles.doctorDesc}>Cosmetologist | 1 yrs exp</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Appointment details</Text>
            <TouchableOpacity>
              <Text style={styles.reschedule}>Reschedule</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentInfo}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.icon}
            />
            <Text style={styles.appointmentText}>16th May, Friday</Text>
          </View>

          <View style={styles.appointmentInfo}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.icon}
            />
            <Text style={styles.appointmentText}>1:20pm to 1:35pm</Text>
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            meeting link will be shared 2 mins prior to the appointment start
            time
          </Text>
        </View>

        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>
            please complete the pre-consultation patient details form for us to
            guide you properly
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>complete now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    paddingBottom: 120,
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#d1e7dd',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  statusText: {
    color: '#0f5132',
    fontSize: 12,
    fontWeight: '600',
  },
  concern: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
  },
  detailsBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
  },
  viewLink: {
    color: '#d43f3f',
    fontWeight: '600',
  },
  reschedule: {
    color: '#d43f3f',
    fontWeight: '600',
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  doctorDesc: {
    color: '#6c757d',
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  appointmentText: {
    fontSize: 14,
    color: '#333',
  },
  noticeBox: {
    backgroundColor: '#e7f3ff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  noticeText: {
    textAlign: 'center',
    color: '#003366',
    fontSize: 13,
  },
  ctaBox: {
    backgroundColor: '#ffe5e5',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    textAlign: 'center',
    color: '#7a0000',
    marginBottom: 12,
    fontSize: 14,
  },
  ctaButton: {
    borderWidth: 1,
    borderColor: '#d43f3f',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  ctaButtonText: {
    color: '#d43f3f',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
