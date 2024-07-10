import { View, Text ,Dimensions,Image} from 'react-native'
import React from 'react'


const Slider = ({data:id,image,description}) => {
  const {width,height} = Dimensions.get('screen')

  return (
    <View>
      <View className='h-screen w-96'>
        <Image source={image} resizeMode='cover' className='h-96 w-96 object-cover'/>
      </View>
    </View>
  )
}

export default Slider