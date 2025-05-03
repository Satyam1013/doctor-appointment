/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

const Stack = createNativeStackNavigator();

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
              component={TransformationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransformationBlogDetailsScreen"
              component={TransformationBlogDetailsScreen}
              options={{ headerShown: true, title: 'Blog Details' }}
            />

            <Stack.Screen
              name="TreatmentInfoScreen"
              component={TreatmentInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FindDoctorScreen"
              component={FindDoctorScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorDetailsScreen"
              component={DoctorDetailsScreen}
              options={{ headerShown: true, title: 'Doctor Details' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
