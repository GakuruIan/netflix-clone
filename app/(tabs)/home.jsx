import { View, Text,ScrollView,Image,Animated } from 'react-native'
import React,{useRef} from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

// components
import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'


import Row from '../../components/Row'

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
   <SafeAreaView className="bg-primary h-full">
    <Navbar scrollY={scrollY}/>

     <Animated.ScrollView className='h-full relative'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
     >

     <Banner />

      <Row title='Animation'/>

      <Row title='Upcoming'/>

      <Row title='Documentary'/>
    
     </Animated.ScrollView>
     <StatusBar style='light' />
   </SafeAreaView>
  )
}

export default Home