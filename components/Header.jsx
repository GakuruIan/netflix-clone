import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'

import  {router} from 'expo-router'
import logo from '../assets/images/netflix-logo.png'

import { ChevronLeftIcon } from 'react-native-heroicons/solid'

const Header = ({text,BackIcon,PostIcon,showPostIcon}) => {
  return (
    <View className="">
        <View className="px-2 h-16  w-full flex-row items-center justify-between">
            <TouchableOpacity onPress={()=>router.back()}>
                <ChevronLeftIcon color="#fff" className="h-10 w-10"/>
            </TouchableOpacity>

            {
              text ? <Text className='text-white font-title'>{text}</Text> : <Image source={logo} resizeMode='contain' className="h-10 w-10 object-cover"/>
            }
            

            {showPostIcon ? 
            <TouchableOpacity>
                <PostIcon color="#fff"/>
            </TouchableOpacity> 
            : <Text></Text>}
           
        </View>   
    </View>
  )
}

export default Header