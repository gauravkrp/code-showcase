import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo() {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    height: 68,
    marginBottom: 8,
    width: 72,
  },
});
