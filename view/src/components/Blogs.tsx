/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { blogData } from '../constants/blogData';

export default function Blogs({ navigation }: any) {
  const handlePress = (blog: any) => {
    navigation.navigate('BlogScreen', { blog });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Latest Blogs</Text>
      <Text style={styles.sectionSubtitle}>
        Tips & info about your smile journey
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {blogData.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={styles.card}
            onPress={() => handlePress(blog)}
          >
            <Image source={{ uri: blog.images[0] }} style={styles.image} />
            <Text style={styles.title} numberOfLines={3}>
              {blog.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  scrollContainer: {
    paddingVertical: 4,
  },
  card: {
    width: 200,
    height: 180,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  title: {
    padding: 8,
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
});
