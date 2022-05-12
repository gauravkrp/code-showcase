import React from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, View } from 'react-native';

import { theme } from 'src/core/theme';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" loading={true} color={theme.colors.primary} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

export const LoadingView = ({ bgColor, overlay }) => (
  <View
    style={[
      styles.loading,
      { backgroundColor: bgColor ? theme.colors[bgColor] : 'transparent' },
      overlay ? styles.overlay : null,
    ]}
  >
    <ActivityIndicator size="large" loading={true} color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
    elevation: 1,
  }
});
