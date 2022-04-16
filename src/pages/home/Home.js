import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { findMangas } from '../../controllers/fetchManga';
import  Mangas  from '../../components/mangas';
import { styles } from './styles';
import { signIn } from '../../controllers/fetchUser';
import { getData, removeData, storeData, clearAll } from '../../controllers/storages';
import { Foundation } from '@expo/vector-icons';

export default function Home(props,{navigation}) {

  const [mangas, setMangas] = useState([])
  const [isLogged, setIslogged] = useState(false)
  const [isAdmin, setIsadmin] = useState(false)
  const [username, setUsername] = useState('')
 
//useEffect en tabs, esto carga la pagina cuando entras a la tab
  useFocusEffect(
    React.useCallback(()=>{
      
      findMangas().then(res=>{setMangas(res.content)})


      getData('user').then(res=>{
        let user;

        if(res){ 
          user = JSON.parse(res);setIslogged(true)
          setUsername(user.name)
          if(user.admin) setIsadmin(true)       }
      })//from asyncstorage
    },[])
  )
console.log(`home: logged: ${isLogged}, admin: ${isAdmin}`)
storeData('permissions', JSON.stringify({isLogged:isLogged, isAdmin:isAdmin}))



  return (
    <View style={styles.lienzo}>
      <View style={styles.bodytop}>
        {!isLogged?<View style={{justifyContent:'space-around', flexDirection:'row', height: '100%' }}>

          <View style={{justifyContent:'center'}}>
            <TouchableOpacity 
                style={{justifyContent:'center', 
                width:80, backgroundColor:'orange',
                height:25, borderRadius:10,}} 
                onPress={()=>{props.navigation.navigate('Signin')}}    
                >
                <Text style={{fontSize:15,
                  letterSpacing:1.5,
                  textAlign:'center',
                  position:'relative',
                  color:'white'}} >Sign in</Text>
            </TouchableOpacity>
 
          </View>



          <View style={{justifyContent:'center'}}>

            <TouchableOpacity 
              style={{justifyContent:'center', 
              width:80, backgroundColor:'orange',
              height:25, borderRadius:10,}} 
              onPress={()=>{props.navigation.navigate('Signup')}}
              >
              <Text style={{fontSize:15,
                letterSpacing:1.5,
                textAlign:'center',
                position:'relative',
                color:'white'}} >Sign up</Text>

            </TouchableOpacity>
 
          </View>











        </View>:
        <View style={{justifyContent:'space-evenly', flexDirection:'row', height: '100%'}}>
          <View style={{justifyContent:'center'}}>

            <TouchableOpacity 
              style={{justifyContent:'center', 
              width:80, backgroundColor:'red',
              height:25, borderRadius:10,}} 
              onPress={() => {

                clearAll()
                removeData('user')
                removeData('manga')
                removeData('permissions')
                removeData('chapter')
                removeData('chapters')
                removeData('images')
                setIslogged(false)
                setIsadmin(false)
                props.navigation.navigate('Signin')

                }}         
              >
              <Text style={{fontSize:15,
                letterSpacing:1.5,
                textAlign:'center',
                position:'relative',
                color:'white'}} >Sign out</Text>

            </TouchableOpacity>
 
          </View>


          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
              <Text >Welcome, 
                <Text style={{fontWeight:'bold'}}> {username}.</Text>
              </Text>
            </View>

            {isAdmin?
            <View style={{marginLeft: 10, justifyContent:'center'}}>
              <Foundation name="crown" size={24} color="orange" />
            </View>:null}

          </View>






        </View>}
      </View>

























      <View style={styles.bodylow}>

<View style={{alignItems:'center'}}>
  <Text style={{fontSize:30, color:'gray', marginVertical:10}}>
    Released Mangas
  </Text>
</View>

        <View style={{width:'100%', height:'100%', alignItems:'center'}}>
          <FlatList 
            data={mangas}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => 
            <Mangas 
              name={item.name} 
              mangaid={item._id} 
              poster={item.poster} 
              creatorid={item.creatorid} 
              navigation={props.navigation}
            />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
          />
        </View>

      </View>


      <StatusBar style="auto" />
    </View>
  );
}


