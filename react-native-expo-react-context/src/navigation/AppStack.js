/* eslint-disable no-unused-vars */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import BottomTabStack from './BottomTabStack';
import AppScreens from './routes/AppScreenRoutes';
import HeaderBar from 'src/components/HeaderBar';
import { theme } from 'src/core/theme';
import { AppScreenName } from './screenNames';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreenName.BottomTab_MainStack}
      screenOptions={({ navigation, route }) => ({
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'medium',
        },
        headerTintColor: theme.colors.primary,
        header: (props) => <HeaderBar {...props} />,
      })}
    >
      <Stack.Screen
        name={AppScreenName.BottomTab_MainStack}
        component={BottomTabStack}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={AppScreenName.ChatScreen}
        component={AppScreens.ChatScreen}
        options={({ route }) => ({
          title: route?.params?.user?.name || 'Chat',
        })}
      />
      <Stack.Screen
        name={AppScreenName.UserProfile}
        component={AppScreens.UserProfile}
        options={({ route }) => {
          return {
            title: 'abc Profile',
          };
        }}
      />
      <Stack.Screen
        name={AppScreenName.EditProfile}
        component={AppScreens.EditProfile}
        options={({ route }) => {
          return {
            title: 'Edit Profile',
          };
        }}
      />
      <Stack.Screen name={AppScreenName.Camera} component={AppScreens.Camera} />
      <Stack.Screen name={AppScreenName.Save} component={AppScreens.Save} />
      <Stack.Screen
        name={AppScreenName.Search}
        component={AppScreens.Search}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Group>
        <Stack.Screen
          name={AppScreenName.PatientCase.List}
          component={AppScreens.PatientCaseList}
          options={({ route }) => ({
            title: 'Patient Cases',
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.View}
          component={AppScreens.PatientCaseView}
          options={({ route }) => ({
            title: 'View Patient Case',
            headerShown: false,
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.Create}
          component={AppScreens.CreatePatientCase}
          options={({ route }) => ({
            title: 'Enter case details',
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.Edit}
          component={AppScreens.EditPatientCase}
          options={({ route }) => ({
            title: 'Modify case details',
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.RecordVitals}
          component={AppScreens.RecordVitals}
          options={({ route }) => ({
            title: 'Record Patient Vitals',
            animation: 'fade_from_bottom'
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.PrescribeMedicines}
          component={AppScreens.PrescribeMedicines}
          options={({ route }) => ({
            headerShown: false,
            animation: 'fade_from_bottom'
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.PrescribeLabTests}
          component={AppScreens.PrescribeLabTests}
          options={({ route }) => ({
            headerShown: false,
            animation: 'fade_from_bottom'
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.TakeNotes}
          component={AppScreens.TakeNotes}
          options={({ route }) => ({
            title: 'Prescription Notes',
            animation: 'fade_from_bottom'
          })}
        />
        <Stack.Screen
          name={AppScreenName.PatientCase.AttachCareTeam}
          component={AppScreens.AttachCareTeam}
          options={({ route }) => ({
            title: route?.params?.tagging ? 'Mention abcs & Units' : 'Attach Care Team',
            // presentation: 'modal',
            animation: 'slide_from_right'
          })}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={AppScreenName.Unit.Create}
          component={AppScreens.CreateUnit}
          options={({ navigation, route }) => ({
            title: 'Enter unit details',
          })}
        />
        <Stack.Screen
          name={AppScreenName.Unit.Edit}
          component={AppScreens.EditUnit}
          options={({ navigation, route }) => ({
            title: 'Modify unit details',
          })}
        />
        <Stack.Screen
          name={AppScreenName.Unit.Modifyabcs}
          component={AppScreens.ModifyUnitabcs}
          options={({ navigation, route }) => ({
            title: `Add abcs to ${route?.params?.unit?.unit_name} unit`,
          })}
        />
        <Stack.Screen
          name={AppScreenName.Unit.View}
          component={AppScreens.ViewUnit}
          options={({ navigation, route }) => ({
            headerShown: false,
            title: route?.params?.unit.name || 'View Unit',
          })}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStack;
