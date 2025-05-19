/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Centers from '../screens/CentersScreen';
import EComScreen from '../screens/ECommerceScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import HomeStack from './HomeStack';
import { withAppShell } from '../utils/AppShellWrapper';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CurvedTabBarBackground from '../components/CurvedTabBarBackground';
import MyDentAlignersScreen from '../screens/MydentAligners';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          bottom: 0,
        },
        headerShown: false,
        tabBarBackground: () => <CurvedTabBarBackground />,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/bottomtab/home.jpeg')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#0077b6' : '#ccc',
                borderRadius: 8,
                padding: 4,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={withAppShell(ProductDetailScreen)}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Mydent"
        component={withAppShell(MyDentAlignersScreen)}
        options={{
          tabBarLabel: 'Mydent',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/bottomtab/mydent.jpeg')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#0077b6' : '#ccc',
                borderRadius: 8,
                padding: 4,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Haha"
        component={withAppShell(ProductDetailScreen)}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="CentersTab"
        component={withAppShell(Centers)}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/bottomtab/centers.jpeg')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#0077b6' : '#ccc',
                borderRadius: 8,
                padding: 4,
                marginTop: 40,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Lol"
        component={withAppShell(ProductDetailScreen)}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ProductsTab"
        component={withAppShell(EComScreen)}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/bottomtab/shop.jpeg')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#0077b6' : '#ccc',
                borderRadius: 8,
                padding: 4,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductDetailScreen"
        component={withAppShell(ProductDetailScreen)}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ContactUsTab"
        component={ContactUsScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/bottomtab/contact.jpeg')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                borderWidth: focused ? 2 : 1,
                borderColor: focused ? '#0077b6' : '#ccc',
                borderRadius: 8,
                padding: 4,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
