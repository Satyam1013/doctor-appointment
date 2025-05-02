/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function TransformationBlogDetailsScreen({ route }: any) {
  const { blog } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={blog.img} style={styles.image} resizeMode="cover" />

      <View style={styles.details}>
        <Text>
          For over 8 years, I struggled with severe lower back pain. Simple
          tasks like standing for long periods or sitting at a desk became
          unbearable. I tried physiotherapy, painkillers, and various modern
          treatments but the relief was always temporary. After much research, I
          consulted with an Ayurvedic doctor who designed a customized
          Panchakarma therapy along with herbal supplements. The therapy not
          only helped relieve my pain but also strengthened my muscles and
          improved my posture. Within 4 months, I saw incredible improvement — I
          could walk longer, stand comfortably, and even resume yoga, which I
          had given up years ago. Today, I am pain-free and grateful for the
          natural healing powers of Ayurveda. If you suffer from chronic back
          pain, I highly recommend exploring Ayurvedic treatments for
          long-lasting relief.`,
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 450 },
  details: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  content: { fontSize: 16, lineHeight: 24, color: '#333' },
});
