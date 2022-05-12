import { Dimensions, Keyboard, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';

import Text from './Text';
import FlatList from './FlatList';
import { LoadingView } from './LoadingScreen';
import { theme } from 'src/core/theme';

const AutoComplete = ({
  isSearching,
  noSuggestion,
  onNoSuggestionAction,
  onSelectSuggestion,
  suggestions,
  noSuggestionText,
  // isNestedInsideScrollView
}) => {
  const onPress = (item) => {
    onSelectSuggestion(item);
    Keyboard.dismiss();
  }
  return (
    <View style={styles.autocompleteContainer} zIndex={20}>
      {isSearching ? (
        <LoadingView overlay={true} />
      ) : (
        <View style={{ flex: 1, flexGrow: 1, position: 'relative', zIndex: 100 }}>
          {noSuggestion ? (
            <TouchableOpacity
              style={{ flexDirection: 'row', padding: 20, elevation: 4 }}
              onPress={onNoSuggestionAction}
            >
              <Text type="medium">Add </Text>
              <Text type="medium" color="purple">
                {noSuggestionText}
              </Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              data={suggestions}
              keyboardShouldPersistTaps={'handled'}
              // scrollEnabled={!isNestedInsideScrollView}
              keyExtractor={(item, index) => index.toString()}
              // contentContainerStyle={{ flex: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestedItemWrapper}
                  onPress={() => onPress(item)}
                >
                  <Text size={16} textStyle={styles.suggestedItem}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    // bottom: 0,
    zIndex: 20,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    backgroundColor: theme.colors.white,
    elevation: 2,
    marginBottom: 60,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: 20,
  },
  suggestedItemWrapper: {
    paddingVertical: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  suggestedItem: {
    textTransform: 'capitalize',
  },
});
