import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { getData } from '../controllers/storages';


export default function ImageViewerR() {

    

    const onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
      /*   if(viewableItems[0].key)console.log("Visible items are", viewableItems[0].key); */

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
        })
    },[])

    
    return (
        <View style={styles.container}>
            <FlatList
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            data={images}
            initialScrollIndex={0}
            getItemLayout={(data, index) => (
                {length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index}
              )}
            viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
            }
            renderItem={({item, index})=>(
    <View style={{ justifyContent:'center'}}>
            <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}

                imageWidth={Dimensions.get('window').width}
                imageHeight={Dimensions.get('window').height}
                >
                <Image key={index} source={{uri: item.url}} style={styles.image}/>
            </ImageZoom>
    </View>

            
            )}
            />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {

        backgroundColor:'gray',
    },
    image: {
        height:Dimensions.get('window').height, 

      },
});
