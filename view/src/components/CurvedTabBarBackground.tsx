import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions, StyleSheet, View, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const height = 60;
const curveWidth = 80;
const curveDepth = 50;

export default function CurvedTabBarBackground() {
  const d = `
    M0,0
    H${(width - curveWidth) / 2}
    Q${width / 2},${curveDepth} ${(width + curveWidth) / 2},0
    H${width}
    V${height}
    H0
    Z
  `;

  return (
    <View style={[StyleSheet.absoluteFill, styles.shadowContainer]}>
      <Svg width={width} height={height} style={styles.svg}>
        <Path fill="white" d={d} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    ...Platform.select({
      android: {
        elevation: 10,
      },
    }),
  },
});
