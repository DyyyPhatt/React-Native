import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, OnBoardingScreen} from '../screens';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import ProfileEditScreen from '../screens/auth/ProfileEditScreen';
import OtpVerifyRegisterScreen from '../screens/auth/OtpVerifyRegisterScreen';
import VerifyOtpUpdateProfileScreen from '../screens/auth/VerifyOtpUpdateProfileScreen';
import ProductDetail from '../screens/auth/ProductDetail';
import Brand from '../screens/auth/Brand';
import Category from '../screens/auth/Category';
import SearchScreen from '../screens/auth/Search';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Brand" component={Brand} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />

      <Stack.Screen name="Category" component={Category} />

      <Stack.Screen
        name="VerifyOtpUpdateProfileScreen"
        component={VerifyOtpUpdateProfileScreen}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />

      <Stack.Screen
        name="OtpVerifyRegisterScreen"
        component={OtpVerifyRegisterScreen}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
