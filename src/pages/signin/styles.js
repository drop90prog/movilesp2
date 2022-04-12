import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    lienzo: {
      flex:1,    
      backgroundColor: 'white',
      alignItems:'center',
    },
    container: {
      width:'85%',
    },
    inputEmailContainer:{
      borderColor:"black",
      borderWidth:1,
      borderRadius:7,
      marginTop:30,
      justifyContent:'center',
      alignItems:'center',
      height:50, 
      width:'100%', 

      flexDirection:'row',
    },    
    inputEmail:{
    

      width:'85%', 

    },
  
      email: {
 /*     marginTop:10, */
        width:'100%',
/*      borderColor:"black",
        borderWidth:1,     */ 
        borderRadius:10,
        padding:10
      },
      password: {  
          marginTop:15,    
          width:'100%',
          borderColor:"black",
          borderWidth:1,     
          borderRadius:10,
          padding:10
        },
        button: {  
          marginTop:15,    
          backgroundColor: 'black'        
        },
        text: {   
            fontSize:15,
            letterSpacing:1.5,
            textAlign:'center',        
            color:'gray',
            padding:15              
        },

    });