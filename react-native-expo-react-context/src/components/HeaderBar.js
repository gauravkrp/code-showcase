import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getHeaderTitle } from '@react-navigation/elements';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { theme } from 'src/core/theme';
import Text from './Text';
import Icon from './Icon';
import { AppScreenName } from 'src/navigation/screenNames';

const Header = ({ back, navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  // console.log(back, navigation, route, options);

  const onClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(AppScreenName.BottomTab_MainStack);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {back ? (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: Platform.OS === 'android' ? 0 : 10,
            backgroundColor: theme.colors.white,
          }}
          pressColor="transparent"
          labelVisible={false}
          tintColor={theme.colors.primary}
        />
      ): (
        <Button compact={true} onPress={onClose} style={{ paddingLeft: 10 }}>
          <Icon name="close" size={20} />
        </Button>
      )}
      <View style={styles.titleWrapper}>
        <Text size={20} type="medium">{title}</Text>
      </View>
      <View style={styles.headerBtnWrapper}>
        {options.headerRight ? options.headerRight() : null }
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    backgroundColor: theme.colors.white,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleWrapper: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerBtnWrapper: {
    // width: 30,
    marginRight: 20,
    backgroundColor: theme.colors.white,
  }
});
