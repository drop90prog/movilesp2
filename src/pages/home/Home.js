import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, FlatList } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { findMangas } from '../../controllers/fetchManga';
import  Mangas  from '../../components/mangas';
import { styles } from './styles';
import { signIn } from '../../controllers/fetchUser';
import { getData, removeData, storeData } from '../../controllers/storages';


export default function Home(props,{navigation}) {

  const [mangas, setMangas] = useState([])
  const [isLogged, setIslogged] = useState(false)
  const [isAdmin, setIsadmin] = useState(false)
 
//useEffect en tabs, esto carga la pagina cuando entras a la tab
  useFocusEffect(
    React.useCallback(()=>{
      
      findMangas().then(res=>{setMangas(res.content)})

      getData('user').then(res=>{
        let user;
        if(res){ 
          user = JSON.parse(res);setIslogged(true)
          if(user.admin) setIsadmin(true)       }
      })//from asyncstorage
    },[])
  )
console.log(`home: logged: ${isLogged}, admin: ${isAdmin}`)
storeData('permissions', JSON.stringify({isLogged:isLogged, isAdmin:isAdmin}))



  return (
    <View style={styles.container}>
      <View style={styles.bodytop}>
        {!isLogged?<View style={{justifyContent:'space-between', flexDirection:'row' }}>
          <View style={{width:'50%'}}>
            <Button title="signin" onPress={()=>{props.navigation.navigate('Signin')}}/>
          </View>
          <View style={{width:'50%'}}>
            <Button title="signup" onPress={()=>{props.navigation.navigate('Signup')}}/>
          </View>
        </View>:
        <View style={{justifyContent:'space-between', flexDirection:'row' }}>
          <View style={{width:'50%'}}>
            <Button title="Log out" onPress={()=>{
              removeData('user')
              removeData('manga')
              removeData('permissions')
              setIslogged(false)
              setIsadmin(false)
              props.navigation.navigate('Signin')
            }}
              />
          </View>
        </View>}
      </View>


      <View style={styles.bodylow}>


      <View>
        <FlatList
          data={mangas}
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


