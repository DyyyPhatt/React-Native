import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeScreen, UserProfileScreen} from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  //Tab gọi Home
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
