import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import AuthScreen from './AuthScreen';
import BottomTabNavigator from './TabNavigator';

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token ? <BottomTabNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}
