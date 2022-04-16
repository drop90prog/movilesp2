import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './src/pages/home/Home';
import Signin from './src/pages/signin/signin';
import Signup from './src/pages/signup/signup';

import Toptabs from './src/pages/chapters/toptabs';
import ImageViewerR from './src/components/imageViewerR';
import ImageViewerL from './src/components/imageViewerL';
import ImageViewerU from './src/components/imageViewerU';
import ImageViewerD from './src/components/imageViewerD';

import Ivr from './src/components/ivR';
import Ivl from './src/components/ivL';
import IvD from './src/components/ivD';
import IvU from './src/components/ivU';

import Noimage from './src/components/noimage';


const Stack = createStackNavigator();

export default function Stacknavigation() {
  return (      

        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />                  
            <Stack.Screen options={{headerShown: false}} name="Toptabs" component={Toptabs} />
            <Stack.Screen options={{headerShown: false}} name="Signup" component={Signup} />  
            <Stack.Screen options={{headerShown: false}} name="Signin" component={Signin} />
            <Stack.Screen options={{headerShown: false}} name="ImageViewerR" component={ImageViewerR} />
            <Stack.Screen options={{headerShown: false}} name="ImageViewerL" component={ImageViewerL} /> 
            <Stack.Screen options={{headerShown: false}} name="ImageViewerU" component={ImageViewerU} /> 
            <Stack.Screen options={{headerShown: false}} name="ImageViewerD" component={ImageViewerD} />  

            <Stack.Screen options={{headerShown: false}} name="Ivr" component={Ivr} />
            <Stack.Screen options={{headerShown: false}} name="Ivl" component={Ivl} />
            <Stack.Screen options={{headerShown: false}} name="IvD" component={IvD} />
            <Stack.Screen options={{headerShown: false}} name="IvU" component={IvU} />

            <Stack.Screen options={{headerShown: false}} name="Noimage" component={Noimage} />
        </Stack.Navigator> 
  );
}


const styles = StyleSheet.create({
  container: {    
    flex: 1,    
  },    
});

