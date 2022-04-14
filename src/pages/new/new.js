import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { styles } from './styles';
import React, { useState } from 'react';
import { saveManga } from '../../controllers/fetchManga';
import { getData } from '../../controllers/storages';
import { useFocusEffect } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import Firebase from 'firebase/app';
import { firebaseConfig } from '../../controllers/storages';
import 'firebase/storage'; 

export default function New(props) {
  const [allowed, setAllowed] = useState(false)

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [poster, setPoster] = useState(null);
  const [creatorid, setCreatorid] = useState('')



  useFocusEffect(
    React.useCallback(()=>{
      getData('permissions').then(res=>{
        if(res){
          let per = JSON.parse(res)
          if(per.isLogged)setAllowed(true)
          if(!per.isLogged)setAllowed(false)//necesrio, porque sino queda guardado el true y luego estes deslogueado seguira siendo true
          console.log(`new manga: logged: ${per.isLogged}, admin: ${per.isAdmin}`)
        }

      }).catch((err)=>{console.log(err)})

      getData('user').then(res=>{
        if(res){
          let user = JSON.parse(res); 
          setCreatorid(user.sub)
        }
})
      .catch((err)=>{console.log(err)})
    },[])
  )

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


        saveManga(name, url, creatorid)
        .then(res => {
        setName(null)
        setImage(null)
        setPoster(null)
        alert(res.message)
        }).catch(error => console.error('Error:', error))



        blob.close()
        return url;
      }).catch(err=>console.log(err))
    })
  }//subida de archivos a firebase
//*****************************************************************************
  //Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.
  //Look for the variable MAX_TIMER_DURATION_MS
  //Change its value to 10000 * 1000
  //Save the changes (with auto format turned off) and re-build your app.





  return (
    <View style={styles.lienzo}>

      <View style={styles.container}>     

        {allowed?
        <View>

          <View style={{marginVertical:30}}>
              <Text style={{fontSize:30, color:'gray', alignSelf:'center'}}>Register Manga</Text>
            </View>

            <View style={styles.inputContainer}>
                  <TextInput style={styles.input}
                  onChangeText={name => setName(name)}
                  placeholder="Enter manga name"        
                  />
              </View>


              <View style={styles.buttonsContainer}>
                <View style={!image?{marginVertical:30}:{marginTop:30}}>
                  <Button 
                    disabled={name?false:true}
                    title="Add Manga no image"
                    mode="contained" 
                    onPress={() => {

                      saveManga(name, poster, creatorid)
                      .then(res => {
                      setName(null)
                      setImage(null)
                      setPoster(null)
                      alert(res.message)
                      }).catch(error => console.error('Error:', error))}
                      }
                  />
                </View>

                <View >

                {image?<Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>:null}
                  {image?<Button color={'red'} title="cancel" onPress={()=>setImage(null)}/>:null}
                  {!image?
                  <Button title="Pick Image" onPress={pickImage} />:
                  <Button title="Add manga and image" disabled={name?false:true} onPress={uploadImage}/>}


                  
                </View>             
              </View>
        </View>:
        <View style={styles.notAllowedContent}>
          <View>
            <View style={{alignSelf:'center', width:50, marginBottom:20}}>
              <Octicons name="stop" size={50} color="red" />
            </View>
          
            <Text style={styles.text}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}> Sign in </Text>
              to get access
            </Text>
          </View>

          
        </View>
        }
      </View>
    </View>
  );
}

