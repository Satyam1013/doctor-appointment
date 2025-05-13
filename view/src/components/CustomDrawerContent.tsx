/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import EditProfileForm from './EditUserDetails';

export default function CustomDrawerContent(props: any) {
  const { user } = useUser();
  const [isEditVisible, setEditVisible] = useState(false);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/consultant.jpg')}
          style={styles.avatar}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{user?.firstName ?? 'John Doe'}</Text>
          <Text style={styles.email}>{user?.email ?? 'email@example.com'}</Text>
          <TouchableOpacity
            onPress={() => setEditVisible(true)}
            style={styles.editButton}
          >
            <Ionicons name="create-outline" size={16} color="#007AFF" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuItems}>
        <DrawerItem
          label="Home"
          onPress={() =>
            props.navigation.navigate('HomeTabs', { screen: 'HomeTab' })
          }
          icon={({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Book Consultation"
          onPress={() =>
            props.navigation.navigate('HomeTabs', {
              screen: 'HomeTab',
              params: {
                screen: 'ConsultationOption',
              },
            })
          }
          icon={({ color, size }) => (
            <Ionicons name="book-sharp" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Buy Products"
          onPress={() =>
            props.navigation.navigate('HomeTabs', { screen: 'ProductsTab' })
          }
          icon={({ color, size }) => (
            <Ionicons name="bag-add" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Mydent Centers"
          onPress={() =>
            props.navigation.navigate('HomeTabs', { screen: 'CentersTab' })
          }
          icon={({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Contact Us"
          onPress={() =>
            props.navigation.navigate('HomeTabs', { screen: 'ContactUsTab' })
          }
          icon={({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          )}
        />
      </View>

      {/* Edit Modal */}
      <Modal visible={isEditVisible} animationType="slide">
        <EditProfileForm onClose={() => setEditVisible(false)} />
      </Modal>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  profileTextContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  editText: {
    color: '#007AFF',
    marginLeft: 4,
    fontSize: 14,
  },
  menuItems: {
    marginTop: 8,
  },
});
