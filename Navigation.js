import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signin from './src/pages/signin/signin';
import Signup from './src/pages/signup/signup';
import Home from './src/pages/home/home';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />            
        </Stack.Navigator>      
      </NavigationContainer>    
  );
}
