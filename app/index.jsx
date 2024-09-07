import { View,ActivityIndicator} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React,{useEffect,useState} from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

// links
import { Link,router ,useRootNavigationState,Redirect} from 'expo-router'

// components
import Onboarding from '../components/Onboarding'
import Profile from '../screens/Profile'

// context
import {useGlobalContext} from '../context/Context'

// asyncStorage 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const {isLoggedIn,isLoading} = useGlobalContext()
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [Loading, setLoading] = useState(true);

 
  
  useEffect(()=>{
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      if (value !== null) {
        setHasSeenOnboarding(true);
      }
      setLoading(false);
    };

    checkOnboardingStatus();
  },[])

  if (!isLoading && !isLoggedIn) return <Redirect href="/login" />;
  
  if(Loading){
    return (
       <View className="bg-primary flex-1 items-center justify-center">
              <ActivityIndicator color="red" size="large"/>
       </View>
    )
  }

  

  return (
  
    <SafeAreaView className='bg-primary h-full'>
        <View> 
          {
            hasSeenOnboarding ? <Profile /> : <Onboarding/>
          }
        </View>
        <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Index