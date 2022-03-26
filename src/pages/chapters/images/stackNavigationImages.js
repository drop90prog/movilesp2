import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Chapters from '../chapters';



import Images from './images';



const Stack = createStackNavigator();

export default function StackNavigationImages() {
  return (      
        
    <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Chaps" component={Chapters} />  
        <Stack.Screen options={{headerShown: false}} name="Images" component={Images} />          
    </Stack.Navigator>
 
  );
}


const styles = StyleSheet.create({
  container: {    
    flex: 1,    
  },    
});

