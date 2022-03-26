import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { styles } from './styles';
import React, { useState } from 'react';
import { saveChapter } from '../../../controllers/fetchChapter';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../../controllers/storages';


export default function Newchapter() {


  const [name, setName] = useState('');
  const [chapterName, setChapterName] = useState([])



  useFocusEffect(
    React.useCallback(()=>{     
    
      const u = async()=>{
        const gettingmanga = await getData('manga')
        setName(gettingmanga) 
      }
      u()
    },[name])
  )

  return (
    <View style={styles.container}>
      <View>
          <TextInput style={styles.name}          
          onChangeText={chapter => setChapterName(chapter)}
          placeholder="Enter chapter name"        
          />
      </View>

      <Button style={styles.button} 
      title="Add"
      mode="contained" 
      onPress={() => { saveChapter(name, chapterName) 
        .then(res => {
        alert(res.message)
        }).catch(error => console.error('Error:', error))}}/>

    </View>
  );
}

