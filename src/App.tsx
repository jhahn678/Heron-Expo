import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as SecureStore from 'expo-secure-store'
import { Provider as PaperProvider } from 'react-native-paper'
import { useAuth } from './store/auth/useAuth'
import AppStack from './navigation/RootStack'


export default function App() { 
  const [appIsReady, setAppIsReady] = useState(false)

  const { autoSignIn } = useAuth()

  const prepareApp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      const token = await SecureStore.getItemAsync('AUTH_TOKEN')
      if(token) await autoSignIn(token)
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
    <PaperProvider>
      <AppStack/>
    </PaperProvider>
  );
}


