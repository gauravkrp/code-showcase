import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { AuthScreenName } from 'src/navigation/screenNames';

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        borderRadius: 3,
        backgroundColor,
      }}
    />
  );
};

const CustomButton = ({ label, ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10, padding: 10 }} {...props}>
    <Text style={styles.buttonTextStyle}>{label}</Text>
  </TouchableOpacity>
);

const Skip = ({ ...props }) => <CustomButton label="Skip" {...props} />;
const Next = ({ ...props }) => <CustomButton label="Next" {...props} />;
const Done = ({ ...props }) => <CustomButton label="Done" {...props} />;

const OnboardingScreen = ({ navigation }) => {
  const onSKipOrDone = () => {
    navigation.replace(AuthScreenName.RequestOTP);
  };

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={onSKipOrDone}
      onDone={onSKipOrDone}
      pages={[
        {
          backgroundColor: '#c2e2d8',
          image: <Image source={require('../../../assets/onboarding-img1.png')} />,
          title: 'myApp fitness',
          subtitle: 'Better way to communicate fitnesscare information',
        },
        {
          backgroundColor: '#fcf4cf',
          image: <Image source={require('../../../assets/onboarding-img2.png')} />,
          title: 'myApp fitness',
          subtitle: 'Fast, direct communication with one\neasy-to-use app',
        },
        {
          backgroundColor: '#ecddde',
          image: <Image source={require('../../../assets/onboarding-img3.png')} />,
          title: 'myApp fitness',
          subtitle: 'Coordinate and collaborate seamlessly\non patient care',
        },
      ]}
      titleStyles={{ fontFamily: 'medium' }}
      subTitleStyles={{ fontFamily: 'regular' }}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  buttonTextStyle: {
    fontFamily: 'regular',
    fontSize: 16,
  },
});
