import React, { useState } from 'react';
import { View, StyleSheet, TextInput as RNInput } from 'react-native';

import { theme } from '../core/theme';
import Text from './Text';

export default function TextInput({ error, descriptionText, label, onBlur, style, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [multiLineHeight, setMultiLineHeight] = useState(40);

  return (
    <View style={styles.container}>
      {label ? (
        <Text color="textGrey" size={14} type="medium" textStyle={{ marginBottom: 6 }}>
          {label}
        </Text>
      ) : null}
      <RNInput
        selectionColor={theme.colors.primary}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        onFocus={() => setIsFocused(true)}
        onContentSizeChange={(event) => {
          setMultiLineHeight(event.nativeEvent.contentSize.height);
        }}
        style={[
          styles.input,
          isFocused ? { borderBottomColor: theme.colors.primary } : null,
          props.multiline ? { height: Math.max(40, multiLineHeight) } : null,
          style ? style : null,
        ]}
        {...props}
      />
      {descriptionText && !error?.message ? (
        <Text size={14} color="textGrey" type="regular" textStyle={styles.description}>
          {descriptionText}
        </Text>
      ) : null}
      {error?.message ? (
        <Text color="error" size={14} type="medium" textStyle={styles.error}>
          {error?.message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width: '100%',
  },
  description: {
    marginTop: 4,
  },
  error: {
    marginTop: 4,
  },
  input: {
    flex: 1,
    padding: 0,
    backgroundColor: theme.colors.white,
    borderWidth: 0,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    fontFamily: 'regular',
    fontSize: 18,
    lineHeight: 26,
    height: 40,
    color: theme.colors.primary,
  },
});
