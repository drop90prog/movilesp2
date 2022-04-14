import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { findIndexActive, updateIndexActive } from '../controllers/fetchIndexActive';
import { getData } from '../controllers/storages';


export default function ImageViewerU() {

  const [indexActive, setIndexactive] = useState(0);
  const [iduser, setIduser] = useState('');
  const [chapterid, setChapterid] = useState('');
  const [images, setImages] = useState([])
  const [activate, setActivate] = useState(false);






////////////////////////////////////////////////////////////////////////////////////////
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




////////////////////////////////////////////////////////////////////////////////////////

useEffect(()=>{
  if(iduser && chapterid)findIndexActive(iduser, chapterid).then((res)=>{

      if(!res.message){setActivate(true);setIndexactive(res.result.indexactive); }
  })
},[iduser, chapterid])


////////////////////////////////////////////////////////////////////////////////////////


  useEffect(()=>{


      console.log(`indice ${indexActive}`)

      
      if(iduser && chapterid)
      updateIndexActive(iduser, chapterid, indexActive).then((res)=>{
          console.log(res)
      })


  },[indexActive])


////////////////////////////////////////////////////////////////////////////////////////



  
  const onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
/*         console.log("Visible items are", viewableItems[0].key); */
          if(viewableItems.length>0) setIndexactive(viewableItems[0].key); 
/*             console.log(viewableItems[0].key)  */   

  }, []);
  
  const viewabilityConfigCallbackPairs = React.useRef([
    { onViewableItemsChanged },
  ]);









    
    return (
        <View style={styles.container}>
{activate?<View>
          <FlatList         
            inverted
            keyExtractor={(item, index) => index.toString()}
            data={images}
            initialScrollIndex={indexActive}
            getItemLayout={(data, index) => (
                {length: Dimensions.get('window').height, offset: Dimensions.get('window').height * index, index}
              )}
            viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
            }
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
          </View>:null}
           
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {

        backgroundColor:'black',
    },
    imagess: {        
        height:"100%",
  
       
   
      },
});






