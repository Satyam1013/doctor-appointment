import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthContext';

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to Home Screen!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
