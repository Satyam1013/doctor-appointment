import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigation';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { FavoriteProvider } from './src/contexts/FavContext';

const queryClient = new QueryClient();

export default function App() {
  console.log('✅ App.tsx loaded successfully');

  return (
    <GestureHandlerRootView style={styles.root}>
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <UserProvider>
                  <FavoriteProvider>
                    <AppNavigator />
                  </FavoriteProvider>
                </UserProvider>
              </AuthProvider>
            </QueryClientProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
