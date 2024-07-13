import { View, Text,Image } from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient'

// images
import action from '../assets/images/Onboarding/action.jpg'

// icon
import {PlayIcon,BookmarkIcon } from "react-native-heroicons/outline";

// component
import Button from './Button';


const Banner = ({image,title,tags}) => {
  return (
    <View className="relative items-center justify-center w-full mb-4">
           <Image source={action} resizeMode='cover' className="object-cover h-96 w-full"/>

            <LinearGradient  
              colors={["rgba(0,0,0,0.4)" ,"rgba(0,0,0,0.9)"]}
              className="absolute h-96 w-full"
            >
              <View className='absolute bottom-10 px-2'>
                <Text className='text-white text-3xl font-title'>GodZilla and Kingkong</Text>

                {/* tags */}
                <View className='flex-row gap-x-2 items-center my-2'>
                  <Text className='text-white font-text-thin'>Action</Text>
                  <Text className='text-white font-text-thin'>Supernatural</Text>
                  <Text className='text-white font-text-thin'>Mysterious</Text>
                </View>
                 {/* tags */}

                 {/* buttons */}
                 <View className="flex-row">
                  <Button classes={'flex  items-center flex-row bg-white w-32 px-2 mt-2 py-1.5 rounded-sm mr-4'}>
                    <PlayIcon color='#222' scale={0.8}/>
                    <Text className='ml-2 font-text-light text-xl font-semibold'>Play</Text>
                  </Button>

                  <Button classes={'flex  items-center flex-row bg-white/40 w-32 px-2 mt-2 py-1.5 rounded-sm'}>
                    <BookmarkIcon color='#fff' scale={0.8}/>
                    <Text className='ml-2 font-text-light text-white text-xl font-semibold'>Save</Text>
                  </Button>
                </View>
                 
                  
                 {/* buttons */}
              </View>
            </LinearGradient>
      </View>
  )
}

export default Banner