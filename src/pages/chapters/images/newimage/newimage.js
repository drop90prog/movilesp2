import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../../../controllers/storages';
import { deleteImage, saveImage } from '../../../../controllers/fetchImage';
import { updateChapter, deleteChapter } from '../../../../controllers/fetchChapter';

import * as ImagePicker from 'expo-image-picker';

import Firebase from 'firebase/app';
import { firebaseConfig} from '../../../../../firebase';
import 'firebase/storage'; 

export default function Newimage(props) {


  const [chapterName, setChaptername] = useState('');
  const [chapterId, setChapterid] = useState('');
  const [manganame, setManganame] = useState('')
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [images, setImages] = useState([]);

  const [userId, setUserid] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [creatorid, setCreatorid] = useState('');


//obtiene si es admin o no
  getData('permissions').then(res=>{
    let per = JSON.parse(res)
    if(per.isAdmin)setAllowed(true)
   
   // console.log(`(new chapter) admin: ${per.isAdmin}`)
  })

  //obtiene id del user loggeado
  getData('user').then(res=>{
    if(res){
      let us = JSON.parse(res)
      setUserid(us.sub)
    }
  })

  //obtiene id(0) y nombre(1) del capitulo
  getData('chapter').then(res=>{
    let gettingchapter = JSON.parse(res)
    setChapterid(gettingchapter[0])
    setChaptername(gettingchapter[1])  
   // console.log(`chaptername: ${gettingchapter[1]}, chapterid: ${gettingchapter[0]}`)   
  })

  //obtiene id del creador del manga
  getData('manga').then(res=>{
    let l = JSON.parse(res)
    const creatoridd = l[2]
    setCreatorid(creatoridd)
  
    //console.log(`current manga: ${manganamee}, id:${mangaidee}, creatorid: ${creatoridd}`)         
  })




  useFocusEffect(
    React.useCallback(()=>{

      if(userId==creatorid){
/*         console.log(`userid: ${userId}, creatorid: ${creatorid}`) */
        setAllowed(true)
      }


      getData('images').then(res=>{  
        let imagess = JSON.parse(res)
        setImages(imagess)
 
        //console.log(`current manga: ${manganamee}, id:${mangaidee}, creatorid: ${creatoridd}`)         
      })
      
 
      },[manganame, userId, creatorid])





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
  
/*     console.log(result);  */
  
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
/*         console.log("Download URL: ", url)   */

       


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
      {allowed?<View> 




        <View >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && 
            <TouchableOpacity onPress={()=>{setImage(null)}}>
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            </TouchableOpacity>}
            {image && <Button title="upload" onPress={uploadImage} />}
        </View>

        <View>

              {images.map((item, index)=>{
        
                return(
                  <View key={index} >
                    <TouchableOpacity  onPress={()=>{
                      
                      deleteImage(item.id).then((res)=>{alert(res.message)})
                      
                      }}>
                      <View style={{height:30, width:100, backgroundColor:'lightgray', marginTop:20}}>
                        <Text>{index + 1}</Text>
                      </View>    
                    </TouchableOpacity>
                                   
                  </View>               
                )

              })}

        </View>

        <View style={{marginTop:40}}>
            <View>
                <TextInput style={styles.name}          
                onChangeText={chapterneim => setChaptername(chapterneim)}
                placeholder="number"
                value={chapterName}
                />
            </View>
            <View>
              <Button style={styles.button} 
              title="update"
              mode="contained" 
              onPress={() => {
                  updateChapter(chapterId, chapterName) 
                  .then(res => {
                  alert(res.message)
                  }).catch(error => console.error('Error:', error))}}
              />
            </View>

            <View style={{marginTop:20}}>
              <Button 
              title="delete chapter"
              mode="contained" 
              onPress={() => {              
                  deleteChapter(chapterId) 
                  .then(res => {
                  alert(res.message)
                  props.navigation.navigate('Chaps')
                  }).catch(error => console.error('Error:', error))
                }}
              />
            </View>
        </View>
      </View>:
      <View>
        <Text>qqq nooo jajaj bobisss</Text>
      </View>}

    </View>
  );
}

