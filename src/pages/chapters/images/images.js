import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { storeData, getData, removeData } from "../../../controllers/storages";
import ImageViewer from 'react-native-image-zoom-viewer';
import CommentRenderer from '../../../components/commentRenderer';
import { useFocusEffect } from '@react-navigation/native';
import { findImages } from '../../../controllers/fetchImage';
import { saveComment, findComments } from '../../../controllers/fetchComments';
import { findReplies } from '../../../controllers/fetchReplies';
import { saveIndexActive } from '../../../controllers/fetchIndexActive';
import { styles } from './styles';
import { Card } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';






export default function Images(props) {
  const [chapterName, setChaptername] = useState('');
  const [chapterId, setChapterid] = useState('');
  const [state, setState] = useState(false)
  const [imagest, setImagest] = useState([])
  const [images, setImages] = useState([])
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  const [userId, setUserid] = useState('');
  const [userName, setUsername] = useState('');
  const [isAdmin, setIsadmin] = useState(false);
  const [avatar, setAvatar] = useState('');
  

  //obtiene de un array el id(0) y nombre(1) del capitulo

  getData('chapter').then(res=>{
    const gettingchapter =JSON.parse(res)
    setChapterid(gettingchapter[0])
    setChaptername(gettingchapter[1])  

  })

  //obtiene id del user loggeado
  getData('user').then(res=>{
    if(res){
      let us = JSON.parse(res)
      setUserid(us.sub)
      setUsername(us.name)
      setAvatar(us.avatar)
    }
  })


  getData('permissions').then(res=>{
    let per = JSON.parse(res)
    if(per.isAdmin)setIsadmin(true)
    
  })
  

  useFocusEffect(
    React.useCallback(()=>{

    if(chapterId){
      findImages(chapterId)
      .then(res=>{
        let arrayOfImages =[];
        for(let x in res.content){
          arrayOfImages.push({url:res.content[x].url, id:res.content[x]._id})
        }
  
        setImages(arrayOfImages)
        
  
        //storeData('images',JSON.stringify(res.content))  
      })
  
      findComments(chapterId).then(res=>{
        
        if(!res.result)setComment([])
        else {
          setComments(res.result)

          findReplies(chapterId).then((res)=>{
           setReplies(res.result)
          })

        }
        
/*         console.log(res.result) */
      })
    }

/*
      findImages(chapterId)
      .then(res=>{               
          setImagest(res.content)
          
          console.log(`length: ${imagest.length}, array: ${imagest}, state: ${state}`)
          
          if(imagest.length==0)setState(!state)
          if(imagest.length>0){
            let ok =[];
            for(let x in imagest){
              ok.push({url:imagest[x].url})
            }
            setImages(ok)
            
          }           
        //storeData('images',JSON.stringify(res.content))  
      }) */
    


    },[chapterId])

  )//useEffect


  useEffect(()=>{
    if(userId)saveIndexActive(userId, chapterId).then((res)=>{/* console.log(res) */})
 /*    if(!userId)console.log("sign in first to save the active index") */
  },[userId])


  storeData('images', JSON.stringify(images))





/*   
  const commentss = [
    {
      username:"@fulano",
      comment:"comentario uno de fulano",
      avatar: "https://avatarfiles.alphacoders.com/125/thumb-125254.png"
    },
    {
      username:"@sutano",
      comment:"comentario dos de sutano",
      avatar: "https://i.pinimg.com/280x280_RS/fc/20/d7/fc20d7ba75499df5113b2b3f94b87730.jpg"
    },
    {
      username:"@mengano",
      comment:"verticalicion que moyeja asi no se puede vergatsion amiguis nonono es que yo no me lo puo creeeeerrr, bueno deja asi isisisis noioioisnojo",
      avatar: "https://avatarfiles.alphacoders.com/281/thumb-281484.png"
    },
    {
      username:"@pereseo",
      comment:"comentario crinco de pereseo",
      avatar: "https://nick-intl.mtvnimages.com/uri/mgid:file:docroot:nick.com:/nick-assets/shows/images/spongebob-squarepants/characters/character-thumb-sandy.jpg?quality=1&height=360&width=640&matte=true&crop=false"
    },
    {
      username:"@hercules",
      comment:"soy hercules un heroe",
      avatar: "https://www.looper.com/img/gallery/what-you-never-noticed-about-mr-krabs-lies-in-spongebob-squarepants/intro-1609948293.jpg"
    }
  ];

 */


const repliess = [
  {
    name:'juahito',
    commentidr:'624a0521616be034cece2bec',
    reply:'esto es un repliiiii'
  },
  {
    name:'mengano',
    commentidr:'624a0521616be034cece2bec',
    reply:'otro replaisss bb'
  },
  {
    name:'aquiles',
    commentidr:'624a0521616be034cece2bec',
    reply:'mondongo lentejaaaa'
  },
  {
    name:'rucasticolentico',
    commentidr:'624a0552616be034cece2bfe',
    reply:'iaora?'
  },
]

const coms = comments.map((item,index,array)=>{
  return(
    <CommentRenderer 
    loggeduserid={userId}
    isadmin={isAdmin}
    key={index} 
    avatar={item.avatar} 
    comment={item.comment}
    name={item.name}
    iduser={item.iduser}
    ind={index}
    commentid={item._id}
    replies={replies}
    chapterid={chapterId}
    />
  )
})






  return (
    <View style={styles.lienzo}>
      <ScrollView>



<View style={{alignItems:'center', padding:15}}>
  <View>
    <Text style={{fontSize:24, color:'gray', fontWeight:'bold', letterSpacing:3}}>Choose Direction</Text>
  </View>
  {/* fila arriba ******************/}
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{
              storeData('images', JSON.stringify(images))
              {userId?
                props.navigation.navigate('ImageViewerL') : 
                props.navigation.navigate('Ivl')  }
                      
              }}
      >
        <View style={{width:150}}>
          <Card>
            <View style={{alignItems:'center'}}>
              <View>
                <Text>Left</Text>
              </View>
              <View>              
                <Entypo name="arrow-left" size={30} color="black" />
              </View>
            </View>   
          </Card>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
              storeData('images', JSON.stringify(images))
              {userId?
                props.navigation.navigate('ImageViewerR') : 
                props.navigation.navigate('Ivr')  }           
              }}
      >
        <View style={{width:150}}>
          <Card>
            <View style={{alignItems:'center'}}>
              <View>
                <Text>Right</Text>
              </View>
              <View>
                <Entypo name="arrow-right" size={30} color="black" />
              </View>
            </View>           
          </Card>
        </View>
      </TouchableOpacity>     
    </View>
     
    {/* fila abajo ****************/}
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{
              storeData('images', JSON.stringify(images))
              {userId?
                props.navigation.navigate('ImageViewerU') : 
                props.navigation.navigate('IvU')  }           
              }}
        >
        <View style={{width:150}}>
          <Card >
            <View style={{alignItems:'center'}}>
              <View>
                <Text>Up</Text>
              </View>
              <View>
                <Entypo name="arrow-up" size={30} color="black" />
              </View>
            </View>           
          </Card>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
              storeData('images', JSON.stringify(images))
              {userId?
                props.navigation.navigate('ImageViewerD') : 
                props.navigation.navigate('IvD')  }            
              }}
      >
        <View style={{width:150}}>
          <Card>
            <View style={{alignItems:'center'}}>
              <View>
                <Text>Down</Text>
              </View>
              <View>              
                <Entypo name="arrow-down" size={30} color="black" />
              </View>
            </View>   
          </Card>
        </View>
      </TouchableOpacity>
    </View>


</View>
    






        <View style={styles.commentSection}>
          <View>
            <Text style={{textAlign:"center", fontSize:20}}>Comments</Text>
          </View>

          <View>
            {coms}
          </View>
          

           <View>
            <View style={styles.inputcomment}>
              <TextInput 
              multiline
              onChangeText={(text)=>{setComment(text)}} 
              placeholder="Enter your text..."             
              />            
            </View>
            <View style={{marginTop:3, width:'95%', alignSelf:'center'}}>
              <Button title="comment" onPress={()=>{
                if(!userId)alert("Sign in before comment")
                else if(comment=='')alert("fill the fiels please")
                else{
                  saveComment(comment, userId, avatar, chapterId, userName)
                  .then(res=>{
                    findComments(chapterId).then(res=>{
        
                    
                      setComments(res.result)
                    })


                    alert(res.message)
                  })
                }
                

                }}/>
            </View>

           </View>



          {/*<View>
            <FlatList nestedScrollEnabled
            data={comments}
            renderItem={({ item }) => 
            <CommentRenderer username={item.username} avatar={item.avatar} comment={item.comment}/>}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}
            showsHorizontalScrollIndicator={true}            
            />
          </View> */}

        </View>
      </ScrollView>
    </View>
  );
}

