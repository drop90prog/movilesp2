import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import New from './src/pages/new/new';

import Stacknavigation from './stackNavigation';


import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation(props) {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Mangas") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name == "New") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: true,
        })}
      >




        <Tab.Screen name="Mangas" component={Stacknavigation} />{/* Home */}
        <Tab.Screen name="New" component={New} />
      </Tab.Navigator>   
    </NavigationContainer>   









  );
}
