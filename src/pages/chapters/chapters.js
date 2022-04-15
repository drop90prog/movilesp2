import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { findChapters } from '../../controllers/fetchChapter';
import React, { useState } from 'react';
import { getData, removeData, storeData } from '../../controllers/storages';
import ChaptersRenderer from '../../components/chaptersRenderer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { saveFollow, findFollow, deleteFollow } from '../../controllers/fetchFollows';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';

import { useHeaderHeight } from '@react-navigation/elements';



export default function Chapters(props, {navigation}) {

  const [chapters, setChapters] = useState([])
  const [name, setName] = useState('')
  const [mangaid, setMangaid] = useState('')
  const [iduser, setIduser] = useState('')
  

  const [isFollowed, setIsfollowed] = useState(false)
  const [tokennp, setTokennp] = useState('')

  const headerHeight = useHeaderHeight();

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

      getData('tokennp').then((res)=>{setTokennp(res)})

      },[name, mangaid, iduser])
  )








  return (
    <View style={styles.lienzo}>
      <View style={styles.container}>
        {iduser?
        <View style={[styles.topbanner, {backgroundColor: isFollowed?'#CDFFC2':'#FFC2C2'}]}>
      
          <View>
            <Text style={{textAlign:'center'}}>{name}</Text>
          </View>

          <View>
            {!isFollowed?
            <TouchableOpacity 
            onPress={()=>{
              saveFollow(iduser, tokennp, mangaid, name).then((res)=>{
                alert(res.message)
                setIsfollowed(true)
              }) }}
              style={{justifyContent:'center',
              width:60, backgroundColor:'red',
              height:29, marginVertical:30,borderRadius:10,}} 
              >

              <View >
                <Text style={{textAlign:'center', color:"white"}}>follow</Text>
              </View>

            </TouchableOpacity>:
            <TouchableOpacity onPress={()=>{
              
              deleteFollow(iduser, mangaid).then((res)=>{
                alert(res.message)
                setIsfollowed(false)
              }) }}
              
              style={{justifyContent:'center',
              width:95, backgroundColor:'#1A9800',
              height:29, marginVertical:30,borderRadius:10,}} 
              
              >
                


              <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <View>
                  <Text style={{textAlign:'center', color:"white"}}>following</Text>
                </View>
                <View>
                  <FontAwesome name="check-square-o" size={18} color="white" />
                </View>                
                
              </View>
            </TouchableOpacity>}
          </View>

          
        </View>:
        <View style={[styles.topbanner, {backgroundColor: '#FFC2C2'}]}>
          
          <Text>
            <Text style={{fontWeight:'bold'}}> Sign In </Text>
            to follow this manga</Text>
        </View>
        }


        <View style={{width:'95%'}}>
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


