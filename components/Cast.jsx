import { View, Text,FlatList,Image } from "react-native";
import React,{useState,useEffect} from "react";

import { BaseUrl,ImageUrl } from "../Axios/axios";

// toast
import Toast from "react-native-root-toast";
import {ToastOptions} from '../config/toast'

const Cast = ({url}) => {
  const [casts,setCasts]= useState()

  useEffect(()=>{

    const FetchCasts=async()=>{
        await BaseUrl.get(url)
        .then((response)=>{
            if(response.status === 200){
                setCasts(response.data.cast)
            }
        })
        .catch((err)=>{
            Toast.show('An error occurred',ToastOptions)
            console.log(err);
        })
    }
   
    FetchCasts()
  },[])

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={casts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View key={item.id} className="mx-1 h-full ">
          <Image
           source={{uri:`${ImageUrl}${item?.profile_path}`}}
            resizeMode="cover"
            className="mb-1 h-24 w-24 rounded-md object-cover"
          />
          <Text numberOfLines={1} className="text-white font-text-light ">{item?.name ? item?.name : item?.original_name  }</Text>
          <Text numberOfLines={1} className="text-gray-400 font-text-light ">{item?.character}</Text>
        </View>
      )}
    />
  );
};

export default Cast;
