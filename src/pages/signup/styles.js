import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    lienzo: {
      flex:1,    
      backgroundColor: 'white',
      alignItems:'center',
    },
    container:{
      width:'85%',
      alignItems:'center',
    },
    inputEmailContainer:{      
      justifyContent:'center',
      alignItems:'center',
      width:'100%', 
      flexDirection:'row',
    },   
      email: {
        marginTop:10,
        width:'100%',
        borderColor:"black",
        borderWidth:1,     
        borderRadius:7,
        padding:10
      },
      password: {  
          marginTop:15,    
          width:'100%',
          borderColor:"black",
          borderWidth:1,     
          borderRadius:7,
          padding:10
        },
        button: {  
          marginTop:15,    
          backgroundColor: 'black'        
        },
        text: {   
          width:360,
          fontSize:15,
          letterSpacing:1.5,
          textAlign:'center',        
          color:'gray',
          padding:15              
      },
    });