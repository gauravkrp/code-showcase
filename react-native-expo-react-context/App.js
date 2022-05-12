import React, { useState } from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RootSiblingParent, setSiblingWrapper } from 'react-native-root-siblings';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux'; 
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";

import store from './src/store';
import Navigation from './src/navigation';

const cacheImages = images =>
  images.map(imgSrc => {
    if (typeof imgSrc === 'string') {
      return Image.prefetch(imgSrc);
    } else {
      return Asset.fromModule(imgSrc).downloadAsync();
    }
  });

const loadAllAssets = async () => {
  const images = cacheImages([
    require('./assets/icon.png'),
    require('./assets/favicon.png'),
    require('./assets/splash.png'),
    require('./assets/onboarding-img1.png'),
    require('./assets/onboarding-img2.png'),
    require('./assets/onboarding-img3.png'),
  ]);

  await Promise.all(images);
};

// let persistor = persistStore(store);

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isFontsLoaded] = useFonts({
    IcoMoon: require('./assets/fonts/icomoon/icomoon.ttf'),
    light: require('./assets/fonts/apercu_pro/Apercu_Pro_Light.otf'),
    regular: require('./assets/fonts/apercu_pro/Apercu_Pro_Regular.otf'),
    medium: require('./assets/fonts/apercu_pro/Apercu_Pro_Medium.otf'),
    bold: require('./assets/fonts/apercu_pro/Apercu_Pro_Bold.otf'),
    italic: require('./assets/fonts/apercu_pro/Apercu_Pro_Italic.otf'),
    mono: require('./assets/fonts/apercu_pro/Apercu_Pro_Mono.otf'),
  });

  if (!(isLoadingComplete && isFontsLoaded))
    return (
      <AppLoading
        startAsync={loadAllAssets}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      />
    );

  return (
    <RootSiblingParent>
      <Navigation />
      {/* <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        </PersistGate>
      </ReduxProvider> */}
    </RootSiblingParent>
  );
};

export default App;
