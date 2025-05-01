/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Image, StyleSheet, ScrollView } from 'react-native';

export default function Carousel() {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {[
        require('../../assets/images/logo.jpeg'),
        require('../../assets/images/logo.jpeg'),
      ].map((img, idx) => (
        <Image key={idx} source={img} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: 150, marginBottom: 12 },
  image: { width: 350, height: 150, borderRadius: 10, marginHorizontal: 6 },
});
