import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';  // Import the HomeScreen component
import LogScreen from './LogScreen';    // Import the LogScreen component

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Logs" component={LogScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
