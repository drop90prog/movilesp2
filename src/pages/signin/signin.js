import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { signIn } from '../../controllers/fetchUser';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/slices/userSlice';
import { storeData } from '../../controllers/storages'



export default function Signin(props,{ navigation }) {
    const dispatch = useDispatch();
    const jwtDecode = require('jwt-decode');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  return (

    <View  style={styles.contender}>


    
    <View>
        <TextInput style={styles.email}
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder="Enter E-Mail"
        
        />
    </View>

    <View >
        <TextInput style={styles.password}
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
        placeholder="Enter Password"
        />
    </View>
   
    <Button style={styles.button} 
    title="Sign in"
    mode="contained" 
    onPress={() => {       
    signIn(email, password)    
    .then(res => {
        let user = jwtDecode(res.token)
        storeData('user',JSON.stringify(user))
        props.navigation.navigate('Home')
    }).catch(error => console.error('Error:', error))}
        

    }
    />
        
  


    <Text style={styles.text}>
        Don't have an account yet?
        
        <Text style={{ color: 'blue' }}            
          onPress={()=> navigation.navigate('Signup')}> Sign up.
        </Text>

        {/* <TouchableOpacity onPress={()=> props.navigation.navigate('Signup')}>
            <Text>ir a Sign up.</Text>
        </TouchableOpacity> */}            
        
    </Text>

</View>
  );
}

