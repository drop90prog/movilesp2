import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { findChapters } from '../../controllers/fetchChapter';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData, removeData } from '../../controllers/storages';
import ChaptersComponent from '../../components/chapters';


export default function Chapters(props, {navigation}) {

  const [chapters, setChapters] = useState([])
  const [name, setName] = useState('')


  useFocusEffect(
    React.useCallback(()=>{     
    
      const u = async()=>{
        const gettingmanga = await getData('manga')
        setName(gettingmanga)
/*      if(!manga)console.log("nada")
        if(manga){console.log("ejecutado"); alert(manga)} */        
      }
      u()
      
    if(name)findChapters(name)
      .then(res=>{setChapters(res.content)})
      },[name])
  )




  return (
    <View style={styles.container}>
      
      
      <View style={{width:'100%'}}>
        <FlatList
          data={chapters}
          renderItem={({ item }) => 
          <ChaptersComponent name={item.chaptername} navigation={props.navigation}/>}
          keyExtractor={(item, index) => index.toString()}
          vertical={true}          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',  
    justifyContent:'center',
  },
});
