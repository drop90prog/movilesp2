import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    
    <Provider store={store}>
      <Navigation/>
    </Provider>
   
    
  );
}


