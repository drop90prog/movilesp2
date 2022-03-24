import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { findMangas } from '../../controllers/fetchManga'


export default function Home({navigation}) {
  const user = useSelector((state) => state.user); // datos del usuario logueado
 
//useEffect en tabs, esto carga la pagina cuando entras a la tab
  useFocusEffect(
    React.useCallback(()=>{
      
    findMangas().then(res=>console.log(res.content))

    },[])
  )

  return (
    <View style={styles.container}>
      <View style={styles.bodytop}>
        <View style={{justifyContent:'space-between', flexDirection:'row' }}>
          <View style={{width:'50%'}}>
            <Button title="signin" onPress={()=>console.log('signin')}/>
          </View>
          <View style={{width:'50%'}}>
            <Button title="signup" onPress={()=>console.log('signup')}/>
          </View>
        </View>
      </View>


      <View style={styles.bodylow}>
        
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',  
    justifyContent: 'flex-start',
  },
  bodytop:{
    height:40,
    width:'100%',    
    backgroundColor: 'white',    
  },
  bodylow:{
    height:'100%',
    width:'100%',    
    backgroundColor: 'lightgray',    
  },
});
