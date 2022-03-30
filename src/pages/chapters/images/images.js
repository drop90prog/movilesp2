import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList } from 'react-native';
import { storeData, getData, removeData } from "../../../controllers/storages";
import ImageViewer from 'react-native-image-zoom-viewer';
import CommentRenderer from '../../../components/commentRenderer';
import { useFocusEffect } from '@react-navigation/native';
import { findImages } from '../../../controllers/fetchImage';





export default function Images(props) {
  const [chapterName, setChaptername] = useState('');
  const [chapterId, setChapterid] = useState('');
  const [state, setState] = useState(false)
  const [imagest, setImagest] = useState([])
  const [images, setImages] = useState([])

  //obtiene de un array el id(0) y nombre(1) del capitulo
  const o = async()=>{
    const gettingchapter = JSON.parse(await getData('chapter'))
    setChapterid(gettingchapter[0])
    setChaptername(gettingchapter[1])  
   

    findImages(gettingchapter[0])
    .then(res=>{

      let ok =[];
      for(let x in res.content){
        ok.push({url:res.content[x].url})
      }

      setImages(ok)

      //storeData('images',JSON.stringify(res.content))  
    })
  }

  useFocusEffect(
    React.useCallback(()=>{

      o()



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



    


    },[])

  )//useEffect



console.log(images)


















  const imagess = [
    {
      url:
        'https://64.media.tumblr.com/a9de99acda66068afca92f039a148fdb/442f10a043ce4d3c-bc/s1280x1920/42c35346e6b5b365ae9c824e0383a106f4b70b17.png',
    },
    {
      url:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5d92c5b6-9f96-44e5-b4bc-b92cb84da90c/d20firt-21e59500-14b0-4d24-9daa-becd08c9681a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVkOTJjNWI2LTlmOTYtNDRlNS1iNGJjLWI5MmNiODRkYTkwY1wvZDIwZmlydC0yMWU1OTUwMC0xNGIwLTRkMjQtOWRhYS1iZWNkMDhjOTY4MWEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IC9611__xD1Z0Fs8hfrEd2dsaDzRJLG_wgwsXyudrdw',
    },
    {
      url:'https://doublelasers.com/wp-content/uploads/2020/11/itachi.jpg'
    },
    {
      url:'http://images1.fanpop.com/images/photos/1700000/Crazy-Itachi-itachi-uchiha-1703920-716-710.jpg'
    },
    {
      url:'https://preview.redd.it/gc1whop5dmg81.jpg?auto=webp&s=02b72658883d96d2ebb9b7d49519ad8885f902ff'
    }
  ];

  
  const comments = [
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



const coms = comments.map((item,index,array)=>{
  return(
    <CommentRenderer key={index} username={item.username} avatar={item.avatar} comment={item.comment}/>
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
  
});
