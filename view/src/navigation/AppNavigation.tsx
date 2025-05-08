/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import TreatmentInfoScreen from '../screens/TreatmentInfo';
import FindTeethTypeScreen from '../screens/FindTeethTypeScreen';
import DoctorDetailsScreen from '../screens/TopDoctorsScreens';
import TransformationScreen from '../screens/TransformationScreen';
import TransformationBlogDetailsScreen from '../screens/TransformationBlogs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View } from 'react-native';
import ConsultationOptionScreen from '../screens/ConsultationOptionScreen';
import AgeSelectionScreen from '../screens/AgeSelectionScreen';
import TeethIssueSelectionScreen from '../screens/TeethIssueSelectionScreen';
import ProblemDetailScreen from '../screens/ProblemDetailScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import GenderSelectionScreen from '../screens/GenderSelectionScreen';
import SmokingStatusScreen from '../screens/SmokingStatusScreen';
import AvailabilityScreen from '../screens/AvailabilityScreen';
import CheckoutSummaryScreen from '../screens/CheckoutSummaryScreen';
import EComScreen from '../screens/ECommerceScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import TeethTreatmentScreen from '../screens/TeethTreatmentScreen';
import ProfileScreen from '../screens/UserProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactUsScreen from '../screens/ContactUsScreen';
import OverlayFloatingButtons from '../components/FloatingButtons';
// import ClinicMapScreen from '../screens/ClinicMapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// HOC to wrap a screen with SafeAreaView
const withSafeArea = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Component {...props} />
    </SafeAreaView>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          ...Platform.select({
            android: { elevation: 10 },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.12,
              shadowRadius: 6,
            },
          }),
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Mydent"
        component={Home}
        options={{
          tabBarLabel: 'Mydent',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medal" color={color} size={size} />
          ),
        }}
      />

      {/* Middle Tab under the floating button */}
      <Tab.Screen
        name="Centers"
        component={Home}
        options={{
          tabBarLabel: 'Centers',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Products"
        component={EComScreen}
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
        component={ContactUsScreen}
        options={{
          tabBarLabel: 'Contact Us',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Contact Us"
              component={ContactUsScreen}
              options={{ title: 'Contact Us' }}
            />
            <Stack.Screen
              name="ConsultationOption"
              component={ConsultationOptionScreen}
              options={{ title: 'Consultation Options' }}
            />
            <Stack.Screen
              name="AgeSelection"
              component={AgeSelectionScreen}
              options={{ headerShown: true, title: 'Select Age' }}
            />
            <Stack.Screen
              name="TeethIssueSelection"
              component={TeethIssueSelectionScreen}
              options={{ headerShown: true, title: 'Select Teeth Issue' }}
            />
            <Stack.Screen
              name="ProblemDetail"
              component={ProblemDetailScreen}
              options={{ headerShown: true, title: 'Problem Details' }}
            />
            <Stack.Screen
              name="MedicalHistory"
              component={MedicalHistoryScreen}
              options={{ headerShown: true, title: 'Medical History' }}
            />
            <Stack.Screen
              name="GenderSelection"
              component={GenderSelectionScreen}
              options={{ headerShown: true, title: 'Select Gender' }}
            />
            <Stack.Screen
              name="SmokingStatus"
              component={SmokingStatusScreen}
              options={{ headerShown: true, title: 'Smoking Status' }}
            />
            <Stack.Screen
              name="Availability"
              component={AvailabilityScreen}
              options={{ headerShown: true, title: 'Availability' }}
            />
            <Stack.Screen
              name="CheckoutSummary"
              component={CheckoutSummaryScreen}
              options={{ headerShown: true, title: 'Checkout Summary' }}
            />
            <Stack.Screen
              name="EComScreen"
              component={EComScreen}
              options={{ headerShown: true, title: 'E-Commerce' }}
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{ headerShown: true, title: 'Product Details' }}
            />
            <Stack.Screen
              name="TeethTreatmentScreen"
              component={TeethTreatmentScreen}
              options={{ headerShown: true, title: 'Teeth Treatment' }}
            />
            <Stack.Screen
              name="TransformationScreen"
              component={withSafeArea(TransformationScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransformationBlogDetailsScreen"
              component={withSafeArea(TransformationBlogDetailsScreen)}
              options={{ headerShown: true, title: 'Blog Details' }}
            />
            <Stack.Screen
              name="TreatmentInfoScreen"
              component={withSafeArea(TreatmentInfoScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FindTeethTypeScreen"
              component={withSafeArea(FindTeethTypeScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorDetailsScreen"
              component={withSafeArea(DoctorDetailsScreen)}
              options={{ headerShown: true, title: 'Doctor Details' }}
            />
            {/* <Stack.Screen
              name="ClinicMap"
              component={ClinicMapScreen}
              options={{ headerShown: true, title: 'Clinic Location' }}
            /> */}
            <Stack.Screen
              name="BottomTabsButtons"
              options={{ headerShown: false }}
            >
              {() => (
                <View style={{ flex: 1 }}>
                  <BottomTabNavigator />
                  <OverlayFloatingButtons />
                </View>
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={withSafeArea(Login)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={withSafeArea(Signup)}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
