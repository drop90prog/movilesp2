import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { signUp, updateUser } from '../../controllers/fetchUser';
import { getData, storeData, removeData } from '../../controllers/storages';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import Firebase from 'firebase/app';
import { firebaseConfig } from '../../../firebase';
import 'firebase/storage'; 




export default function Profile() {
    const [name, setName] = useState('');
    const [iduser, setIduser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [admin, setAdmin] = useState(false)
    const [ avatar, setAvatar ] = useState('')
    const jwtDecode = require('jwt-decode');
    const [rend, setRend] = useState(true)
    const [image, setImage] = useState(null);
    const [poster, setPoster] = useState(null);
    

    useEffect(()=>{
        getData('user').then((res)=>{
            let a = JSON.parse(res)
            setName(a.name)
            setEmail(a.email)
            setAvatar(a.avatar)
            setIduser(a.sub)
            })
    },[rend])

//*****************************************************************************
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
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
        /* console.log("Download URL: ", url)   */
        setImage(null)  
        setPoster(url)
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



  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(image);
  };

        

  return (
<ScrollView>
    <View  style={styles.contender}>

    <View>
        {avatar?<Image source={{uri:avatar}} style={{height:90, width:90}}/>:console.log("loading")}
    </View>


    <View>
        <TextInput style={styles.email}        
        onChangeText={newText => setName(newText)}
        defaultValue={name}   
        placeholder="Enter username"           
        />
    </View>

    <View>
        <TextInput style={styles.email}
        label="Email"
        onChangeText={a => setEmail(a)}
        placeholder="Enter e-mail"
        value={email}
        />
    </View>

    <View >
        <TextInput style={styles.password}
        label="Password"
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
        placeholder="Enter password"
        />
    </View>

    <Button style={styles.button} 
    title="update"
    mode="contained" 
    onPress={() => { 
        updateUser(name, email, password, iduser, poster).then((res)=>{
            alert(res.message)
            
            let user = jwtDecode(res.token)

            removeData('user')            
            storeData('user',JSON.stringify(user))
            setRend(!rend)

        })    
    
    } }
    />



        <View style={{marginTop:20}}>
          {!image?<Button title="Pick an image from camera roll" onPress={pickImage} />:
          <Button title="Share" onPress={openShareDialogAsync} />
          }
            {image && 
            <TouchableOpacity onPress={()=>{setImage(null)}}>
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            </TouchableOpacity>}
            {image && <Button title="upload" onPress={uploadImage} />}
        </View>

    </View>
</ScrollView>
  );
}

