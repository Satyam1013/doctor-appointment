import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hi, {user?.firstName}</Text>
        <Text style={styles.location}>Add location ▼</Text>
      </View>

      <View style={styles.icons}>
        <Ionicons
          name="heart-outline"
          size={22}
          color="#333"
          style={styles.icon}
        />
        <Ionicons
          name="notifications-outline"
          size={22}
          color="#333"
          style={styles.icon}
        />
        <Ionicons name="person-circle-outline" size={26} color="#333" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  greeting: { fontSize: 16, fontWeight: '600' },
  location: { fontSize: 12, color: '#1e90ff' },
  icons: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginHorizontal: 6 },
});
