/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const options = ['Yes', 'No'];

export default function SmokingStatusScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    navigation.navigate('Availability');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Do you smoke?</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              selected === option && styles.optionBoxSelected,
            ]}
            onPress={() => setSelected(option)}
          >
            <View style={styles.radioCircle}>
              {selected === option && <View style={styles.selectedDot} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.stepText}>few more steps to go</Text>
        <Text style={styles.stepCounter}>6 / 8 steps</Text>

        <TouchableOpacity
          style={[styles.nextButton, !selected && { opacity: 0.5 }]}
          disabled={!selected}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 110,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionBox: {
    width: '45%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBoxSelected: {
    borderColor: '#D43F3F',
    backgroundColor: '#fff2f2',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D43F3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D43F3F',
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  stepText: {
    color: '#6c757d',
    fontSize: 14,
  },
  stepCounter: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
  },
  nextButton: {
    backgroundColor: '#D43F3F',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
