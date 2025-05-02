/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const products = [
  { img: require('../../assets/images/top.jpg') },
  { img: require('../../assets/images/top2.jpg') },
  { img: require('../../assets/images/top3.jpg') },
];

export default function Transformation({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Transformation Blogs</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransformationScreen')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {products.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() =>
              navigation.navigate('TransformationBlogDetailsScreen', {
                blog: item,
              })
            }
          >
            <Image source={item.img} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  viewAll: { color: '#1e90ff' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: 140, // Wider card for tall images
    aspectRatio: 0.8, // Match image proportion (1024/1280 ~ 0.8)
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
