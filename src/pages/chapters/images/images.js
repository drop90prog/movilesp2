import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList, TextInput } from 'react-native';
import { storeData, getData, removeData } from "../../../controllers/storages";
import ImageViewer from 'react-native-image-zoom-viewer';
import CommentRenderer from '../../../components/commentRenderer';
import { useFocusEffect } from '@react-navigation/native';
import { findImages } from '../../../controllers/fetchImage';
import { saveComment, findComments } from '../../../controllers/fetchComments';







export default function Images(props) {
  const [chapterName, setChaptername] = useState('');
  const [chapterId, setChapterid] = useState('');
  const [state, setState] = useState(false)
  const [imagest, setImagest] = useState([])
  const [images, setImages] = useState([])
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
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
        else setComments(res.result)
        
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
    />
  )
})






  return (
    <View style={styles.container}>
      <ScrollView>

        
        <View style={styles.imageContainer}>
            {images.length>0 &&<ImageViewer imageUrls={images} />}
        </View>
        <View style={styles.commentSection}>        
          <View>
            <Text style={{textAlign:"center"}}>Comments</Text>
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



{/*           <View>
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width:'100%',
    height:400,
    backgroundColor: 'lightgreen'
  },
  commentSection: {
    width:'100%',
    height:'auto',
    backgroundColor: 'lightblue'
  },
  inputcomment: {
    alignSelf:'center',    
    marginTop:10,
    width:'97%',
    borderColor:"black",
    borderWidth:1,     
    borderRadius:0,
    padding:10
  },
  
});
