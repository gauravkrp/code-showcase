import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

import { withTheme } from 'react-native-paper';
import { theme } from '../core/theme';

const Text = ({ size, lineHeight, type, color, children, align, textStyle,  ...props }) => {
  if (!children) return null;
  return (
    <RNText
      style={
        ([styles.text],
        {
          fontSize: size ?? 18,
          lineHeight: lineHeight ? lineHeight : (size ? size * 1.4 : 22),
          fontFamily: type ?? 'regular',
          color: color ? theme.colors[color] : theme.colors.primary,
          textAlign: align ?? 'left',
          // flex: flex ? flex : 0,
          ...textStyle,
        }
        )
      }
      {...props}
    >
      {children}
    </RNText>
  );
};

export default withTheme(React.memo(Text));

const styles = StyleSheet.create({
  text: {
    color: theme.colors.primary,
    fontFamily: 'regular',
    fontSize: 16,
  },
});

const possibleColors = Object.keys(theme.colors);

Text.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  lineHeight: PropTypes.number,
  type: PropTypes.oneOf(['light', 'regular', 'medium', 'bold']),
  color: PropTypes.oneOf(possibleColors),
};
