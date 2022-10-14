import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as SecureStore from 'expo-secure-store'
import { Provider as PaperProvider } from 'react-native-paper'
import { useAuth } from './store/auth/useAuth'
import RootStack from './navigation/RootStack'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './config/apollo'
import { QueryClientProvider } from '@tanstack/react-query'
import { reactQueryClient } from './config/react-query'
import { SecureStoreKeys } from './types/SecureStore'
import { StatusBar } from 'expo-status-bar'
import ModalPortal from './components/modals/ModalPortal'
import { theme } from './config/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() { 
  const [appIsReady, setAppIsReady] = useState(false)

  const autoSignIn = useAuth(store => store.autoSignIn)

  const prepareApp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      const token = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN)
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
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={reactQueryClient}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <RootStack/>
            <ModalPortal />
          </GestureHandlerRootView>
        </PaperProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}


