/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { updateUser } from '../api/user-api';

export default function ProblemDetailScreen({ navigation }: any) {
  const [problemText, setProblemText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!problemText) return;

    try {
      setLoading(true);
      await updateUser({ problemText });
      navigation.navigate('MedicalHistory');
    } catch (error) {
      console.error('Failed to update problem text:', error);
      Alert.alert('Error', 'Something went wrong while saving your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Describe Your Problem in Detail</Text>
      <Text style={styles.subText}>
        Sharing your concerns helps our doctors understand your case better and
        offer the most effective guidance.
      </Text>

      <TextInput
        style={styles.textBox}
        placeholder="start typing here..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={6}
        value={problemText}
        onChangeText={setProblemText}
      />

      <View style={styles.footer}>
        <Text style={styles.stepText}>few more steps to go</Text>
        <Text style={styles.stepCounter}>3 / 8 steps</Text>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!problemText || loading) && { opacity: 0.5 },
          ]}
          disabled={!problemText || loading}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Saving...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 110,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  subText: {
    color: '#6c757d',
    marginBottom: 16,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
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
