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

  export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  


  export const firebaseConfig = {
    apiKey: "AIzaSyBY1tvycaxPx9XO28hR27_gMxvryYNsPSs",
    authDomain: "movilesp2-aa8f3.firebaseapp.com",
    projectId: "movilesp2-aa8f3",
    storageBucket: "movilesp2-aa8f3.appspot.com",
    messagingSenderId: "698145061839",
    appId: "1:698145061839:web:c79ce8885c781b6421b0ba"
  };
  
  