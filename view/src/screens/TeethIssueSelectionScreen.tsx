/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
// screens/TeethIssueSelectionScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const TEETH_ISSUES = [
  {
    id: 'crooked',
    label: 'Crooked teeth',
    image: require('../../assets/images/videoposter.png'),
  },
  {
    id: 'forward',
    label: 'Forwardly placed',
    image: require('../../assets/images/videoposter2.png'),
  },
  {
    id: 'crossbite',
    label: 'Crossbite',
    image: require('../../assets/images/videoposter3.png'),
  },
  {
    id: 'other1',
    label: 'Other 1',
    image: require('../../assets/images/videoposter4.png'),
  },
  {
    id: 'other2',
    label: 'Other 2',
    image: require('../../assets/images/videoposter5.png'),
  },
  {
    id: 'other3',
    label: 'Other 3',
    image: require('../../assets/images/videoposter6.png'),
  },
];

export default function TeethIssueSelectionScreen({ navigation }: any) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const handleNext = () => {
    navigation.navigate('ProblemDetail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Which teeth issue is bothering you?</Text>
      <Text style={styles.subText}>
        Help us understand your case better to guide you on this journey.
      </Text>

      <FlatList
        data={TEETH_ISSUES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedIssue === item.id && styles.cardSelected,
            ]}
            onPress={() => setSelectedIssue(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.knowMore}>know more</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>

        <View style={styles.progressContent}>
          <View>
            <Text style={styles.progressSmallText}>You're almost done</Text>
            <Text style={styles.progressTitle}>Few steps</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.nextButtonAlt,
              !selectedIssue && styles.nextButtonDisabled,
            ]}
            disabled={!selectedIssue}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonTextAlt}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subText: { color: '#555', marginBottom: 16 },
  grid: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: '#D43F3F',
    backgroundColor: '#FFF5F5',
  },
  cardText: { fontWeight: '600', marginVertical: 6 },
  knowMore: { color: 'red', fontSize: 12 },
  image: { width: 80, height: 120, resizeMode: 'contain' },

  // Bottom Progress UI
  progressSection: {
    marginTop: 'auto',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#e0f0f7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    width: '25%',
    height: 4,
    backgroundColor: '#3EC6FF',
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressSmallText: {
    color: '#6c757d',
    fontSize: 12,
  },
  progressTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  nextButtonAlt: {
    backgroundColor: '#D43F3F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonTextAlt: {
    color: '#fff',
    fontWeight: '600',
  },
});
