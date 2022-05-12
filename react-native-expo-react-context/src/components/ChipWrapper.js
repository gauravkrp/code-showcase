import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';

import { theme } from 'src/core/theme';
import Text from 'src/components/Text';

const ChipWrapper = React.forwardRef((props, ref) => {
  const { chipLabels, onChipPress, chipActiveIndex } = props;
  
  return (
    <View style={styles.chipWrapper}>
      <FlatList
        ref={ref}
        horizontal={true}
        data={chipLabels}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            // borderless={true}
            onPress={() => {
              onChipPress(index);
            }}
            style={[styles.chipItem, index === chipActiveIndex && styles.chipItemActive]}
            rippleColor="rgba(0, 0, 0, .12)"
          >
            <Text
              size={16}
              color={index === chipActiveIndex ? 'white' : 'primary'}
              type={index === chipActiveIndex ? 'medium' : 'regular'}
              textStyle={{
                paddingHorizontal: 15,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        ListHeaderComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => <View style={{ width: 20 }} />}
      />
    </View>
  );
});

export default React.memo(ChipWrapper);

const styles = StyleSheet.create({
  chipWrapper: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 0,
    paddingVertical: 15,
    elevation: 2,
    borderBottomWidth: 0.4,
    borderBottomColor: theme.colors.lightWhite,
  },
  chipItem: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 5,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.lightWhite,
    overflow: 'hidden',
  },
  chipItemActive: {
    backgroundColor: theme.colors.deposits,
  }
});
