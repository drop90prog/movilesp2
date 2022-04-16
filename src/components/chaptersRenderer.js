import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { storeData, getData, removeData } from "../controllers/storages";
import { Card } from "react-native-paper";


export default function ChaptersRenderer(props, {navigation}) {

    let im = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wn3lhKtX3FdLR2AZJngEGuREl1Xuh3jkTjUgA145gwv5ZnCB4GK4DbJ00MPnSX7PR-o&usqp=CAU'

    

    return (
      
      <TouchableOpacity onPress={()=> { 
        storeData('chapter',JSON.stringify([props._id,props.name]))
        props.navigation.navigate('Toptabsimages') 
        
        }}>

          <Card style={styles.card}>
            <View  style={{ width: "100%", height: 90, marginLeft: 15, marginVertical: 5, flexDirection:'row' }}>
              <View style={styles.image}>
                <Text style={{fontSize:30}}>{props.number}</Text>
              </View>
              <View  style={{justifyContent:'center'}}>
                <Text style={styles.text}>{props.name}</Text>
              </View>
            </View>  
          </Card>      


      </TouchableOpacity>


    );
  };

const styles = StyleSheet.create({
  card: {
    height:120, 
    width:"100%", 
    marginBottom:50,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
    backgroundColor:'lightgray',
    justifyContent:'center',
    alignItems:'center',
    
  },
  text: {
    marginLeft: 10
  },
});
