import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    lienzo: {
      flex: 1,
      backgroundColor: '#fff',

    },
    container: {
      width:'95%',
      alignItems: 'center',  
      alignSelf:'center',
    },
    allowedContent: {
      width:'100%',
      marginTop:15,
    },
    bodytop:{
      height:40,
      width:'100%',    
      backgroundColor: 'white',    
    },
    bodylow:{
      height:'100%',
      width:'100%',    
      backgroundColor: 'lightgray',    
    },
    input: {
      marginTop:5,
      width:'100%',
      borderColor:"black",
      borderWidth:1,     
      borderRadius:10,
      padding:10
    },
    taptodelete: {
      height:30, 
      width:100, 
      backgroundColor:'orange', 
      marginTop:20 , 
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
    },
    texttaptodelete: {
      fontSize:17, 
      color:'gray', 
      alignSelf:'center', 
      marginTop:10,
    },
    texteditchapter: {
      color:'gray', 
      fontSize:20, 
      fontWeight:'bold', 
      textAlign:'center',
    },
  });