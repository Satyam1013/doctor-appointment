/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={64} color="#333" />
        <Text style={styles.username}>Welcome!</Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('HomeTabs')}
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Contact Us"
        onPress={() => props.navigation.navigate('Contact Us')}
        icon={({ color, size }) => (
          <Ionicons name="call-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  username: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
