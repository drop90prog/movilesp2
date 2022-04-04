import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { Card } from "react-native-paper";
import { deleteComment } from "../controllers/fetchComments";



export default function CommentRenderer(props) {
    /* console.log(props.username) */
    const [allowDelete, setAllowdelete] = useState(false)
    

    useEffect(()=>{
/*       console.log(props.isadmin) */
      if(!props.isadmin){
        if(props.iduser == props.loggeduserid)setAllowdelete(true)
        else setAllowdelete(false)
      }else setAllowdelete(true)

    },[props.ind])

    return (

    <View style={{padding:5}}>
        <Card>
          <View>{/* contenido del card */}

          
            <View style={{flexDirection:'row', margin:7, }}>
              <View style={styles.profile}>{/* plano del perfil */}
                <View>{/* avatar */}
                  <Image source={{uri:props.avatar}} style={styles.avatars}/>
                </View>
                <View style={{marginTop:4}}>{/* username */}
                  <Text >{props.name}</Text>
                </View>            
              </View>

          
              <View style={styles.commentArea}>
                <Text>{props.comment}</Text>
              </View>
            </View>

            {allowDelete&&<View style={{flexDirection:'row', justifyContent:'space-around', height:25}}>
              <View>
                <TouchableOpacity onPress={()=>{alert("edit comment")}}>
                  <View style={{height:20, width:70, backgroundColor:'pink'}}>
                    <Text style={{textAlign:'center'}}>Edit</Text>
                  </View>                    
                </TouchableOpacity>                
              </View>
              <View >
                <TouchableOpacity onPress={()=>{
                deleteComment(props.id)
                  .then(res=>{
                    alert(res.message)                    
                  })
                  
                  }}>
                  <View style={{height:20, width:70, backgroundColor:'pink'}}>
                    <Text style={{textAlign:'center'}}>delete</Text>
                  </View>                    
                </TouchableOpacity>    
              </View>
            </View>}


          </View>{/* contenido del card */}


          
          
        </Card>
    </View>

    );
  };

const styles = StyleSheet.create({
    profile:{
        width:100,
        height:'auto',
        backgroundColor:'lightblue',
        alignItems: 'center',
      },
      avatars: {
        width: 50,
        height: 50,
        borderRadius: 25,    
      },
      commentArea: {
        height:'auto',
        width:240,
        backgroundColor:'lightgray'
      },
      optArea: {
        height:15,
        width:50,
        backgroundColor:'black'
      },

});