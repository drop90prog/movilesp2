import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Chapters from './src/pages/chapters/chapters';
import Home from './src/pages/home/home';


import Toptabs from './src/pages/chapters/toptabs';


const Stack = createStackNavigator();

export default function Stacknavigation() {
  return (      
        
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />                  
            <Stack.Screen options={{headerShown: false}} name="Toptabs" component={Toptabs} />
        </Stack.Navigator> 
  );
}


const styles = StyleSheet.create({
  container: {    
    flex: 1,    
  },    
});

