import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { styles } from './styles';
import { useState } from 'react';
import { saveManga } from '../../controllers/fetchManga'

export default function New({navigation}) {
  const user = useSelector((state) => state.user); // datos del usuario logueado

  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View>
          <TextInput style={styles.name}          
          onChangeText={name => setName(name)}
          placeholder="Enter name"        
          />
      </View>

      <Button style={styles.button} 
      title="Add"
      mode="contained" 
      onPress={() => { saveManga(name) 
        .then(res => {
        alert(res.message)
        }).catch(error => console.error('Error:', error))}}/>

    </View>
  );
}

