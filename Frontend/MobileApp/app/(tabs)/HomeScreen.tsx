import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Logs"
        onPress={() => navigation.navigate('Logs')}  // Navigate to the Logs screen
      />
    </View>
  );
};

export default HomeScreen;
