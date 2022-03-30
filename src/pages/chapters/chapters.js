import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { findChapters } from '../../controllers/fetchChapter';
import React, { useState } from 'react';
import { getData, removeData, storeData } from '../../controllers/storages';
import ChaptersRenderer from '../../components/chaptersRenderer';


export default function Chapters(props, {navigation}) {

  const [chapters, setChapters] = useState([])
  const [name, setName] = useState('')
  const [mangaid, setMangaid] = useState('')



  useFocusEffect(
    React.useCallback(()=>{

      const u = async()=>{
        let l =  JSON.parse(await getData('manga'))
        const manganame = l[1]
        const mangaide = l[0]
        setMangaid(mangaide)
        setName(manganame)
/*         console.log(`current manga: ${manganame}, id:${mangaide}`) */
        
/*      if(!manga)console.log("nada")
        if(manga){console.log("ejecutado"); alert(manga)} */        
      }
      u()

    if(mangaid)findChapters(mangaid)
      .then(res=>{
        /* alert(res.content.length) */

        setChapters(res.content)
        storeData('chapters',JSON.stringify(res.content))  
        

      })
      },[name])
  )




  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={{textAlign:'center'}}>{name}</Text>
        </View>

        
        <View style={{width:'100%'}}>
          <FlatList
            data={chapters}
            renderItem={({ item }) => 
            <ChaptersRenderer 
            name={item.chaptername} 
            number={item.number}
            _id={item._id}
            navigation={props.navigation}
            />}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}          
          />
        </View>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    
  },
});
