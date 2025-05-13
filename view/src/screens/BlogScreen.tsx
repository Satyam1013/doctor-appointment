/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const BlogScreen = ({ route }: any) => {
  const { blog } = route.params || {};

  // Split content into paragraphs (you can adjust the split logic as per your content format)
  const paragraphs = blog.content.split('\n');

  // Create an array of content blocks, alternating between text and images
  const contentArray: { type: string; content: any }[] = [];
  let imageIndex = 0;

  paragraphs.forEach((paragraph: any, index: any) => {
    contentArray.push({ type: 'text', content: paragraph });

    // Add an image after every 2-3 paragraphs
    if (imageIndex < blog.images.length) {
      contentArray.push({ type: 'image', content: blog.images[imageIndex] });
      imageIndex++;
    }
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.date}>
          By {blog.author} | {blog.date}
        </Text>
        <Text style={styles.category}>{blog.category}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {contentArray.map((item, index) => (
          <View key={index} style={styles.contentItem}>
            {item.type === 'text' ? (
              <Text style={styles.contentText}>{item.content}</Text>
            ) : (
              <Image source={item.content} style={styles.image} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
  },
  category: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 8,
  },
  content: {
    marginBottom: 16,
  },
  contentItem: {
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default BlogScreen;
