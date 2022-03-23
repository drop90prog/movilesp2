import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";



export default function Home() {
  const user = useSelector((state) => state.user); // datos del usuario logueado
  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
