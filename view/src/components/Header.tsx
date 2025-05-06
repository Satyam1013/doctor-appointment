/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { Menu, Provider } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function Header({ navigation }: any) {
  const { user } = useUser();
  const { logout } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleProfile = () => {
    closeMenu();
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    closeMenu();
    logout();
    navigation.replace('Login');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.firstName}</Text>
          <Text style={styles.location}>Add location ▼</Text>
        </View>

        <View style={styles.icons}>
          <Ionicons
            name="heart-outline"
            size={22}
            color="#333"
            style={styles.icon}
          />
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#333"
            style={styles.icon}
          />

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="person-circle-outline" size={26} color="#333" />
              </TouchableOpacity>
            }
            contentStyle={{ backgroundColor: 'white', marginTop: 6 }}
            anchorPosition="bottom"
          >
            <Menu.Item
              onPress={handleProfile}
              title="My Profile"
              titleStyle={{ color: '#000' }}
            />
            <Menu.Item
              onPress={handleLogout}
              title="Logout"
              titleStyle={{ color: '#000' }}
            />
          </Menu>
        </View>
      </View>
    </Provider>
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
