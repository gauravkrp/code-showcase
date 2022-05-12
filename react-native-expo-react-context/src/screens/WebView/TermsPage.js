import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import WebView from "react-native-webview";

export default function TermsPage({ navigation }) {
  const webviewRef = useRef(null);
  const terms_url = `https://myApp.com/`;

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: terms_url,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
              animating={true}
            />
          )}
          ref={webviewRef}
          // onNavigationStateChange={onNavigation}
          style={styles.margin}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});
