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
  { img: require('../../assets/images/top4.jpg') },
  { img: require('../../assets/images/top5.jpg') },
  { img: require('../../assets/images/top6.png') },
  { img: require('../../assets/images/top7.jpg') },
  { img: require('../../assets/images/top8.png') },
  { img: require('../../assets/images/top9.jpg') },
  { img: require('../../assets/images/top10.jpg') },
  { img: require('../../assets/images/top11.jpg') },
  { img: require('../../assets/images/top12.jpg') },
  { img: require('../../assets/images/top13.jpg') },
  { img: require('../../assets/images/top14.jpg') },
  { img: require('../../assets/images/top15.jpg') },
  { img: require('../../assets/images/top16.png') },
  { img: require('../../assets/images/top17.jpg') },
  { img: require('../../assets/images/top18.jpg') },
  { img: require('../../assets/images/top19.jpg') },
  { img: require('../../assets/images/top20.jpg') },
];

export default function TransformationScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Top Transformation Blogs</Text>

      <View style={styles.grid}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 12 },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 0.8,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
