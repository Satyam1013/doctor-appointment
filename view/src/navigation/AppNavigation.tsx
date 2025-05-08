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
import { StyleSheet } from 'react-native';
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
// import ClinicMapScreen from '../screens/ClinicMapScreen';

const Stack = createNativeStackNavigator();

// HOC to wrap a screen with SafeAreaView
const withSafeArea = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Component {...props} />
    </SafeAreaView>
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
