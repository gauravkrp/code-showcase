import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import React from 'react';
// import icoMoonConfig from '../../icoMoonSelection.json';
// export default createIconSetFromIcoMoon(icoMoonConfig);

const Icon = createIconSetFromIcoMoon(
  require('../../assets/fonts/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf',
);

export default React.memo(Icon);
