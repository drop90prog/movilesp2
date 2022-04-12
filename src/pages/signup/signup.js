import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { signUp } from '../../controllers/fetchUser';
import { CheckBox } from 'react-native-elements';





export default function Signup(props, {navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [admin, setAdmin] = useState(false)
    const [anima, setAnima] = useState(false)


  return (
<ScrollView>
    <View  style={styles.lienzo}>

    <View style={styles.container}>
        <View>
            <Text style={{fontSize:30, color:'gray', alignSelf:'center'}}>Register form</Text>
        </View>
        <View>
            <View style={styles.inputEmailContainer}>
                <TextInput style={styles.email}
                label="Email"
                onChangeText={name => setName(name)}
                placeholder="Enter username"        
                />
            </View>

            <View style={styles.inputEmailContainer}>
                <TextInput style={styles.email}
                label="Email"
                onChangeText={email => setEmail(email)}
                placeholder="Enter e-mail"        
                />
            </View>

            <View style={styles.inputEmailContainer}>
                <TextInput style={styles.password}
                label="Password"
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
                placeholder="Enter password"
                />
            </View>


            <View style={styles.inputEmailContainer}>
                <TextInput style={styles.password}
                label="Password"
                onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
                secureTextEntry={true}
                placeholder="Repeat password"
                />
            </View>
        </View>
    

        <TouchableOpacity 
          style={{justifyContent:'center',
          width:'100%', backgroundColor:'orange',
          height:50, marginTop:20,borderRadius:10,}} 
          

          onPress={() => {
            if(name!='' || email!='' || password!='' || repeatPassword!=''){
                if(password == repeatPassword){
                    setAnima(true)
                    signUp(name, email, password, admin)   
                    .then(res => {        
                        if(res.status==200) {
                            res.json().then((response)=>{
                                setAnima(false)
                                alert(response.message)    
                            })
                        }else{
                            setAnima(false)
                            res.json().then(response=>alert(response.message))
                        }
                                           
                    }).catch(error => console.error('Error:', error))}
                    else {setAnima(false);alert("The passwords provided don't match")}
                }else {setAnima(false);alert("Please fill the fields")}
            

            }}         
          >


   

            {!anima?<Text style={{fontSize:15,
              letterSpacing:1.5,
              textAlign:'center',
              color:'white'}} >Sign up</Text>:


              <ActivityIndicator size='large' color='white'/>}

        </TouchableOpacity>





        <View style={{marginTop:10}}>
            <CheckBox 
            checked={admin} 
            onPress={()=>{setAdmin(!admin)}}  
            title="admin"
            />
        </View>
            

        <Text style={styles.text}>
          Don't have an account yet?          
          <Text style={{ color: 'orange', fontWeight: 'bold' }}            
            onPress={()=> props.navigation.navigate('Signin')}> Sign in.
          </Text>          
        </Text>
        
    </View>
</View>
</ScrollView>
  );
}

