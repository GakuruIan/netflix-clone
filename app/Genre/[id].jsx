import { View, Text, ScrollView,Image,StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

// expo-router
import { router, useLocalSearchParams,Link } from "expo-router";

// expo status bar
import { StatusBar } from "expo-status-bar";

// axios
import { BaseUrl, ImageUrl } from "../../Axios/axios";

// components
import Header from "../../components/Header";
import Skeleton from "../../components/Loader/Skeleton";

// Toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";


// responsive dimensions
import {responsiveWidth} from "react-native-responsive-dimensions";

const Genre = () => {
  const { id, name } = useLocalSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading,setLoading]= useState(false)

  const FetchMovies = async () => {
    setLoading(true)
    await BaseUrl.get(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    )
      .then((response) => {
        if (response.status === 200) {
          setMovies(response.data.results);
        }
      })
      .catch((err) => {
        Toast.show("An error occured", ToastOptions);
        console.log(err);
      })
      .finally(()=>{
        setLoading(false)
      })
  };

  useEffect(() => {
    FetchMovies();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header text={name} />

      <ScrollView className="h-full">

        {
          isLoading ? <Skeleton num={20} /> :
          <View className="px-2 pb-4 h-full flex-row  gap-x-2  gap-y-2 flex-wrap">
           {movies.map((item) => {
            return (
              <Link href={`/movie/${item?.id}`} style={styles.image} className={` h-40 `}  key={item.id}>
                <View  style={styles.image} className={` h-40 `}>
                  <Image
                    source={{uri:`${ImageUrl}/${item?.poster_path ? item?.poster_path : item?.backdrop_path}`}}
                    resizeMode="cover"
                    className="h-full w-full object-cover rounded-sm"
                    
                  />
                </View>
              </Link>
            );
           })}
        </View>
        }

         

      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(30)

  },
});




export default Genre;
