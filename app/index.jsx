import { View} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

// components
import Onboarding from '../components/Onboarding'
import Profile from '../screens/Profile'
const Index = () => {
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