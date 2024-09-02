import { View} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React,{useEffect,useState} from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

// links
import { Link,router ,useRootNavigationState} from 'expo-router'

// components
import Onboarding from '../components/Onboarding'
import Profile from '../screens/Profile'

// context
import {useGlobalContext} from '../context/Context'

const Index = () => {
  const {isLoggedIn} = useGlobalContext()

  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {

  //   setIsMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (isMounted && !isLoggedIn) {
  //     router.replace('/login');
  //   }
  // }, [isMounted, isLoggedIn, router]);

  return (
  
    <SafeAreaView className='bg-primary h-full'>
       
        <View>
          {/* <Onboarding/> */}

          <Profile/>
        </View>
        <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Index