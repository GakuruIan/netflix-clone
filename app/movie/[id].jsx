import {
  View,
  Text,
  ScrollView,
  Image,
  Animated
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Row from "../../components/Row";
import Cast from "../../components/Cast";

// expo-router
import { router, useLocalSearchParams } from "expo-router";

// icons
import {
  PlayIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowDownOnSquareIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";

// axios
import { BaseUrl, ImageUrl } from "../../Axios/axios";

// Toast
import Toast from 'react-native-root-toast';
import { ToastOptions } from "../../config/toast";

const Movie = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState({});

  const FetchMovie = async () => {
    console.log(id);
    await BaseUrl.get(`/movie/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          setMovie(response.data)
        }
      })
      .catch((err) => {
        Toast.show('An error occured',ToastOptions)
        console.log(err);
      });
  };

  useEffect(() => {
    FetchMovie();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <Navbar scrollY={scrollY} />

      <ScrollView>
        <Image
          source={{
            uri: `${ImageUrl}/${
              movie?.poster_path ? movie?.poster_path : movie?.backdrop_path
            }`,
          }}
          resizeMode="cover"
          className="h-96 w-full object-cover mb-4"
        />

        <View className="px-2.5 pb-4">
          {/* movie name and tags */}
          <View className="mb-2">
            <Text className="text-white text-3xl font-title">
              {movie?.original_title ? movie?.original_title : movie?.title}
            </Text>

            {/* tags */}

            {movie?.genres?.length > 0 && (
              <View className="flex-row gap-x-2 items-center my-2">
                {movie?.genres.map((genre) => {
                  return (
                    <Text
                      key={genre.id}
                      className="text-gray-400 font-text-light"
                    >
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}

            {/* tags */}
          </View>
          {/* movie name and tags */}

          <View className="mb-4">
            <Button
              classes={"flex flex-row items-center bg-white py-3 rounded-sm"}
            >
              <PlayIcon color="#222" />
              <Text className="font-text-light text-xl ml-4">Play</Text>
            </Button>

            <Button
              classes={
                "mt-4 flex flex-row items-center bg-light py-3 rounded-sm"
              }
            >
              <ArrowDownOnSquareIcon color="#fff" />
              <Text className="font-text-light text-white text-xl ml-4">
                Download
              </Text>
            </Button>
          </View>

          {/* movie overview */}
          <View className=" mb-2">
            <Text className="text-base text-gray-400 font-text-light">
              {movie?.overview}
            </Text>
          </View>
          {/* movie overview */}

          {/* actions */}
          <View className=" mt-2 mb-4 flex-row items-center">
            <View className="flex-row items-center py-2 mr-2  rounded-md bg-primaryBtn px-4">
              <CheckIcon color="#fff" />
              <Text className="text-white font-text-light text-base mx-2">
                My List
              </Text>
            </View>

            <View className="flex-row items-center py-2 mr-2 rounded-md bg-primaryBtn px-4">
              <ChatBubbleBottomCenterTextIcon color="#fff" scale={20} />
              <Text className="text-white font-text-light text-base mx-2">
                Reviews
              </Text>
            </View>

            <View className="flex-row items-center py-2 mr-2 rounded-md bg-primaryBtn px-4">
              <PaperAirplaneIcon color="#fff" scale={20} />
              <Text className="text-white font-text-light text-base mx-2">
                Recommend
              </Text>
            </View>
          </View>
          {/* actions */}

          {/*cast information  */}
          <View className=" mb-2">
            <Text className="text-white font-text-title text-xl mb-4">
              Top Cast
            </Text>
            {/* casts list */}
             <Cast url={`movie/${id}/credits`}/>
            {/* cast list */}
          </View>
          {/*cast information  */}

          <Row title="More Like This" url={`movie/${id}/similar`} wide={false}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
