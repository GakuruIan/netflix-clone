import { View, Text, ScrollView,Image } from "react-native";
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

// Toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";

const Genre = () => {
  const { id, name } = useLocalSearchParams();
  const [movies, setMovies] = useState([]);

  const FetchMovies = async () => {
    await BaseUrl.get(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMovies(response.data.results);
        }
      })
      .catch((err) => {
        Toast.show("An error occured", ToastOptions);
        console.log(err);
      });
  };

  useEffect(() => {
    FetchMovies();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header text={name} />

      <ScrollView className="h-full">

          <View className="px-2 pb-4 h-full flex-row justify-center gap-x-1 gap-y-3 flex-wrap">
            {movies.map((item) => {
              return (
                <Link href={`/movie/${item?.id}`} className="h-40 w-32" key={item.id}>
                  <View className='h-40 w-32 '>
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

      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Genre;
