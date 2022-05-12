/* eslint-disable react-native/sort-styles */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import PhoneInput from "react-native-phone-number-input";

import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import { showToast } from 'src/components/Toast';
import { theme } from 'src/core/theme';
import ApiRoutes from 'src/core/apiRoutes';
import { AuthScreenName } from 'src/navigation/screenNames';

const API = new ApiRoutes();

const RequestOTPScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const onPress = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      return;
    }
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);

    API.requestOTP(mobileNumber)
      .then(res => {
        setSubmitting(false);
        switch (res.api.responseCode) {
          case 2190:
            navigation.navigate(AuthScreenName.VerifyOTP, { mobileNumber });
            showToast('OTP sent successfully!');
            break;
          case 5150:
            showToast('Unable to send OTP. Try again?');
            break;
          default:
            showToast('Unable to send OTP. Try again?');
            console.log('res', res);
            break;
        }
      })
      .catch(err => {
        setSubmitting(false);
        showToast('Unable to send OTP. Try again?');
        console.log('error', err);
      })
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'}>
        <StatusBar style="dark" />
        <View style={styles.loginHeader}>
          <Text size={24} color="primary" type="medium">
            myApp&nbsp;
          </Text>
          <Text size={24} color="secondary" type="regular">
            fitness
          </Text>
        </View>

        <View style={styles.loginContainer}>
          <Text size={30} color="primary" type="bold">
            Enter your mobile number
          </Text>
          <Text size={16} color="textGrey" type="regular" textStyle={{ marginTop: 15 }}>
            You'll receive a six digit OTP to verify your mobile number.
          </Text>
          <View style={styles.mobileNumberInputWrapper}>
            <Text size={20} color="primary" type="medium" textStyle={{ marginRight: 10 }}>
              +91
            </Text>
            <TextInput
              labelValue={mobileNumber}
              onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
              keyboardType="numeric"
              autoFocus={true}
              style={styles.input}
              returnKeyType="go"
              maxLength={10}
              onSubmitEditing={onPress}
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically={true}
              editable={!isSubmitting}
              textContentType="telephoneNumber"
            />

            <View style={{ width: 80 }}>
              {isSubmitting ? (
                <ActivityIndicator animating={true} size="small" color={theme.colors.primary} />
              ) : (
                <Button
                  title="Login"
                  onPress={onPress}
                  style={styles.loginButton}
                  disabled={!mobileNumber || mobileNumber.length !== 10}
                >
                  <Icon
                    name="arrow-next"
                    size={30}
                    color={
                      mobileNumber && mobileNumber.length === 10
                        ? theme.colors.primary
                        : theme.colors.border
                    }
                  />
                </Button>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestOTPScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 60,
    flex: 1,
  },
  loginHeader: {
    alignItems: 'center',
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 10,
  },
  loginContainer: {
    marginTop: 10,
  },
  mobileNumberInputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomColor: theme.colors.surface,
    borderBottomWidth: 1,
    fontFamily: 'medium',
    color: theme.colors.primary,
    fontSize: 20,
    letterSpacing: 1,
  },
});
