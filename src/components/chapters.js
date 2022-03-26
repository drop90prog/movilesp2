import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { storeData, getData, removeData } from "../controllers/storages";


export default function ChaptersComponent(props) {

    let im = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wn3lhKtX3FdLR2AZJngEGuREl1Xuh3jkTjUgA145gwv5ZnCB4GK4DbJ00MPnSX7PR-o&usqp=CAU'

    
    return (
      <TouchableOpacity onPress={()=> { 
        storeData('chapter',props.name)
        props.navigation.navigate('Images') 
        
        }}>
        <View  style={{ width: "100%", height: 90, marginLeft: 15, marginVertical: 15, flexDirection:'row' }}>
          <View>
            <Image source={{ uri: im }} style={styles.image} />
          </View>
          <View  style={{justifyContent:'center'}}>
            <Text style={styles.text}>{props.name}</Text>
          </View>
        </View>        
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
  },
});
