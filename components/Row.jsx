import { View, Text, FlatList, Image } from "react-native";
import React,{useState,useEffect} from "react";

import { Link } from "expo-router";

// axios
import { BaseUrl,ImageUrl } from "../Axios/axios";

// toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../config/toast";


const Row = ({ title, url,wide }) => {
  const [movies,setMovies] = useState([])

  const FetchData=async()=>{

    await BaseUrl.get(url).then((response)=>{
      if(response.status === 200){
        setMovies(response.data.results)

      }
    })
    .catch((err)=>{
      Toast.show('An error occurred',ToastOptions)
      console.log(err)
    })

  }

  useEffect(()=>{
     FetchData()
  },[])


  return (
    <View className="my-2 px-2">
      <Text className="text-white text-xl font-title mb-2">{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/movie/${item?.id}`} className="mx-1">
            <View className={`${wide ? 'h-40 w-52' :  'h-48 w-36'}`}>
              <Image
               source={{uri:`${ImageUrl}/${item?.poster_path ? item?.poster_path : item?.backdrop_path}`}}
                resizeMode="cover"
                className="h-full w-full rounded-md object-cover"
              />
              <Text className='text-white'>{item?.title}</Text>
            </View>
          </Link>
        )}
      />
    </View>
  );
};

export default Row;
