import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Keyboard } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../core/theme';
// import Spacer from "./Spacer";

const AppPageView = ({ children, isLoading }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('on');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('off');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const marginBottom = keyboardStatus === 'on' ? 0 : tabBarHeight;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom }}>
        {isLoading ? <ActivityIndicator animating={true} size="large" color={theme.colors.primary} /> : children}
      </View>
      {/* <Spacer height={20} /> */}
    </ScrollView>
  );
};

export default AppPageView;

export const InnerView = ({ isLoading, children, style }) => {
  return (
    <ScrollView style={[styles.innerViewContainer, style ? style : null]}
      keyboardShouldPersistTaps={'handled'}
      keyboardDismissMode="interactive">
      {isLoading ? <ActivityIndicator animating={true} size="large" color={theme.colors.primary} /> : children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  innerViewContainer: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});
