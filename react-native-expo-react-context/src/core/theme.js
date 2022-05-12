/* eslint-disable no-unused-vars */
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';

// console.log(DefaultTheme.colors)
// {
//   "accent": "#03dac4",
//   "backdrop": "rgba(0, 0, 0, 0.5)",
//   "background": "#f6f6f6",
//   "disabled": "rgba(0, 0, 0, 0.26)",
//   "error": "#B00020",
//   "notification": "#f50057",
//   "onSurface": "#000000",
//   "placeholder": "rgba(0, 0, 0, 0.54)",
//   "primary": "#6200ee",
//   "surface": "#ffffff",
//   "text": "#000000",
// }

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const fonts = {
  light: {
    fontFamily: 'light',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'medium',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'bold',
    fontWeight: 'normal',
  },
};

const fontConfig = {
  web: {
    ...fonts,
  },
  ios: {
    ...fonts,
  },
  android: {
    ...fonts,
  },
  default: fonts,
};

export const colors = {
  text: '#1C162E',
  textLight: '#c8c8c8',
  textGrey: '#898989',
  border: '#e9e9e9',
  black: '#000000',
  primary: '#0A0A28',
  secondary: '#07A74B',
  background: '#ffffff',
  white: '#ffffff',
  lightWhite: '#f0f0f0',
  surface: '#f1f4fa',
  links: '#FFD035',
  green: '#1AD5AD',
  success: '#1AD5AD',
  error: '#f13a59',
  red: '#f13a59',
  purple: '#5156BE',
  record: '#E83F94',
  bank_accounts: '#4dffd8',
  deposits: '#24CDD8',
  units: '#24b0ba',
  bonds: '#f2f2f2',
  others: '#1C162E',
  inputBg: '#edf0f8',
  lightBlue: '#D4F1F4',
  inactiveIcon: '#dad6d6',
  cardBg: '#FFFBEF',
  yellowBg: '#ffecb7',
  notes: '#F88379'
};

export const theme = {
  ...CombinedDefaultTheme,
  roundness: 2,
  fonts: configureFonts(fontConfig),
  colors: {
    ...CombinedDefaultTheme.colors,
    ...colors,
  },
};
