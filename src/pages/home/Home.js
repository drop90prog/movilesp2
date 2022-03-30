import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, FlatList } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { findMangas } from '../../controllers/fetchManga';
import  Mangas  from '../../components/mangas';
import { styles } from './styles';
import { signIn } from '../../controllers/fetchUser';


export default function Home({navigation},props) {

  const [mangas, setMangas] = useState([])
 
//useEffect en tabs, esto carga la pagina cuando entras a la tab
  useFocusEffect(
    React.useCallback(()=>{
      
    findMangas().then(res=>{setMangas(res.content)})

    },[])
  )

  return (
    <View style={styles.container}>
      <View style={styles.bodytop}>
        <View style={{justifyContent:'space-between', flexDirection:'row' }}>
          <View style={{width:'50%'}}>
            <Button title="signin" onPress={()=>{console.log('signin')}}/>
          </View>
          <View style={{width:'50%'}}>
            <Button title="signup" onPress={()=>console.log('signup')}/>
          </View>
        </View>
      </View>


      <View style={styles.bodylow}>


      <View>
        <FlatList
          data={mangas}
          renderItem={({ item }) => 
          <Mangas name={item.name} mangaid={item._id} poster={item.poster} navigation={navigation}/>}
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


