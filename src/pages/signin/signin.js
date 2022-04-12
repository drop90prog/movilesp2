import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { signIn } from '../../controllers/fetchUser';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/slices/userSlice';
import { storeData } from '../../controllers/storages';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function Signin(props,{ navigation }) {
    const dispatch = useDispatch();
    const jwtDecode = require('jwt-decode');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [anima, setAnima] = useState(false)


  return (

    <View  style={styles.lienzo}>

      <View style={styles.container}>
          <View style={styles.inputEmailContainer}>

            <View >
              <MaterialCommunityIcons name="email-outline" size={24} color="gray" />
            </View>

            <View style={styles.inputEmail}>
              <TextInput style={styles.email}
              label="Email"
              value={email}
              onChangeText={email => setEmail(email)}
              placeholder="Enter E-Mail"            
              />
            </View>


          </View>

        <View style={styles.inputEmailContainer}>
          
            <View>
              <Ionicons name="key-outline" size={24} color="gray"/>
            </View>

            <View style={styles.inputEmail}>
              <TextInput style={styles.email}
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
                placeholder="Enter Password"
                />            
            </View>
          




        </View>


        <TouchableOpacity 
          style={{justifyContent:'center',
          width:'100%', backgroundColor:'orange',
          height:50, marginVertical:30,borderRadius:10,}} 
          onPress={() => {
            if(email && password){
            setAnima(true)
            signIn(email, password)    
            .then(res => {

                setAnima(false)
                if(!res.message){
                let user = jwtDecode(res.token)
                storeData('user',JSON.stringify(user))
                props.navigation.navigate('Home')
                }else{alert(res.message)}
            }).catch(error => console.error('Error:', error))}
            else {setAnima(false);alert("Please fill the fields")}
            }}         
          >


   

            {!anima?<Text style={{fontSize:15,
              letterSpacing:1.5,
              textAlign:'center',
              position:'relative',
              color:'white'}} >Sign In</Text>:


              <ActivityIndicator size='large' color='white'/>}

        </TouchableOpacity>
        
  


        <Text style={styles.text}>
          Don't have an account yet?
          
          <Text style={{ color: 'orange', fontWeight: 'bold' }}            
            onPress={()=> props.navigation.navigate('Signup')}> Sign up.
          </Text>          
        </Text>

      </View>    
    
    </View>
  );
}

