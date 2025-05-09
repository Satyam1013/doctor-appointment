import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const height = 60;
const curveWidth = 100;
const curveDepth = 20;

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
    <View style={StyleSheet.absoluteFill}>
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Path fill="white" d={d} />
      </Svg>
    </View>
  );
}
