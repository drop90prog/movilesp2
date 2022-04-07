import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { getData } from '../controllers/storages';


export default function ImageViewerU() {

    const onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
        /* console.log("Visible items are", viewableItems[0].key); */
        if(viewableItems.length>0)
        console.log(viewableItems[0].key)
    }, []);
    
    const viewabilityConfigCallbackPairs = React.useRef([
      { onViewableItemsChanged },
    ]);

    const [images, setImages] = useState([])

    useEffect(()=>{
        getData('images').then((res)=>{
            setImages(JSON.parse(res))
            console.log(JSON.parse(res))
        })
    },[])

    
    return (
        <View style={styles.container}>
            <FlatList         
            inverted
         
            keyExtractor={(item, index) => index.toString()}
            data={images}
            initialScrollIndex={2}
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
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {

        backgroundColor:'black',
    },
    imagess: {        
        height:"100%",
  
        margin:10,
   
      },
});
