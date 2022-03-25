import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function Chapters({route}) {

  return (
    <View style={styles.container}>
      <Text>{route.params.msg}</Text>
         <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',  
    justifyContent:'center',
  },
});
