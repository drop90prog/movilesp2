import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  lienzo: {
    flex:1,    
    backgroundColor: 'white',   
  },
  container: {
    width:'95%',
    alignItems:'center',
    alignSelf:'center',
  },
  allowedContent: {
    width:'100%',
  },
  
      input: {
        marginTop:5,
        width:"100%",
        borderColor:"black",
        borderWidth:1,     
        borderRadius:6,
        padding:10
      },
      password: {  
          marginTop:15,    
          width:250,
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
          padding:15              
        },
        link: {            
          color: 'blue',
          textDecorationLine: 'underline'
        },
    });