import { Text, View, TextInput, Button, Image, ActivityIndicator, ScrollView } from 'react-native';
import { styles } from './styles';
import React, { useEffect, useState } from 'react';
import { signUp, updateUser } from '../../controllers/fetchUser';
import { getData, storeData, removeData } from '../../controllers/storages';
import { findFollowsMangas, deleteFollow } from '../../controllers/fetchFollows';

import { useFocusEffect } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import Firebase from 'firebase/app';
import { firebaseConfig } from '../../controllers/storages';
import 'firebase/storage'; 




export default function Profile() {
    const [name, setName] = useState('');
    const [iduser, setIduser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [again, setAgain] = useState('');
    const [admin, setAdmin] = useState(false)
    const [ avatar, setAvatar ] = useState('')
    const jwtDecode = require('jwt-decode');
    const [rend, setRend] = useState(true)
    const [image, setImage] = useState(null);
    const [poster, setPoster] = useState(null);
    const [showFollowing, setShowfollowing] = useState(false);
    const [followingMangas, setFollowingMangas] = useState([])
    const [change, setChange] = useState(false)
    const [allowed, setAllowed] = useState(false)
    const [isShown, setIshown] = useState(true)
    const [inProcess, setInprocess] = useState(false)
    


    useFocusEffect(
      React.useCallback(()=>{
        getData('user').then((res)=>{
          if(res){
            let a = JSON.parse(res)
            setName(a.name)
            setEmail(a.email)
            setAvatar(a.avatar)
            setIduser(a.sub)
            setAllowed(true)
            findFollowsMangas(a.sub).then((res)=>{
              setFollowingMangas(res.result)
            })
          }
          else { setAllowed(false)}


          }).catch(err=>{console.log(err); setAllowed(false)})
      },[rend, change])
    )



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
        
        setPoster(url)
        updateUser('', '', '', iduser, url).then((res)=>{
  
          if(res.status==200){
            res.json().then(response=>{
              /* alert(response.message) */
            
              let user = jwtDecode(response.token)

              removeData('user')            
              storeData('user',JSON.stringify(user))
              setRend(!rend)
              setInprocess(false)
              setImage(null)  
              
            }).catch(err=>console.log(err))
          }else alert("error")  
        }).catch(err=>console.log(err))

















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
  

  function asd(){
var follows;
    if(followingMangas!=undefined){
    follows = followingMangas.map((item, index)=>{
      return(
        <View style={styles.followingMangas} key={index}>
          <View style={{justifyContent:'center'}}>
            <Text>{item.name}</Text>
          </View>
          <View >
            <Button title='unfollow' onPress={()=>{
              deleteFollow(item.iduser, item.idmanga).then((res)=>{
  
  
                findFollowsMangas(item.iduser).then((res)=>{
                  setFollowingMangas(res.result)
                })
  
                alert(res.message)
              })
  
            }}/>
          </View>
          
        </View>
      )
    })
    return follows
  }else return alert("0 mangas following")   
    
  }

  
  



  return (
<ScrollView style={styles.lienzo}>
  <View  style={styles.content}>
    {allowed?
    <View style={styles.allowedContent}>
      <View style={inProcess ? styles.avatarContainerInProcess: styles.avatarContainer}>
      {inProcess?
      <View style={{position:'absolute', top:'50%', left:'50%'}}>
        <ActivityIndicator size={'large'} color={'orange'}/>
      </View>:null}
      

        <View>
          {avatar?<Image source={{uri:avatar}} style={{height:90, width:90, borderRadius:5}}/>:console.log("loading")}
        </View>
        

        <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>

          <View >
            {!image?<Button title="Pick Image" onPress={pickImage} />:
            /*<Button title="Share" onPress={openShareDialogAsync} /> */
              <Button title="Save" onPress={()=>{setInprocess(true);uploadImage()}} />
            }
              {/* 
              {image?
              <TouchableOpacity onPress={()=>{setImage(null)}}>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              </TouchableOpacity>:null}
               */}              
          </View>

          <View>
            {image? <Button title="Cancel" color={'red'} onPress={()=>{setImage(null)}} />:null}
          </View>

        </View>

      </View>
      
      <View style={styles.inputsContainer}>
        <View style={styles.input} >
            <Text style={{color:'gray'}}>Username: </Text>
            <TextInput        
              onChangeText={newText => setName(newText)}
              defaultValue={name}   
              placeholder="Enter username"           
            />
        </View>

        <View style={styles.input}>
            <Text style={{color:'gray'}}>Email: </Text>
            <TextInput 
              label="Email"
              onChangeText={a => setEmail(a)}
              placeholder="Enter e-mail"
              value={email}
            />
        </View>

        <View style={[styles.input, {flexDirection:'row', justifyContent:'space-around'}]}>
          <View>
            <Text style={{color:'gray'}}>Password: </Text>
              <TextInput 
                label="Password"
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
                placeholder="Enter password"
                value={password}
              />
          </View>

          <View>
            <Text style={{color:'gray'}}>Again: </Text>
                <TextInput 
                label="Password"
                onChangeText={password => setAgain(password)}
                secureTextEntry={true}
                placeholder="Enter password"
                value={again}
              />
          </View>
        </View>

        <View style={styles.button}>
          <Button  color={'orange'}
            title="update"
            mode="contained" 
            onPress={() => { 

              if(name!='' || email!=''){
                if(password == again){
                  updateUser(name, email, password, iduser, poster).then((res)=>{
  
                    if(res.status==200){
                      res.json().then(response=>{
                        alert(response.message)
                      
                        let user = jwtDecode(response.token)
    
                        removeData('user')            
                        storeData('user',JSON.stringify(user))
                        setRend(!rend)
                        setPassword('')
                        setAgain('')
                        
                      }).catch(err=>console.log(err))
                    }else alert("error")  
                  }).catch(err=>console.log(err))

                }else alert("Passwords must match")
              }else alert("please fill the fields")








            }}
          />
        </View>



      </View>


      <View style={styles.followingMangasContainer}>
        <View style={{ width:'80%', }}>
          <Button 
          title = {isShown ? 'show following mangas':'hide following mangas'} 
          onPress={()=>{
            setIshown(!isShown)
            setShowfollowing(!showFollowing)
            setChange(!change)
          }}/>
        </View>

        {showFollowing?
        <View>
          {asd()}
        </View>:null}





      </View>

    </View>:
    <View>
      <Text>bobisss</Text>
    </View>}


  </View>
</ScrollView>
  );
}

