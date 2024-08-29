import { View} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

// links
import { Link } from 'expo-router'

// components
import Onboarding from '../components/Onboarding'
import Profile from '../screens/Profile'

// context
import {useGlobalContext} from '../context/Context'

const Index = () => {
  const {user} = useGlobalContext()

  return (
  
    <SafeAreaView className='bg-primary h-full'>
       
        <View>
          {/* <Onboarding/> */}

          {/* <Profile/> */}
          <Link href='/register' className='text-white text-3xl'>Home</Link>
        </View>
        <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Index