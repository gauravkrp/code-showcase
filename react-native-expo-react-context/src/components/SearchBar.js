import React from 'react';
import { Keyboard, View, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { HeaderBackButton } from '@react-navigation/elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { theme } from 'src/core/theme';
import TextInput from './TextInput';
import Icon from './Icon';

const SearchBar = ({
  showFilter,
  onFilter,
  autoFocus = true,
  navigation,
  onSearch,
  onChangeText,
  value,
  onClearInput,
  placeholder,
  ...rest
}) => {
  const onInputBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {navigation.canGoBack ? (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: Platform.OS === 'android' ? 0 : 10 }}
          pressColor="transparent"
          labelVisible={false}
          tintColor={theme.colors.primary}
        />
      ) : null}
      <View style={{ flex: 1, marginRight: showFilter ? 0 : 20, }}>
        <TextInput
          returnKeyType="search"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          dense={true}
          numberOfLines={1}
          onBlur={onInputBlur}
          autoFocus={autoFocus}
          style={styles.searchInput}
          onSubmitEditing={onSearch}
          {...rest}
        />
      </View>
      {value ? (
        <Button compact={true} onPress={onClearInput} style={styles.searchClose}>
          <Icon name="close" size={16} />
        </Button>
      ) : null}
      {showFilter && (
        <Button compact={true} onPress={onFilter}>
          <Icon name="hamburger" size={20} />
        </Button>
      )}
    </View>
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 + getStatusBarHeight(),
    paddingTop: 10 + getStatusBarHeight(),
    backgroundColor: theme.colors.surface,
  },
  searchClose: {
    bottom: 8,
    position: 'absolute',
    right: 20,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    height: 32,
    lineHeight: 20,
  },
});
