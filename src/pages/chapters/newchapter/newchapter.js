import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import { saveChapter } from '../../../controllers/fetchChapter';
import { updateManga, deleteManga } from '../../../controllers/fetchManga';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../../../controllers/storages';
import { findFollowsManga } from '../../../controllers/fetchFollows';
import { Card } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons';

export default function Newchapter(props) {


  const [mangaName, setManganame] = useState('');
  const [mangaId, setMangaid] = useState('');
  const [creatorid, setCreatorid] = useState('');
  const [chapterName, setChapterName] = useState([]);
  const [chapterNumber, setChapternumber] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [userId, setUserid] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState('a new chapter has been released');
  const [title, setTitle] = useState('Manga app');
  const [followers, setFollowers] = useState([])

  const [isCreator, setIscreator] = useState(false)
  const [isLogged, setIslogged] = useState(false)


  async function sendPushNotification(expoPushToken, title, messagee) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: messagee,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }


  getData('permissions').then(res=>{
    let per = JSON.parse(res)
    if(per.isAdmin)setAllowed(true);
  
   // console.log(`(new chapter) admin: ${per.isAdmin}`)
  })





  useFocusEffect(
    React.useCallback(()=>{     
      //console.log("allowed: "+allowed)      




    
      getData('user').then(res=>{
        if(res){
          let us = JSON.parse(res)
          setUserid(us.sub)
        }
      })
    
    
      getData('manga').then(res=>{
        let l = JSON.parse(res)
        const manganamee = l[1]
        const mangaidee = l[0]
        const creatoridd = l[2]        
        setMangaid(mangaidee)
        setManganame(manganamee)
        setCreatorid(creatoridd)
        //console.log(`current manga: ${manganamee}, id:${mangaidee}, creatorid: ${creatoridd}`)         
      })
      
      if(userId==creatorid){
        if(!userId || !creatorid)return;
       
        setIscreator(true)
        console.log(`userid: ${userId}, creatorid: ${creatorid}`), setAllowed(true)
      }


      findFollowsManga(mangaId).then((res)=>{setFollowers(res.result)})

    },[userId, creatorid])
  )
  console.log(`allowed: ${allowed}`)

  return (
    <ScrollView style={styles.lienzo}>
      <View style={styles.container}>

     
      {allowed?
      <View style={styles.allowedContent}>

        {/* NEW CHAPTER */}
        <View style={{marginTop:15}}>
          <Card style={{padding:15, }}>

            <View style={{padding:10}}>
              <Text style={{color:'gray', fontSize:20, fontWeight:'bold', textAlign:'center'}}>ADD NEW CHAPTER</Text>
            </View>

            <View style={{padding:5, }}>
              <Text style={{color:'gray' }}>Name of the chapter:</Text>
            </View>

            <View style={styles.input}>
              <TextInput           
              onChangeText={chapter => setChapterName(chapter)}
              placeholder="name"            
              />
            </View>


            <View style={{paddingL:5, marginTop:10}}>
              <Text style={{color:'gray' }}>Number of the chapter: 
                <Text style={{color:'red' }}> (required)</Text>
              </Text>
            </View>
            <View style={styles.input}>
              <TextInput
              keyboardType = 'numeric'
              onChangeText={number => setChapternumber(number)}
              placeholder="number"          
              />
            </View>

            <View style={{marginTop:15}}>
              <Button style={styles.button} 
              disabled={chapterNumber?false:true}
              title="Add"
              mode="contained" 
              onPress={() => {
                if(!chapterNumber){
                  alert('fill the number field')
                }else{        saveChapter(mangaId ,chapterName, chapterNumber) 
                  .then(res => {
                  alert(res.message)
                  }).catch(error => console.error('Error:', error))}}}
              />
            </View>

          </Card>
        </View>



        {/* EDIT MANGA */}
        <View style={{marginTop:15}}>
          <Card style={{padding:15, }}>

            <View style={{padding:10}}>
              <Text style={{color:'gray', fontSize:20, fontWeight:'bold', textAlign:'center'}}>EDIT MANGA</Text>
            </View>

            <View style={{padding:5, }}>
              <Text style={{color:'gray' }}>Name of the manga:</Text>
            </View>

            <View>
              <TextInput style={styles.input}          
              onChangeText={manganeim => setManganame(manganeim)}
              placeholder="number"
              value={mangaName}
              />
            </View>          

            <View style={{marginTop:15}}>
              <Button style={styles.button} 
              disabled={mangaName?false:true}
              title="update"
              mode="contained" 
              onPress={() => {
                  updateManga(mangaId, mangaName) 
                  .then(res => {
                  alert(res.message)
                  }).catch(error => console.error('Error:', error))}}
              />
            </View>

          </Card>
        </View>










        {/* NOTIFICATION */}
        <View style={{marginTop:15}}>
          
          <Card style={{padding:15, }}>
            <View style={{padding:10}}>
              <Text style={{color:'gray', fontSize:20, fontWeight:'bold', textAlign:'center'}}>NOTIFICATION</Text>
            </View>
            <View style={{paddingLeft:5, }}>
              <Text style={{color:'gray' }}>Title:
                <Text style={{color:'red' }}> (required)</Text>
              </Text>
            </View>

            <View>
                <TextInput style={styles.input}          
                onChangeText={titl => setTitle(titl)}
                placeholder="title"
                value={title}
                />
            </View>

            <View style={{paddingLeft:5, marginTop:10}}>
              <Text style={{color:'gray' }}>Message:
                <Text style={{color:'red' }}> (required)</Text>
              </Text>
            </View>
            <View>
                <TextInput style={styles.input}          
                onChangeText={messag => setMessage(messag)}
                placeholder="message"
                value={message}
                />
            </View>        

            <View style={{marginTop:15}}>
              <Button style={styles.button} 
              disabled={!title || !message ? true:false}
              title="Send notification"
              mode="contained" 
              onPress={() => {

                //enviando notificaciones push
                let arr = []
                for(let x in followers){
                  sendPushNotification(followers[x].tokennp, title, message)
                  arr.push(followers[x].tokennp)
                }


                }}
              />
            </View>

          </Card>
        </View>
        
        



        <View>
            <View style={{marginVertical:40}}>
              <Button 
              color={'red'}
              title="delete manga"
              mode="contained" 
              onPress={() => {             
                  deleteManga(mangaId) 
                  .then(res => {
                  alert(res.message)
                  props.navigation.navigate('Home')
                  }).catch(error => console.error('Error:', error))
                }}
              />
            </View>
        </View>
      </View>:

      <View style={styles.notAllowedContent}>
       
        <View>
          <View style={{alignSelf:'center', width:50, marginBottom:20}}>
            <Octicons name="stop" size={50} color="red" />
          </View>

          <Text style={styles.text}>
            Only the
            <Text style={{ color: 'black', fontWeight: 'bold' }}> author </Text>
            and
            <Text style={{ color: 'black', fontWeight: 'bold' }}> admins </Text>
            are allowed
          </Text>
        </View>
      </View>}


      </View>
    </ScrollView>
  );
}

