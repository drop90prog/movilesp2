import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { findChapters } from '../../controllers/fetchChapter';
import React, { useState } from 'react';
import { getData, removeData, storeData } from '../../controllers/storages';
import ChaptersRenderer from '../../components/chaptersRenderer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { saveFollow, findFollow, deleteFollow } from '../../controllers/fetchFollows';


export default function Chapters(props, {navigation}) {

  const [chapters, setChapters] = useState([])
  const [name, setName] = useState('')
  const [mangaid, setMangaid] = useState('')
  const [iduser, setIduser] = useState('')

  const [isFollowed, setIsfollowed] = useState(false)



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
      getData('user').then((res)=>{
        if(res){let a =JSON.parse(res); setIduser(a.sub)}
      })

    if(mangaid)findChapters(mangaid)
      .then(res=>{
        /* alert(res.content.length) */
        setChapters(res.content)
        storeData('chapters',JSON.stringify(res.content))
      })

      if(mangaid&&iduser)findFollow(iduser, mangaid).then((res)=>{
        if(res.status==200)setIsfollowed(true)
      })

      },[name, mangaid, iduser])
  )

console.log(iduser)


  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={{textAlign:'center'}}>{name}</Text>
{!isFollowed?<TouchableOpacity onPress={()=>{
                
                saveFollow(iduser, mangaid).then((res)=>{
                  alert(res.message)
                  setIsfollowed(true)
                })
                
                
                }}>
            <View style={{height:20, width:'100%', backgroundColor:'tomato'}}>
              <Text>follow</Text>
            </View>
          </TouchableOpacity>:
          <TouchableOpacity onPress={()=>{
            
            deleteFollow(iduser, mangaid).then((res)=>{
              alert(res.message)
              setIsfollowed(false)
            })
            
            
            }}>
            <View style={{height:20, width:'100%', backgroundColor:'lightgreen'}}>
              <Text>unfollow</Text>
            </View>
          </TouchableOpacity>}
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
