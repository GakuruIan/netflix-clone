import { View, Text ,FlatList,Pressable} from 'react-native'
import React ,{useState,useEffect,useMemo}from 'react'

import { router} from "expo-router";

import { BaseUrl } from '../Axios/axios'

// toast
import Toast from "react-native-root-toast";
import { ToastOptions } from '../config/toast'

const Category = () => {
   const [categories,setCategories] = useState([])
   const [activeItem,setActiveItem] = useState(null);

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

   const memorizedCategories = useMemo(()=>categories,[categories])

   const handlePress=(id,name)=>{
     setActiveItem(id)
    
     router.push({
        pathname: `/Genre/${id}`,
        params: { name },
      });
   }

  return (
   <FlatList 
    data={memorizedCategories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item=>item.id)}
    renderItem={({item})=>(
        <Pressable onPress={()=>handlePress(item?.id,item?.name)} className={`border border-slate-300 py-1.5 px-4 flex-row mx-1 flex-1 rounded-md ${activeItem === item.id && 'bg-white'}`}>
            <Text className={` font-text-light text-base ${activeItem === item.id ? 'text-black' : 'text-white'}`}>{item.name}</Text>
        </Pressable>
    )}
   />
  )
}

export default Category