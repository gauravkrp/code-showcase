import { StyleSheet, View } from 'react-native';
import React from 'react';

import { theme } from 'src/core/theme';

const Dots = () => {
  return (
    <View style={styles.dotWrap}>
      <View style={[styles.dot, { backgroundColor: theme.colors.purple }]}></View>
      <View style={[styles.dot, { backgroundColor: theme.colors.deposits }]}></View>
      <View style={[styles.dot, { backgroundColor: theme.colors.secondary }]}></View>
      <View style={[styles.dot, { backgroundColor: theme.colors.links }]}></View>
    </View>
  )
}

export default Dots;

const styles = StyleSheet.create({
  dotWrap: {
    flexDirection: 'row',
    marginBottom: 20
  },
  dot: {
    marginRight: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
  },
});
