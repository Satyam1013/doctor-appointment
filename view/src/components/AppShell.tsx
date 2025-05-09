/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// AppShell.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import BottomTabNavigator from '../navigation/TabNavigator';
import OverlayFloatingButtons from './FloatingButtons';

export default function AppShell({ children, navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.navbarWrapper}>
        <Navbar navigation={navigation} />
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.bottomTabWrapper}>
        {/* <BottomTabNavigator /> */}
        <OverlayFloatingButtons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbarWrapper: {
    height: 100, // Adjust the height of your Navbar if needed
  },
  content: {
    flex: 1,
    paddingBottom: 60, // Add padding to the bottom to avoid overlapping with the TabBar
  },
  bottomTabWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Ensure it's always on top of other elements
  },
});
