import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { getData } from '../controllers/storages';

export default function Ivl() {


    const [iduser, setIduser] = useState('');
    const [chapterid, setChapterid] = useState('');
    const [images, setImages] = useState([])





////////////////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
    getData('images').then((res)=>{
        setImages(JSON.parse(res))
    })

    getData('chapter').then((res)=>{
        let b =JSON.parse(res); setChapterid(b[0])//0=id, 1=name
    })


},[])




////////////////////////////////////////////////////////////////////////////////////////





    return (
        <View style={styles.container}>
        
        <View>
            <FlatList
            inverted
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            data={images}
            initialScrollIndex={0}
            renderItem={({item, index})=>(
 
            <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}

            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}>
            <Image key={index} source={{uri: item.url}} style={styles.imagess}/>
            </ImageZoom>


            
            )}
            />
        </View>


      </View>
    );
  };

const styles = StyleSheet.create({
    container: {

        backgroundColor:'gray',
    },
    imagess: {
        height:Dimensions.get('window').height,
        
  
        
      },
});
