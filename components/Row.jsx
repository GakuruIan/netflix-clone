import { View, Text,FlatList,Image } from 'react-native'
import React from 'react'

import animation from '../assets/images/Images/animation.jpg'
import { Link } from 'expo-router'

const Row = ({title,url}) => {

  return (
    <View className='my-2 px-2'>
     <Text className='text-white text-xl font-title mb-2'>{title}</Text>
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1,2,3,4,5]}
        keyExtractor={item=>item}
        renderItem={({item})=>(
            <View  className='mx-1 h-48 w-36'>
                  <Image source={animation} resizeMode='cover' className='h-48 w-36 rounded-sm object-cover'/>  
            </View>
        )}
      />
    </View>
  )
}

export default Row