import React from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Dimensions } from 'react-native';

import Icon from 'src/components/Icon';
import { theme } from 'src/core/theme';

const AutoCompleteDropdown = ({ onChange, dataSet, onBlur }) => {
  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={false}
      closeOnSubmit={true}
      // initialValue={{ id: '2' }} // or just '2'
      onSelectItem={item => {
        item && onChange(item.title);
      }}
      onBlur={onBlur}
      dataSet={dataSet}
      inputHeight={40}
      suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
      bottomOffset={20}
      showClear={true}
      onClear={() => {
        onChange('');
      }}
      ChevronIconComponent={
        <Icon name="arrow-down" size={20} color={theme.colors.primary} />
      }
      containerStyle={{
        flexGrow: 1,
        flexShrink: 1,
      }}
      inputContainerStyle={{
        backgroundColor: 'transparent',
      }}
      textInputProps={{
        placeholder: 'Specify your specialisation',
        placeholderTextColor: theme.colors.textGrey,
        style: {
          backgroundColor: 'transparent',
          fontFamily: 'regular',
          paddingLeft: 0,
          fontSize: 18,
          borderBottomColor: theme.colors.surface,
          borderBottomWidth: 1,
        },
      }}
      rightButtonsContainerStyle={{
        right: -10,
        height: 30,
        top: 6,
        alignSelfs: 'flex-end',
        backgroundColor: 'transparent',
      }}
      // @ToDo implement text style for list items
      // renderItem={(item, text) => (
      //   <Text key={item.id} type="regular" color="black" size={16} textStyle={{ padding: 15 }}>{item.title}{text}</Text>
      // )}
      suggestionsListContainerStyle={{
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        // elevation: 20,
        marginBottom: 20,
        // zIndex: 20,
      }}
    />
  );
}

export default AutoCompleteDropdown;
