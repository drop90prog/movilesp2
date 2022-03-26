import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }


 export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        
        return value
      }
    } catch(e) {
      // error reading value
    }
  }

  export const removeData = async (key) => {
    try {
      const value = await AsyncStorage.removeItem(key)
      if(value !== null) {
        alert(value)
      }
    } catch(e) {
      // error reading value
    }
  }