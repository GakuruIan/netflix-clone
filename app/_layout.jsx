import React,{useEffect} from 'react'

import { useFonts } from 'expo-font'
import { SplashScreen,Stack } from 'expo-router'

import { RootSiblingParent } from 'react-native-root-siblings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import GlobalProvider from '../context/Context'

const Layout = () => {

    const [loadedFonts,error] = useFonts({
        "SairaCondensed-Light":require('../assets/fonts/SairaCondensed-Light.ttf'),
        "SairaCondensed-Thin":require('../assets/fonts/SairaCondensed-Thin.ttf'),
        "Poppins":require('../assets/fonts/Poppins-Regular.ttf')
    })

    useEffect(()=>{
        if(error) throw error
  
        if(loadedFonts){
          SplashScreen.hideAsync()
        }
    },[loadedFonts,error])
  
    if (!loadedFonts) {
      return null;
    }
  
    if (!loadedFonts && !error) {
      return null;
    }

  return (
    <GestureHandlerRootView>
      <GlobalProvider>
      <RootSiblingParent>
          <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
            <Stack.Screen name="(auth)" options={{headerShown:false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
            <Stack.Screen name="movie/[id]"  options={{headerShown:false}} />
            <Stack.Screen name="Genre/[id]"  options={{headerShown:false}} />
            <Stack.Screen name="Profile/[id]"  options={{headerShown:false}} />
            <Stack.Screen name="Settings/settings"  options={{headerShown:false}} />
          </Stack>
      </RootSiblingParent>
      </GlobalProvider>
    </GestureHandlerRootView>
  )
}

export default Layout