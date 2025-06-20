import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import AuthScreen from './AuthScreen';
import DrawerNavigator from './DrawerNavigation';

const linking = {
  prefixes: ['https://mawosfs-anonymous-8081.exp.direct', 'mydent://'],
  config: {
    screens: {
      Login: 'login',
      Signup: 'signup',
      ForgotPassword: 'forgot-password',
      ResetPassword: {
        path: 'reset-password',
        parse: {
          token: (token: string) => token,
        },
      },
    },
  },
};

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer linking={linking}>
      {token ? <DrawerNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}
