import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { signUp, updateUser } from '../../controllers/fetchUser';
import { getData, storeData, removeData } from '../../controllers/storages';





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

    useEffect(()=>{
        getData('user').then((res)=>{
            let a = JSON.parse(res)
            setName(a.name)
            setEmail(a.email)
            setAvatar(a.avatar)
            setIduser(a.sub)
            })
    },[rend])
        

  return (

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
        updateUser(name, email, password, iduser).then((res)=>{
            alert(res.message)
            
            let user = jwtDecode(res.token)

            removeData('user')            
            storeData('user',JSON.stringify(user))
            setRend(!rend)

        })    
    
    } }
    />


    
</View>
  );
}

