/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { useUser } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar({ navigation }: any) {
  const { user } = useUser();
  const { logout } = useContext(AuthContext);

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
      <View>
        {/* Header Section */}
        <View style={styles.headerContainer}>
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
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Ionicons
                    name="person-circle-outline"
                    size={26}
                    color="#333"
                  />
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

        {/* Search Bar Section */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for medicines and..."
            style={styles.input}
          />
          <Ionicons name="cart-outline" size={24} color="#333" />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4, // reduced bottom padding
  },
  greeting: {
    fontSize: 16, // slightly smaller
    fontWeight: '600',
  },
  location: {
    fontSize: 11,
    color: '#1e90ff',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 8,
    paddingHorizontal: 8,
    height: 40, // limit height of search bar
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 14,
  },
});
