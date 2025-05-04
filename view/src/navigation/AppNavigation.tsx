import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import TreatmentInfoScreen from '../screens/TreatmentInfo';
import FindDoctorScreen from '../screens/FindDoctor';
import DoctorDetailsScreen from '../screens/TopDoctorsScreens';
import TransformationScreen from '../screens/TransformationScreen';
import TransformationBlogDetailsScreen from '../screens/TransformationBlogs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

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
              name="FindDoctorScreen"
              component={withSafeArea(FindDoctorScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorDetailsScreen"
              component={withSafeArea(DoctorDetailsScreen)}
              options={{ headerShown: true, title: 'Doctor Details' }}
            />
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
