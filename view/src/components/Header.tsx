import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hi, User</Text>
        <Text style={styles.location}>Add location ▼</Text>
      </View>

      <View style={styles.icons}>
        <Icon name="heart-outline" size={22} color="#333" style={styles.icon} />
        <Icon
          name="notifications-outline"
          size={22}
          color="#333"
          style={styles.icon}
        />
        <Icon name="person-circle-outline" size={26} color="#333" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  greeting: { fontSize: 16, fontWeight: '600' },
  location: { fontSize: 12, color: '#1e90ff' },
  icons: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginHorizontal: 6 },
});
