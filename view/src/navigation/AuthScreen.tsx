import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AuthScreen;
