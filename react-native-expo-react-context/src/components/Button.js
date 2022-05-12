import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { theme } from '../core/theme';

const Button = ({ mode, style, textStyle, rounded, ...props }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        props.disabled && mode === 'contained' && { backgroundColor: theme.colors.textGrey },
        mode === 'outlined' && { backgroundColor: theme.colors.white },
        style,
        rounded && { borderRadius: 50, borderWidth: 1, borderColor: theme.colors.border},
      ]}
      labelStyle={[styles.text, { color: mode === 'contained' ? theme.colors.white : theme.colors.primary, ...textStyle }]}
      mode={mode}
      {...props}
    />
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    // marginVertical: 10,
    paddingVertical: 2,
    // width: '100%',
    // height: 44,
  },
  text: {
    color: theme.colors.white,
    fontFamily: 'bold',
    fontSize: 16,
    lineHeight: 26,
    textTransform: 'none',
  },
});
