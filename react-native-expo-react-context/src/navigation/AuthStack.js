import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import AuthRoutes from './routes/AuthRoutes';
import { theme } from '../core/theme';
import Text from '../components/Text';
import { AuthScreenName } from './screenNames';
import HeaderBar from 'src/components/HeaderBar';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched')
      .then(value => {
        if (value == null) {
          // No need to wait for `setItem` to finish, although you might want to handle errors
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      })
      .catch(err => {
        // Add some error handling, also you can simply do setIsFirstLaunch(null)
        console.error(err);
        setIsFirstLaunch(null);
      });
  }, []);

  if (isFirstLaunch === null) {
    // This is the 'tricky' part: The query to AsyncStorage is not finished,
    // but we have to present something to the user.
    // Null will just render nothing, so you can also put a placeholder of some sort,
    // but effectively the interval between the first mount and
    // AsyncStorage retrieving your data won't be noticeable to the user.
    // But if you want to display anything then you can use a LOADER here
    return <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />; // null;
  } else if (isFirstLaunch == true) {
    routeName = AuthScreenName.Onboarding;
  } else {
    routeName = AuthScreenName.RequestOTP; // or 'MainStack';
  }

  return (
    <Stack.Navigator 
      initialRouteName={routeName}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerStyle: {
          elevation: 1,
        },
        headerTintColor: theme.colors.primary,
        header: (props) => <HeaderBar {...props} />,
      }}
    >
      <Stack.Screen name={AuthScreenName.Onboarding} component={AuthRoutes.OnboardingScreen} options={{ header: () => null }} />
      <Stack.Group>
        <Stack.Screen name={AuthScreenName.RequestOTP} component={AuthRoutes.RequestOTPScreen} options={{ header: () => null }} />
        <Stack.Screen
          name={AuthScreenName.VerifyOTP}
          component={AuthRoutes.VerifyOTPScreen}
          options={{
            title: 'Verify OTP',
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name={AuthScreenName.Signup}
        component={AuthRoutes.SignupScreen}
        options={{
          title: 'Register',
          // @ToDo: Implement custom back button to navigato to RequestOTP screen and not to VerifyOTP screen
          // take navigation and route props from options
          // headerLeft: () => (),
        }}
      />
      <Stack.Screen 
        name={AuthScreenName.TermsPage}
        component={AuthRoutes.TermsPage} 
        options={{
          title: 'Terms and Conditions',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
