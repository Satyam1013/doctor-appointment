/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getLatestBlogs } from '../api/blogs-api';

export default function ShowAllBlogsScreen({ navigation }: any) {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getLatestBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>All Blogs</Text>
      {blogs.map((blog) => (
        <TouchableOpacity
          key={blog._id}
          style={styles.card}
          onPress={() => navigation.navigate('BlogScreen', { blog })}
        >
          <Image source={{ uri: blog.images[0] }} style={styles.image} />
          <Text style={styles.title}>{blog.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 120,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#e53935',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    padding: 8,
    color: '#333',
    fontWeight: '500',
  },
});
