/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { useUser } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import {
  useNavigation,
  NavigationProp,
  DrawerActions,
} from '@react-navigation/native';

export default function Navbar() {
  const { user } = useUser();
  const navigation = useNavigation<NavigationProp<any>>();
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
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
        <View style={styles.searchRow}>
          {/* Filter Icon */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#00BCD4"
            />
          </TouchableOpacity>

          {/* Search Input Box */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color="#777"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search for medicines and..."
              style={styles.input}
              placeholderTextColor="#777"
            />
            <Ionicons name="mic-outline" size={18} color="#777" />
          </View>

          {/* Cart Icon */}
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={22} color="#4CAF50" />
          </TouchableOpacity>
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
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 16,
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    height: 40,
    marginHorizontal: 6,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 14,
    color: '#000',
  },
  cartButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 6,
  },
});
