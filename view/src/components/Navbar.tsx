import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import {
  useNavigation,
  NavigationProp,
  DrawerActions,
} from '@react-navigation/native';
import { Menu } from 'react-native-paper';

export default function Navbar() {
  const { user } = useUser();
  const navigation = useNavigation<NavigationProp<any>>();
  const { logout } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleProfile = () => {
    closeMenu();
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
    <View style={styles.navbarWrapper}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.firstName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ClinicMap')}>
            <Text style={styles.location}>Add location ▼</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.icons, styles.menuWrapper]}>
          <Ionicons
            name="heart-outline"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => navigation.navigate('FavProductScreen')}
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
              <TouchableOpacity onPress={openMenu} style={{ zIndex: 9999 }}>
                <Ionicons name="person-circle-outline" size={26} color="#333" />
              </TouchableOpacity>
            }
            contentStyle={{ backgroundColor: 'white', marginTop: 6 }}
            anchorPosition="bottom"
          >
            <Menu.Item onPress={handleProfile} title="My Profile" />
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </View>
      </View>

      {/* Filter and Cart Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color="#00BCD4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Ionicons name="cart-outline" size={22} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Banner Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://i.ibb.co/vx6zzjFK/mydent-removebg-preview.png',
          }}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarWrapper: {
    backgroundColor: '#E9F9FA',
    zIndex: 1000,
    elevation: 10,
  },
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
  menuWrapper: {
    zIndex: 1000,
    elevation: 10,
  },
  icon: {
    marginHorizontal: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 6,
  },
  imageContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    alignItems: 'center',
    zIndex: -1,
  },

  logoImage: {
    width: 180,
    height: undefined,
    aspectRatio: 1080 / 289,
    borderRadius: 10,
    opacity: 0.95, // optional
  },
});
