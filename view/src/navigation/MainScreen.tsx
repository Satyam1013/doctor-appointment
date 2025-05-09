/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TreatmentInfoScreen from '../screens/TreatmentInfo';
import FindTeethTypeScreen from '../screens/FindTeethTypeScreen';
import DoctorDetailsScreen from '../screens/TopDoctorsScreen';
import TransformationScreen from '../screens/TransformationScreen';
import TransformationBlogDetailsScreen from '../screens/TransformationBlogs';
import React from 'react';
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
import HomeScreen from '../screens/Home';
import ContactUsScreen from '../screens/ContactUsScreen';
import { withAppShell } from '../utils/AppShellWrapper';
import BottomTabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Home" component={withAppShell(HomeScreen)} />
      <Stack.Screen name="Profile" component={withAppShell(ProfileScreen)} />
      <Stack.Screen
        name="Contact Us"
        component={withAppShell(ContactUsScreen)}
      />
      <Stack.Screen
        name="ConsultationOption"
        component={withAppShell(ConsultationOptionScreen)}
      />
      <Stack.Screen
        name="AgeSelection"
        component={withAppShell(AgeSelectionScreen)}
      />
      <Stack.Screen
        name="TeethIssueSelection"
        component={withAppShell(TeethIssueSelectionScreen)}
      />
      <Stack.Screen
        name="ProblemDetail"
        component={withAppShell(ProblemDetailScreen)}
      />
      <Stack.Screen
        name="MedicalHistory"
        component={withAppShell(MedicalHistoryScreen)}
      />
      <Stack.Screen
        name="GenderSelection"
        component={withAppShell(GenderSelectionScreen)}
      />
      <Stack.Screen
        name="SmokingStatus"
        component={withAppShell(SmokingStatusScreen)}
      />
      <Stack.Screen
        name="Availability"
        component={withAppShell(AvailabilityScreen)}
      />
      <Stack.Screen
        name="CheckoutSummary"
        component={withAppShell(CheckoutSummaryScreen)}
      />
      <Stack.Screen name="EComScreen" component={withAppShell(EComScreen)} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={withAppShell(ProductDetailScreen)}
      />
      <Stack.Screen
        name="TeethTreatmentScreen"
        component={withAppShell(TeethTreatmentScreen)}
      />
      <Stack.Screen
        name="TransformationScreen"
        component={withAppShell(TransformationScreen)}
      />
      <Stack.Screen
        name="TransformationBlogDetailsScreen"
        component={withAppShell(TransformationBlogDetailsScreen)}
      />
      <Stack.Screen
        name="TreatmentInfoScreen"
        component={withAppShell(TreatmentInfoScreen)}
      />
      <Stack.Screen
        name="FindTeethTypeScreen"
        component={withAppShell(FindTeethTypeScreen)}
      />
      <Stack.Screen
        name="DoctorDetailsScreen"
        component={withAppShell(DoctorDetailsScreen)}
      />
    </Stack.Navigator>
  );
}
