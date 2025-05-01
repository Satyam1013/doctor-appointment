import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Icon
        name="search-outline"
        size={20}
        color="#777"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search for medicines and..."
        style={styles.input}
      />
      <Icon name="cart-outline" size={24} color="#333" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 8,
  },
  searchIcon: { marginRight: 6 },
  input: { flex: 1, paddingVertical: 8 },
});
