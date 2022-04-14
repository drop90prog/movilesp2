import { StyleSheet, ActivityIndicator } from 'react-native';





export const styles = StyleSheet.create({
    lienzo: {
      flex:1,    
      backgroundColor: 'white',   
    },
    content: {
      width:'95%',
      alignItems:'center',
      alignSelf:'center',

    },
    allowedContent: {
      width:'100%',

    },
    avatarContainer: {
      padding:20,
      flexDirection:'row',
      justifyContent: 'space-around'
    },
    avatarContainerInProcess: {
      backgroundColor: 'white',
      padding:20,
      flexDirection:'row',
      justifyContent: 'space-around',
      opacity: .2
    },
    inputsContainer: {  
      width:'100%',
      height:'100%',
      alignItems:'center',
    },
  
      input: {
        justifyContent:'center',
        width:'80%',
        marginTop:10,
        borderColor:"lightgray",
        borderWidth:1,     
        borderRadius:5,
        padding:10
      },
        button: {  
          width:'80%',
          marginTop:20,
         
        },
        followingMangasContainer: {
          marginTop:30,
          marginBottom:60,
          alignItems:'center',
        },
        followingMangas: {
          flexDirection:'row', 
          marginTop:20, width:'100%', 
          justifyContent:'space-evenly',
        },
        text: {            
          padding:15              
        },
        link: {            
          color: 'blue',
          textDecorationLine: 'underline'
        },

        notAllowedContent:{
          marginTop:'61.5%',          
        },
    
        text: {
          color:'gray',
          fontSize:15
        },





    });