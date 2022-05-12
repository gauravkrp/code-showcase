import React from 'react';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from './AuthProvider';
// import { AppProvider, useAppContext } from './AppProvider';
import { theme } from '../core/theme';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingScreen from '../components/LoadingScreen';

const Routes = () => {
  const { loggedIn, initializing } = useAuthContext();

  if (initializing) return <LoadingScreen />;

  return (
    <SafeAreaProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          {loggedIn ? (
            <AppStack />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default Routes;
