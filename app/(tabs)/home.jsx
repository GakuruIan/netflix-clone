import { Animated } from 'react-native'
import React,{useRef,useState,useEffect} from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

// components
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import Row from '../../components/Row'

// axios
import { BaseUrl } from '../../Axios/axios'

import Toast from "react-native-root-toast";
import { ToastOptions } from '../../config/toast'

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [latest,setLatest] = useState({})
  const [loading,setLoading]= useState(false)

  useEffect(()=>{
    setLoading(true)
    BaseUrl.get('/movie/top_rated')
    .then((response)=>{
       if(response.status === 200){
        const num = Math.floor(Math.random(0)*20)
        setLatest(response.data.results[num])
        setLoading(false)
       }
    }).catch((err)=>{
      Toast.show('An error occured',ToastOptions)
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })

  },[])
  return (
   <SafeAreaView className="bg-primary h-full">
    <Navbar scrollY={scrollY}/>

     <Animated.ScrollView className='h-full relative pb-6'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
     >

     <Banner movie={latest} loading={loading}/>

      <Row title='Now Playing' url='/movie/now_playing'/>

      <Row title='Upcoming' url='/movie/upcoming' />

      <Row title='Top Rated' url='/movie/top_rated'/>

     </Animated.ScrollView>
     <StatusBar style='light' />
   </SafeAreaView>
  )
}

export default Home