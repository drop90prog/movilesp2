import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { findIndexActive, updateIndexActive } from '../controllers/fetchIndexActive';
import { getData } from '../controllers/storages';

export default function ImageViewerR() {

    const [indexActive, setIndexactive] = useState(null);
    const [iduser, setIduser] = useState('');
    const [chapterid, setChapterid] = useState('');
    const [state, setState] = useState(false);
    const [images, setImages] = useState([])

    
    useEffect(()=>{
        //console.log(`incide ${indexActive}`)
        
        updateIndexActive(iduser, chapterid, indexActive).then((res)=>{
            console.log(res)
        })
    },[indexActive])



    const onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
/*         console.log("Visible items are", viewableItems[0].key); */
            if(viewableItems.length>0) setIndexactive(viewableItems[0].key)
/*             console.log(viewableItems[0].key)  */   
    }, []);
    
    const viewabilityConfigCallbackPairs = React.useRef([
      { onViewableItemsChanged },
    ]);

 

    useEffect(()=>{
        getData('images').then((res)=>{
            setImages(JSON.parse(res))
        })
        getData('user').then((res)=>{
            if(res){let a =JSON.parse(res); setIduser(a.sub)}
          })
        getData('chapter').then((res)=>{
            let b =JSON.parse(res); setChapterid(b[0])//0=id, 1=name
        })
    },[])

    useEffect(()=>{
        if(iduser && chapterid)findIndexActive(iduser, chapterid).then((res)=>{
            console.log(res.result)
            setIndexactive(res.result.indexactive)
            setState(true)
        })
    },[iduser, chapterid])

    console.log(indexActive)
    return (
        <View style={styles.container}>
        <View>
            <FlatList
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            data={images}
            initialScrollIndex={indexActive}
            getItemLayout={(data, index) => (
                {length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index}
              )}
            viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
            }
            renderItem={({item, index})=>(
    
            <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}

                imageWidth={Dimensions.get('window').width}
                imageHeight={500}>
            {indexActive&&<Image key={index} source={{uri: item.url}} style={styles.imagess}/>}
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
        height:400, 
        width:Dimensions.get('window').width,
      },
});
