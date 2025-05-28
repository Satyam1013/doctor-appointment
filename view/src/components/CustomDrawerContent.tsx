/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  const iconColor = '#4CAF50';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/zHHBvZ9Y/logoblue.jpg' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/35mrrKZh/consultant.jpg' }}
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
        {[
          { label: 'Home', icon: 'home-outline', screen: 'HomeTab' },
          {
            label: 'Book Consultation',
            icon: 'book-sharp',
            screen: 'ConsultationOption',
            parentTab: 'HomeTab',
          },
          { label: 'Buy Products', icon: 'bag-add', screen: 'ProductsTab' },
          {
            label: 'Mydent Centers',
            icon: 'business-outline',
            screen: 'CentersTab',
          },
          {
            label: 'My addresses',
            icon: 'location-outline',
            screen: 'CentersTab',
          },
          { label: 'Mydent coins', icon: 'cash-outline', screen: 'CentersTab' },
          {
            label: 'Refer a friend',
            icon: 'body-outline',
            screen: 'CentersTab',
          },
          { label: 'Rate us', icon: 'star-outline', screen: 'CentersTab' },
          { label: 'Help & Support', icon: 'help', screen: 'CentersTab' },
          { label: 'Contact Us', icon: 'call-outline', screen: 'ContactUsTab' },
        ].map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() =>
              props.navigation.navigate('HomeTabs', {
                screen: item.parentTab ?? item.screen,
                ...(item.parentTab && { params: { screen: item.screen } }),
              })
            }
            icon={({ size }) => (
              <Ionicons name={item.icon as any} size={size} color={iconColor} />
            )}
          />
        ))}
      </View>

      <View style={styles.bottomSection}>
        <DrawerItem
          label="New Ticket"
          onPress={() => props.navigation.navigate('NewTicket')}
          icon={({ size }) => (
            <Ionicons
              name="document-text-outline"
              size={size}
              color={iconColor}
            />
          )}
        />
        <DrawerItem
          label="View Ticket"
          onPress={() => props.navigation.navigate('ViewTicket')}
          icon={({ size }) => (
            <Ionicons name="clipboard-outline" size={size} color={iconColor} />
          )}
        />
        <DrawerItem
          label="Logout"
          onPress={() => {
            // handle logout
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={iconColor} />
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
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 100,
    paddingHorizontal: 10,
    marginTop: -50,
  },
  logo: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
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
  bottomSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 8,
    paddingBottom: 16,
  },
});
