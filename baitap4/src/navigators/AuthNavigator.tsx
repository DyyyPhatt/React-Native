import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  VerifyOtpScreen,
  UserProfileScreen,
  OnboardingScreen,
  HomeScreen,
} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  //Auth gọi Login
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
