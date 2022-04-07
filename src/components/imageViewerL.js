import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { getData } from '../controllers/storages';

export default function ImageViewerL() {

    const [indexActive, setIndexactive] = useState(0)

    useEffect(()=>{
        console.log(`incide ${indexActive}`)
        
    },[indexActive])

    const onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
/*         console.log("Visible items are", viewableItems[0].key); */
            if(viewableItems.length>0) setIndexactive(viewableItems[0].key)
/*             console.log(viewableItems[0].key)  */   
    }, []);
    
    const viewabilityConfigCallbackPairs = React.useRef([
      { onViewableItemsChanged },
    ]);

    const [images, setImages] = useState([])

    useEffect(()=>{
        getData('images').then((res)=>{
            setImages(JSON.parse(res))
        })
    },[])

    
    return (
        <View style={styles.container}>
            <FlatList
            horizontal
            inverted
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
                <Image key={index} source={{uri: item.url}} style={styles.imagess}/>
            </ImageZoom>
            
            )}
            />
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
