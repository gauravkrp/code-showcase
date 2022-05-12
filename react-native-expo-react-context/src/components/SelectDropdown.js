/* eslint-disable no-unused-vars */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Select from 'react-native-select-dropdown';

import Text from './Text';
import Icon from './Icon';
import { theme } from '../core/theme';

const SelectDropdown = ({ selectOptions, setValue, label, unSelectedLabel, error, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      {label ? (
        <Text color="textGrey" size={14} type="medium">
          {label}
        </Text>
      ) : null}
      <Select
        data={selectOptions}
        onSelect={(selectedItem, index) => {
          setValue(selectedItem);
          setSelectedIndex(index);
        }}
        defaultButtonText={label}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
        rowTextForSelection={(item, index) => item.label}
        renderDropdownIcon={() => <Icon name="arrow-down" size={20} color={theme.colors.primary} />}
        renderCustomizedButtonChild={item => (
          <Text type="regular" size={18} color={item ? 'primary' : 'textGrey'}>
            {item ? item.label : unSelectedLabel}
          </Text>
        )}
        renderCustomizedRowChild={(item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: selectedIndex === index ? 'transparent' : 'transparent',
            }}
          >
            <Text type={index === selectedIndex ? 'bold' : 'regular'} size={16} color="black">
              {item}
            </Text>
          </View>
        )}
        style={styles.inputStyle}
        buttonStyle={{
          backgroundColor: theme.colors.white,
          textAlign: 'left',
          flex: 1,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          width: '100%',
          paddingHorizontal: 0,
        }}
        buttonTextStyle={{ fontFamily: 'regular', fontSize: 18, color: theme.colors.primary }}
        rowStyle={{ paddingHorizontal: 20, borderBottomColor: theme.colors.border }}
        rowTextStyle={{ fontFamily: 'regular' }}
        dropdownStyle={{ borderRadius: 4, marginTop: -20 }}
        {...props}
      />
      {error?.message ? (
        <Text color="error" size={14} type="medium" textStyle={styles.error}>
          {error?.message}
        </Text>
      ) : null}
    </>
  );
};

export default React.memo(SelectDropdown);

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomColor: theme.colors.surface,
    borderBottomWidth: 1,
    color: theme.colors.primary,
    // flex: 1,
    fontFamily: 'regular',
    fontSize: 18,
    height: 40,
    width: '100%',
  },
  error: {
    color: theme.colors.error,
    marginTop: 4,
  },
});
