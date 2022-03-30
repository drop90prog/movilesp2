import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import { saveChapter } from '../../../controllers/fetchChapter';
import { updateManga, deleteManga } from '../../../controllers/fetchManga';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../../controllers/storages';

export default function Newchapter(props) {

  const [mangaName, setManganame] = useState('');
  const [mangaId, setMangaid] = useState('');
  const [chapterName, setChapterName] = useState([])
  const [chapterNumber, setChapternumber] = useState(null)
  const [chapters, setChapters] = useState([])
 


  useFocusEffect(
    React.useCallback(()=>{     

      const u = async()=>{
        let l =  JSON.parse(await getData('manga'))
        const manganamee = l[1]
        const mangaidee = l[0]
        setMangaid(mangaidee)
        setManganame(manganamee)
        console.log(`current manga: ${manganamee}, id:${mangaidee}`)         
      }
      u()
    },[])
  )

  return (
    <View style={styles.container}>
      <View>
          <TextInput style={styles.name}          
          onChangeText={chapter => setChapterName(chapter)}
          placeholder="name"            
          />
      </View>

      <View>
          <TextInput style={styles.name}          
          onChangeText={number => setChapternumber(number)}
          placeholder="number"          
          />
      </View>

      <Button style={styles.button} 
      title="Add"
      mode="contained" 
      onPress={() => {
        if(!chapterNumber){
          alert('fill the number field')
        }else{        saveChapter(mangaId ,chapterName, chapterNumber) 
          .then(res => {
          alert(res.message)
          }).catch(error => console.error('Error:', error))}}}
      />


      <View>
        <Text style={{marginTop:40}}>editar manga</Text>
          <View>
              <TextInput style={styles.name}          
              onChangeText={manganeim => setManganame(manganeim)}
              placeholder="number"
              value={mangaName}
              />
          </View>
          <View>
            <Button style={styles.button} 
            title="update"
            mode="contained" 
            onPress={() => {
                updateManga(mangaId, mangaName) 
                .then(res => {
                alert(res.message)
                }).catch(error => console.error('Error:', error))}}
            />
          </View>


          <View style={{marginTop:20}}>
            <Button 
            title="delete manga"
            mode="contained" 
            onPress={() => {             
                deleteManga(mangaId) 
                .then(res => {
                alert(res.message)
                props.navigation.navigate('Home')
                }).catch(error => console.error('Error:', error))
              }}
            />
          </View>





      </View>


    </View>
  );
}

