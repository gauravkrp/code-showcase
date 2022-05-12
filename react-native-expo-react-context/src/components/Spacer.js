import React from 'react';
import { View } from 'react-native';

import { theme } from '../core/theme';

const Spacer = ({ height, bgColor, style }) => (
  <View
    style={[
      { height: height ?? 10, backgroundColor: bgColor ?? theme.colors.surface },
      style && style,
    ]}
  ></View>
);

export default Spacer;
