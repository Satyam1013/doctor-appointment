import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurvedTabBarBackground from '../components/CurvedTabBarBackground';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Centers from '../screens/CentersScreen';
import EComScreen from '../screens/ECommerceScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import HomeStack from './HomeStack';
import TreatmentInfoScreen from '../screens/TreatmentInfo';
import { withAppShell } from '../utils/AppShellWrapper';
import ProductDetailScreen from '../screens/ProductDetailScreen';

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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
        component={withAppShell(TreatmentInfoScreen)}
        options={{
          tabBarLabel: 'Mydent',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medal" color={color} size={size} />
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
          tabBarIcon: ({ color, size }) => (
            <View style={{ marginTop: 35 }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={size}
              />
            </View>
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
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color={color}
              size={size}
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
        component={withAppShell(ContactUsScreen)}
        options={{
          tabBarLabel: 'Contact Us',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
