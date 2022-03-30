import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setManga } from "../redux/slices/mangaSlice";
import { storeData, getData, removeData } from "../controllers/storages";


export default function Mangas(props, {navigation}) {

    


    
    return (
      <TouchableOpacity onPress={()=> {       
      storeData("manga",JSON.stringify([props.mangaid, props.name]))
       props.navigation.navigate('Toptabs') //envia a chapters
        }}>
        <View  style={{ width: 130, height: 200, marginLeft: 15, marginVertical: 15 }}>
          <Image source={{ uri: props.poster }} style={styles.image} />
        </View>
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 200,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
  },
});
