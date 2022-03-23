import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { fetchSignUp } from '../controllers/fetchSignUp';



export default function Signup({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
  return (

    <View  style={styles.contender}>


    <View>
        <TextInput style={styles.email}
        label="Email"
        onChangeText={name => setName(name)}
        placeholder="Enter username"        
        />
    </View>

    <View>
        <TextInput style={styles.email}
        label="Email"
        onChangeText={email => setEmail(email)}
        placeholder="Enter e-mail"        
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


    <View >
        <TextInput style={styles.password}
        label="Password"
        onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
        secureTextEntry={true}
        placeholder="Repeat password"
        />
    </View>

    <Button style={styles.button} 
    title="Sign up"
    mode="contained" 
    onPress={() => { fetchSignUp(name, email, password) } }
    />
        
    

    <Text style={styles.text}>
        Don't have an account yet?
        
        <Text style={{ color: 'blue' }}            
          onPress={()=> navigation.navigate('Signin')}> Sign in.
        </Text>

        {/* <TouchableOpacity onPress={()=> props.navigation.navigate('Signup')}>
            <Text>ir a Sign up.</Text>
        </TouchableOpacity> */}            
        
    </Text>

</View>
  );
}

