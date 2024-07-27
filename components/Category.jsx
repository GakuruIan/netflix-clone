import { View, Text ,FlatList} from 'react-native'
import React ,{useState,useEffect}from 'react'

import { BaseUrl } from '../Axios/axios'

// toast
import Toast from "react-native-root-toast";
import { ToastOptions } from '../config/toast'

const Category = () => {
   const [categories,setCategories] = useState()

   useEffect(()=>{
      BaseUrl.get('genre/movie/list')
      .then((response)=>{
            if (response.status === 200){
                const {genres} = response.data
                setCategories(genres)
            }
      })
      .catch((err)=>{
        Toast.show('An error occured',ToastOptions)
         console.log(err)
      })
   },[])
  return (
   <FlatList 
    data={categories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item=>item.id)}
    renderItem={({item})=>(
        <View className='bg-white py-1.5 px-4 flex-row mx-1 flex-1 rounded-sm'>
            <Text className='font-text-light text-base'>{item.name}</Text>
        </View>
    )}
   />
  )
}

export default Category