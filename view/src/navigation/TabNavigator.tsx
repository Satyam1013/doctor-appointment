import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurvedTabBarBackground from '../components/CurvedTabBarBackground';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { withAppShell } from '../utils/AppShellWrapper';

// Screens
import HomeScreen from '../screens/Home';
import Centers from '../screens/CentersScreen';
import EComScreen from '../screens/ECommerceScreen';
import ContactUsScreen from '../screens/ContactUsScreen';

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
        name="Home"
        component={withAppShell(HomeScreen)}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Mydent"
        component={withAppShell(HomeScreen)}
        options={{
          tabBarLabel: 'Mydent',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medal" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Centers"
        component={withAppShell(Centers)}
        options={{
          tabBarLabel: 'Centers',
          tabBarIcon: ({ color, size }) => (
            <View style={{ marginTop: 10 }}>
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
        name="Products"
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
        name="Contact Us"
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
