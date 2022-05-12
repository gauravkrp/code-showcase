/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Appbar, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { theme } from '../core/theme';
import AppScreens from './routes/AppScreenRoutes';
import Icon from '../components/Icon';
import Text from '../components/Text';
import { AuthContext } from '../navigation/AuthProvider';

const BottomTab = createBottomTabNavigator();

const tabBarIcons = {
  Home: 'home',
  Cases: 'folder-plus',
  Units: 'unit',
  Profile: 'profile',
};
const appBarTitle = {
  Home: `Home`,
  Cases: 'Patient Cases',
  Units: 'Units',
  Profile: 'Profile',
};

const welcomeText = 'Good to see you back!';

const RightButton = ({ routeName }) => {
  const inviteUser = () => {
    console.log('inviting user');
  };
  switch (routeName) {
    case 'Home':
      return (
        <Button compact={true}>
          <Icon name="bell" size={28} />
        </Button>
      );
    case 'Chats':
      return (
        <Button
          compact={true}
          mode="text"
          labelStyle={{
            fontFamily: 'bold',
            textTransform: 'none',
            fontSize: 18,
          }}
          onPress={inviteUser}
        >
          Invite
        </Button>
      );
    default:
      return null;
  }
};

const HeaderBar = ({ navigation, back, route }) => {
  const { user } = useContext(AuthContext);
  const userFirstName = user?.name.split(' ')[0] || '';
  const isDoctor = user.profession === 'Doctor';

  if (route.name === 'Home') {
    return (
      <Appbar.Header style={styles.homeHeader} statusBarHeight={Platform.OS === 'ios' ? 40 : 40}>
        <StatusBar style="dark" />
        <View>
          <Text size={24}>
            Hi<Text type="medium" size={24}>{`${isDoctor ? ' Dr.': ''} ${userFirstName}`}</Text>
          </Text>
          <Text color="textGrey" size={16} textStyle={{ marginTop: 2 }}>
            {welcomeText}
          </Text>
        </View>
      </Appbar.Header>
    );
  }
  return (
    <Appbar.Header style={styles.headerContainer} statusBarHeight={Platform.OS === 'ios' ? 50 : 50}>
      <StatusBar style="dark" />
      <Text
        numberOfLines={1}
        accessible
        accessibilityTraits="header"
        accessibilityRole={Platform.OS === 'web' ? 'heading' : 'header'}
        type={route.name === 'Home' ? 'regular' : 'medium'}
        size={route.name === 'Home' ? 24 : 32}
        textStyle={styles.appBarTitle}
      >
        {appBarTitle[route.name]}
      </Text>
      <RightButton routeName={route.name} />
    </Appbar.Header>
  );
};

const BottomTabStack = () => {
  // const getTabBarVisibility = (route) => {
  //   const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  //   if (focusedRouteName === 'ChatScreen') return false;
  //   return true;
  // };

  const TabBarIcon = ({ focused, size, route }) => {
    const color = focused ? theme.colors.purple : theme.colors.inactiveIcon;
    return (
      <View style={focused ? styles.activeTab : styles.inactiveTab}>
        <Icon name={tabBarIcons[route.name]} size={size ?? 26} color={color} />
        <Text
          type={focused ? 'bold' : 'medium'}
          size={12}
          color={focused ? 'purple' : 'inactiveIcon'}
          textStyle={{ marginTop: 1 }}
        >
          {appBarTitle[route.name]}
        </Text>
      </View>
    );
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: props => <TabBarIcon {...props} route={route} />,
        header: props => <HeaderBar {...props} />,
        tabBarStyle: tabBarStyle,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} style={StyleSheet.absoluteFill} />
          ) : null,
        tabBarAccessibilityLabel: `${route.name}`,
        tabBarShowLabel: false,
        title: route.name,
        tabBarHideOnKeyboard: true,
      })}
    >
      <BottomTab.Screen name="Home" component={AppScreens.Home} />
      <BottomTab.Screen name="Cases" component={AppScreens.PatientCaseList} />
      <BottomTab.Screen name="Units" component={AppScreens.Units} />
      <BottomTab.Screen
        name="Profile"
        component={AppScreens.Profile}
        // options={({ route }) => ({
        //   tabBarStyle: { display: getTabBarVisibility(route) ? 'flex' : 'none' },
        // })}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;

const tabBarStyle = {
  position: Platform.OS === 'ios' ? 'absolute' : 'relative',
  height: Platform.OS === 'ios' ? 110 : 72,
  paddingVertical: 10,
  marginVertical: 0,
  boxShadow: 'none',
  bottom: 0,
};

const tabItemStyle = {
  paddingVertical: 8,
  height: 44,
  marginBottom: 12,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  activeTab: {
    ...tabItemStyle,
  },
  inactiveTab: {
    ...tabItemStyle,
  },
  appBarTitle: {
    flex: 1,
    fontFamily: 'bold',
    fontSize: 32, // Platform.OS === 'ios' ? 28 : 32,
    paddingHorizontal: 12,
  },
  homeHeader: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    elevation: 1,
    // flex: 1,
    height: 90,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    elevation: 0,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    // paddingVertical: Platform.OS === "ios" ? 20 : 0,
  },
});
