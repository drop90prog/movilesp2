import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { storeData, getData, removeData } from "../../../controllers/storages";
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';


export default function Images(props) {
  const [name, setName] = useState('');

  const images = [
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

  useFocusEffect(
    React.useCallback(()=>{     
    
    const u = async()=>{
      const gettingmanga = await getData('chapter')
      setName(gettingmanga)     
    }
    u()

      },[name])
  )
  
  return (
    <View style={styles.container}>
      <ScrollView>

      
      <View style={styles.imageContainer}>
        <ImageViewer imageUrls={images} />
      </View>
      <View style={styles.commentSection}>

      </View>
      {/* <Text>{name}</Text> */}
      {/* <Button title='ver imagenes' onPress={()=>{alert("funca")}}/> */}
  

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
    height:400,
    backgroundColor: 'lightblue'
  },
});
