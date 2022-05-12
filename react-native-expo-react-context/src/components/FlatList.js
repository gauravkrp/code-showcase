import { FlatList as RNFlatList } from 'react-native';
import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { TouchableRipple } from 'react-native-paper';

export const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

const FlatList = props => {
  return (
    <TouchableRipple
      borderless={true} rippleColor="rgba(0, 0, 0, .2)">
      <AnimatedFlatList {...props} />
    </TouchableRipple>
  );
};

export default memo(FlatList);
