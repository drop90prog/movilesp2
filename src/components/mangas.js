import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";



export default function Mangas(props, {navigation}) {
    let im = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wn3lhKtX3FdLR2AZJngEGuREl1Xuh3jkTjUgA145gwv5ZnCB4GK4DbJ00MPnSX7PR-o&usqp=CAU'

    return (
      <TouchableOpacity onPress={()=> props.navigation.navigate('Chapters', {msg:props.name})}>
        <View  style={{ width: 130, height: 200, marginLeft: 15, marginVertical: 15 }}>
          <Image source={{ uri: im }} style={styles.image} />
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
