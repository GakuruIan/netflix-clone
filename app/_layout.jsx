import React,{useEffect} from 'react'

import { useFonts } from 'expo-font'
import { SplashScreen,Stack } from 'expo-router'

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
   <Stack>
     <Stack.Screen name='index' options={{headerShown:false}}/>
     <Stack.Screen name="(auth)" options={{headerShown:false}}/>
   </Stack>
  )
}

export default Layout