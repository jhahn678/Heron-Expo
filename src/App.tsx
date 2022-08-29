import { useState, useEffect } from 'react'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'


export default function App() { const [appIsReady, setAppIsReady] = useState(false)

  const prepareApp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      //Perform async loading here
    }catch(err){
      console.warn(err)
    }finally{
      setAppIsReady(true)
    } 
  }

  useEffect(() => {
    prepareApp()
  },[])


  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
  }


  useEffect(() => {
    if(appIsReady) {
      hideSplashScreen()
    }
  },[appIsReady])
  
  if(!appIsReady){
    return null;
  }


  return (
    <View></View>
  );
}


