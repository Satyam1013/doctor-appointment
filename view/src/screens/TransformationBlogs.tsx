/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function TransformationBlogDetailsScreen({ route }: any) {
  const { blog } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{blog.title}</Text>
      <Image
        source={{ uri: blog.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.details}>
        <Text>{blog.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  image: { width: '100%', height: 550 },
  details: { paddingBottom: 170 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#e53935',
  },
  content: { fontSize: 16, lineHeight: 24, color: '#333' },
});
