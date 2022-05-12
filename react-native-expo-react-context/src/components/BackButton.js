import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image style={styles.image} source={require('src/assets/arrow_back.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
  },
  image: {
    height: 24,
    width: 24,
  },
});
