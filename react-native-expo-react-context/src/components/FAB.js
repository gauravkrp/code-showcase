import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Icon from './Icon';
import Text from './Text';
import { theme } from '../core/theme';

const FAB = ({ label, icon, onPress, bgColor, style, centered }) => {
  return (
    <View style={[
      styles.container,
      centered ? { alignItems: 'center', justifyContent: 'center', left: 0, right: 0 } : null
    ]}>
      <TouchableOpacity
        style={[
          styles.fabContainer,
          bgColor ? { backgroundColor: theme.colors[bgColor] } : null,
          label ? { width: 'auto', height: 40, paddingHorizontal: 20 } : null,
          style ? style : null,
        ]}
        onPress={onPress}
      >
        <Icon name={icon ?? 'plus'} size={24} color={theme.colors.white} />
        {label ? (
          <Text color="white" type="regular" size={18} textStyle={{ marginLeft: 8 }}>
            {label}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(FAB);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fabContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 4,
  }
});
