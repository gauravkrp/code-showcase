import { StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../core/theme';
import Text from './Text';
import Icon from './Icon';

const ComingSoon = ({ children, small = false, show = false }) => {
  if (show) return children;
  return (
    <>
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.90)', 'rgba(255,255,255,1)']}
        style={styles.comingSoonBackground}
        stop={[0.5, 0.67, 0.85]}
      >
        <View style={styles.comingSoonContent}>
          <Text size={16} color="primary" type="medium">Coming Soon!</Text>
          <Icon name="lock" color={theme.colors.purple} size={60} style={styles.contentLockIcon} />
        </View>
      </LinearGradient>
      {children}
    </>
  );
}

export default ComingSoon

const styles = StyleSheet.create({
  comingSoonBackground: {
    // backgroundColor: theme.colors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    zIndex: 5,
    elevation: 5,
    height: '100%',
    marginVertical: 24,
  },
  comingSoonContent: {
    flex: 1,
    flexDirection: 'column-reverse',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 1,
  },
  contentLockIcon: {
    marginBottom: 10,
  },
});
