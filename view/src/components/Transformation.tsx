/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getAllBlogs } from '../api/blogs-api';

export default function Transformation({ navigation }: any) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Transformations</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransformationScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionSubtitle}>
        Tips & info about your smile journey
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e53935" />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollRow}
        >
          {blogs.slice(0, 4).map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              onPress={() =>
                navigation.navigate('TransformationBlogDetailsScreen', {
                  blog: item,
                })
              }
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    marginBottom: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  viewAll: {
    fontSize: 13,
    color: '#1e90ff',
    fontWeight: '500',
  },
  scrollRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  card: {
    width: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 220,
  },
  cardFooter: {
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
});
