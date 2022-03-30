import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../../../controllers/storages';
import { saveImage } from '../../../../controllers/fetchImage';

import * as ImagePicker from 'expo-image-picker';

import Firebase from 'firebase/app';
import { firebaseConfig} from '../../../../../firebase';
import 'firebase/storage'; 

export default function Newimage() {


  const [chapterName, setChaptername] = useState('');
  const [chapterId, setChapterid] = useState('');
  const [manganame, setManganame] = useState('')
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);


  useFocusEffect(
    React.useCallback(()=>{

      //obtiene el nombre del manga
/*       const u = async()=>{
        let l =  JSON.parse(await getData('manga'))
        const manganamee = l[1]
        setManganame(manganamee)
        console.log(`current manga: ${manganamee}`)    
      }
      u() */

      //obtiene id(0) y nombre(1) del capitulo
      const o = async()=>{
        const gettingchapter = JSON.parse(await getData('chapter'))
        setChapterid(gettingchapter[0])
        setChaptername(gettingchapter[1])  
        console.log(`chaptername: ${gettingchapter[1]}, chapterid: ${gettingchapter[0]}`)   
      }
      o()
      },[manganame])





  )//useEffect









//*****************************************************************************
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    });
  
    console.log(result); 
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
//*****************************************************************************
  if(!Firebase.apps.length){
    Firebase.initializeApp(firebaseConfig)
  }
//*****************************************************************************
  const uploadImage = async ()=>{
  
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    const ref = Firebase.storage().ref().child(new Date().toString())
    const snapshot = ref.put(blob)
    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED, ()=>{
    },
    (error)=>{
      blob.close()
      return error
    },
    ()=>{
      snapshot.snapshot.ref.getDownloadURL().then((url)=>{
        console.log("Download URL: ", url)  

       


        saveImage(chapterId, url) 
        .then(res => {
        setImage(null)
        alert(res.message)
        }).catch(error => console.error('Error:', error))








        blob.close()
        return url;
      })
    })
  }//subida de archivos a firebase
//*****************************************************************************




  //Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.
  //Look for the variable MAX_TIMER_DURATION_MS
  //Change its value to 10000 * 1000
  //Save the changes (with auto format turned off) and re-build your app.





  return (
    <View style={styles.container}>

      <Button style={styles.button} 
      title="Add"
      mode="contained" 
      onPress={() => { 
        saveImage(chapterId, url) 
        .then(res => {
        setImage(null)
        setUrl(null)
        alert(res.message)
        }).catch(error => console.error('Error:', error))}}
      />


      <View >
        <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && 
          <TouchableOpacity onPress={()=>{setImage(null)}}>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          </TouchableOpacity>}
          {image && <Button title="upload" onPress={uploadImage} />}
      </View>

    </View>
  );
}

