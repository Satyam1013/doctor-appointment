import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import MainScreen from './MainScreen';
import AuthScreen from './AuthScreen';

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token ? <MainScreen /> : <AuthScreen />}
    </NavigationContainer>
  );
}
