import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button} from "react-native";
import { Card } from "react-native-paper";
import { deleteComment, updateComment } from "../controllers/fetchComments";
import { findReplies, saveReply, deleteReply } from "../controllers/fetchReplies";




export default function CommentRenderer(props) {
    /* console.log(props.username) */
    const [allowDelete, setAllowdelete] = useState(false);
    const [allowDeleteReply, setAllowdeletereply] = useState(false);
    const [allowComment, setAllowcomment] = useState(false);
    const [reply, setReply] = useState('');
    const [replies, setReplies] = useState([]);
    const [editableComment, setEditablecomment] = useState(false)
    const [comment, setComment] = useState('')
    const [Respcomment, setRespcomment] = useState('')


    useEffect(()=>{
/*       console.log(props.isadmin) */
      if(!props.isadmin){
        if(props.iduser == props.loggeduserid)setAllowdelete(true)
        else setAllowdelete(false)
      }else {setAllowdelete(true); setAllowdeletereply(true)}

      setComment(props.comment)
      setRespcomment(props.comment)
      

    },[props.ind])



    useEffect(()=>{
      setReplies(props.replies)
    },[props.replies])



      const reps = replies.map((item,index,array)=>{
        let deleteReplyAllowed = false
        if(item.iduser == props.loggeduserid)deleteReplyAllowed=true;
        else deleteReplyAllowed = false

        return(
         <View key={index} style={{paddingLeft:10, marginBottom:3, marginTop:2}}>
           
            {props.commentid==item.commentid?<View >
              <View>
                <Text>{item.name}: {item.reply} 
                  {deleteReplyAllowed || allowDeleteReply?<Text style={{color:"red", fontWeight:'bold'}} 
                        onPress={()=>{

                          deleteReply(item._id).then((res)=>{
                            findReplies(props.chapterid).then((res)=>{
                              setReplies(res.result)
                            })

                          })

                          
                          }}> [x]</Text>:null}
                </Text>
              </View>
         
              <View>

              </View>
            </View>:null}

          
         </View>
          
        )
      })








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
                <TextInput 
                color='black'
                editable={editableComment}
                multiline
                value={comment}
                onChangeText={(text)=>{setComment(text)}}                          
                />            
            </View>


{/* 
              <View style={styles.commentArea}>
                <Text>{props.comment}</Text>
              </View>
 */}

            </View>

            {allowDelete?<View style={{flexDirection:'row', justifyContent:'space-around', height:25}}>
{!editableComment?<View>
                <TouchableOpacity onPress={()=>{setEditablecomment(!editableComment)}}>
                  <View style={{height:20, width:70, backgroundColor:'#DEDEDE', borderRadius:3}}>
                    <Text style={{textAlign:'center'}}>Edit</Text>
                  </View>                    
                </TouchableOpacity>                
              </View>:
              <View style={{flexDirection:'row', justifyContent:'space-around', height:25}}>
                <View>
                  <TouchableOpacity onPress={()=>{
                    setEditablecomment(!editableComment)
                    setComment(Respcomment)
                    }}>
                    <View style={{height:20, width:70, backgroundColor:'pink'}}>
                      <Text style={{textAlign:'center'}}>Cancel</Text>
                    </View>                    
                  </TouchableOpacity>  
                </View>
                <View style={{height:20, width:20, backgroundColor:'lightgreen'}}>
                  <Text style={{alignSelf:"center"}}  
                  onPress={()=>{
                    if(comment==''){
                      alert('Empty comments not allowed')
                      setComment(Respcomment)
                    }else{                    
                      updateComment(props.commentid, comment).then((res)=>{
                        setEditablecomment(!editableComment)
                        console.log(res)
                      })
                    }
                  }}>S</Text>
                </View>
              
              </View>
              
              
              
              }
              <View >
                <TouchableOpacity onPress={()=>{
                deleteComment(props.commentid)
                  .then(res=>{
                    alert(res.message)                    
                  })
                  
                  }}>
                  <View style={{height:20, width:70, backgroundColor:'pink', borderRadius:3}}>
                    <Text style={{textAlign:'center'}}>delete</Text>
                  </View>                    
                </TouchableOpacity>    
              </View>
              <View style={{height:20, width:70, borderRadius:3}}>
                <TouchableOpacity onPress={()=>{setAllowcomment(!allowComment)}}>
                  <View style={{height:20, width:70, backgroundColor:'#DEDEDE', borderRadius:3}}>
                    <Text style={{textAlign:'center'}}>reply</Text>
                  </View>                    
                </TouchableOpacity>                
              </View>
            </View>:
            <View style={{flexDirection:'row', justifyContent:'space-around', height:25}}>
            <View>              
                <View style={{height:20, width:70}}>
                  {/* relleno para alinear de ultimo el boton "reply" */}
                </View>                        
            </View>
            <View >              
                <View style={{height:20, width:70}}>
                    {/* relleno para alinear de ultimo el boton "reply" */}
                </View>                
            </View>
            <View style={{height:20, width:70, borderRadius:3}}>
              <TouchableOpacity onPress={()=>{setAllowcomment(!allowComment)}}>
                <View style={{height:20, width:70, backgroundColor:'#DEDEDE', borderRadius:3}}>
                  <Text style={{textAlign:'center'}}>reply</Text>
                </View>                    
              </TouchableOpacity>                
            </View>
          </View>


            

            
            }


          </View>{/* contenido del card */}
          
          
        </Card>
        
{
  reps
}
{allowComment?<View>
          <View style={styles.inputcomment}>
              <TextInput 
              multiline
              onChangeText={(text)=>{setReply(text)}} 
              placeholder="Enter your text..."             
              />            
            </View>

            <View style={{width:'30%', alignSelf:'flex-end', marginTop:2}}>
              <Button color={'orange'} title="reply" onPress={()=>{
                  if(!props.loggeduserid)alert("Sign in before reply")
                  else if(reply=='')alert("fill the fiels please")
                  else{
                    saveReply(props.commentid, props.chapterid, props.loggeduserid, props.name, reply)
                    .then((res)=>{
                      findReplies(props.chapterid).then((res)=>{
                        setReplies(res.result)
                      })
                    })
                  }
                }}/>
            </View>

        </View>:null}




    </View>

    );
  };

const styles = StyleSheet.create({
    profile:{
        width:100,
        height:'auto',
/*         backgroundColor:'lightgray', */
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
        borderWidth:1,
        borderColor:'#ECECEC'
  /*       backgroundColor:'lightgray',    */     
      },
      optArea: {
        height:15,
        width:50,
        backgroundColor:'black'
      },
      inputcomment: {
        alignSelf:'center',    
        marginTop:10,
        width:'97%',
        borderColor:"black",
        borderWidth:1,     
        borderRadius:0,
        padding:10
      },

});
