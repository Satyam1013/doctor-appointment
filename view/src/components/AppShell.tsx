import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import OverlayFloatingButtons from './FloatingButtons';

export default function AppShell({ children }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.navbarWrapper}>
        <Navbar />
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.bottomTabWrapper}>
        <OverlayFloatingButtons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbarWrapper: {
    height: 100,
  },
  content: {
    flex: 1,
    paddingBottom: 4,
  },
  bottomTabWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
