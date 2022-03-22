import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/home/Home';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>      
      </NavigationContainer>    
  );
}
