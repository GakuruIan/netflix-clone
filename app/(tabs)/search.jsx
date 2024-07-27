import { View, Text, FlatList, Image,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";
// icons
import {
  MagnifyingGlassIcon,
  CircleStackIcon,
  CalendarDaysIcon,
  StarIcon,
  TvIcon,
} from "react-native-heroicons/outline";

// components
import Empty from "../../components/Empty";

import { BaseUrl, ImageUrl } from "../../Axios/axios";

// toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [isEmpty, setisEmpty] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleSearch = () => {
    setisLoading(true);
    if (search === "") {
      Toast.show("Please enter a movie or TV show to search", ToastOptions);
      return;
    }

    BaseUrl.get("search/multi", {
      params: {
        query: search,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const { results } = response.data;

          if (results.length === 0) {
            setisEmpty(true);
          } else {
            const filteredMovies = results.filter((movie) => {
              const lacksTitleAndOriginalTitle =
                !movie.title && !movie.original_title;
              const lacksPosterPathAndBackdropPath =
                !movie.poster_path && !movie.backdrop_path;

              return !(
                lacksTitleAndOriginalTitle || lacksPosterPathAndBackdropPath
              );
            });
            setMovies(filteredMovies);
            setisEmpty(false);
          }
        }
      })
      .catch((err) => {
        Toast.show("An error occurred try again later", ToastOptions);
        console.log(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <View className="w-full relative py-2 px-2 mb-2">
          <Input
            placeholder="Movies, Tv shows and more."
            PreIcon={CircleStackIcon}
            secure={false}
            value={search}
            handleChange={(e) => setSearch(e)}
            className=""
          />

          <View className="absolute right-4 top-10">
            <Button handlePress={handleSearch}>
              <MagnifyingGlassIcon color="#fff" />
            </Button>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/movie/${item?.id}`} className="my-2">
              <View className="px-2 flex-row mb-4">
                <Image
                  source={{
                    uri: `${ImageUrl}/${
                      item?.poster_path
                        ? item?.poster_path
                        : item?.backdrop_path
                    }`,
                  }}
                  resizeMode="cover"
                  className="h-24 w-24 rounded-sm object-cover"
                />
                <View className="ml-2">
                  <Text className="text-white font-title text-xl">
                    {item?.title ? item?.title : item?.original_title}
                  </Text>

                  <View className="flex-row items-center my-2 gap-x-4">
                    <View className="flex-row items-center my-2">
                      <CalendarDaysIcon color="#828892" scaleX={0.8} />
                      <Text className="ml-2 text-gray-400 font-text-light text-base">
                        {item?.first_air_date
                          ? item?.first_air_date
                          : item?.release_date}
                      </Text>
                    </View>

                    <View className="flex-row items-center my-2 ml-4">
                      <StarIcon
                        color="#828892"
                        scaleX={0.8}
                        className="h-4 w-4"
                      />
                      <Text className="ml-2 text-gray-400 font-text-light text-base">
                        {item?.vote_average}
                      </Text>
                    </View>

                    <View className="flex-row items-center my-2">
                      <TvIcon color="#828892" scaleX={0.8} />
                      <Text className="ml-2 text-gray-400 font-text-light text-base">
                        {item?.media_type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Link>
          )}
          ListEmptyComponent={isEmpty && <Empty text="No match found" />}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
