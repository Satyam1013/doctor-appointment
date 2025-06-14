import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions, StyleSheet, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const baseHeight = 60;
const curveWidth = 80;
const curveDepth = 50;

export default function CurvedTabBarBackground() {
  const insets = useSafeAreaInsets();
  const totalHeight = baseHeight + insets.bottom;

  const d = `
    M0,0
    H${(width - curveWidth) / 2}
    Q${width / 2},${curveDepth} ${(width + curveWidth) / 2},0
    H${width}
    V${totalHeight}
    H0
    Z
  `;

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      <Svg width={width} height={totalHeight}>
        <Path fill="white" d={d} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        elevation: 10,
      },
    }),
  },
});
