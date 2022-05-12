import Toast from 'react-native-root-toast';

import { theme } from '../core/theme';

export const showToast = (message, duration = Toast.durations.SHORT) => {
  Toast.show(message, {
    duration,
    backgroundColor: theme.colors.surface,
    textColor: theme.colors.primary,
    textStyle: {
      fontFamily: 'regular'
    },
    opacity: 0.9,
    position: -100,
  });
}
