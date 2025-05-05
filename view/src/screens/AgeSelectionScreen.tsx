/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const AGE_OPTIONS = [
  'below 10 yrs',
  '10–17 yrs',
  '18–21 yrs',
  '22–25 yrs',
  '26–35 yrs',
  '36–40 yrs',
  '41–54 yrs',
  'above 55 yrs',
];

export default function AgeSelectionScreen({ navigation }: any) {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleNext = () => {
    navigation.navigate('TeethIssueSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please select your age</Text>
      <Text style={styles.subText}>
        This is to check if aligners are suitable for your age
      </Text>

      <FlatList
        data={AGE_OPTIONS}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedAge === item && styles.optionSelected,
            ]}
            onPress={() => setSelectedAge(item)}
          >
            <Text
              style={[
                styles.optionText,
                selectedAge === item && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
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
            <Text style={styles.progressSmallText}>Book your scan in just</Text>
            <Text style={styles.progressTitle}>Few steps</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.nextButtonAlt,
              !selectedAge && styles.nextButtonDisabled,
            ]}
            disabled={!selectedAge}
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
  container: { flex: 1, backgroundColor: '#F1F8FC', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subText: { color: '#555', marginBottom: 16 },
  grid: { justifyContent: 'space-between' },

  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionSelected: {
    backgroundColor: '#D43F3F',
    borderColor: '#D43F3F',
  },
  optionText: { color: '#333' },
  optionTextSelected: { color: '#fff', fontWeight: 'bold' },

  // Bottom Progress Section
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
    width: '12.5%',
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
