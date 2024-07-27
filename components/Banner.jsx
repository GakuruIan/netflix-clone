import { View, Text, Image } from "react-native";
import React from "react";

import { StyleSheet } from "react-native"

// responsive dimensions
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

import { ImageUrl } from "../Axios/axios";

// icon
import {
  PlayIcon,
  ExclamationCircleIcon,
  CheckIcon,
} from "react-native-heroicons/outline";

// component
import Button from "./Button";

const Banner = ({ movie ,loading}) => {


  return (
    <View className="relative items-center justify-center w-full mb-4">
      <View className="items-center w-full pt-2">
        {
          <View className="items-center justify-center  pb-2 w-full blur-3xl">
            <Image
              source={{
                uri: `${ImageUrl}/${
                  movie?.poster_path ? movie?.poster_path : movie?.backdrop_path
                }`,
              }}
              resizeMode="cover"
              style={styles.image}
              className="rounded-lg"
            />

            <View className="mt-4">
              <Text className="text-white text-center text-xl font-title mb-2">
                {movie?.original_title ? movie?.original_title : movie?.title}
              </Text>

              {movie?.genres?.length > 0 && (
                <View className="flex-row gap-x-2 items-center my-2">
                  {movie?.genres.map((genre) => {
                    return (
                      <Text className="text-white font-text-thin">
                        {genre?.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <View className="flex-row w-80 mt-2">
                <Button
                  classes={
                    "flex  items-center  flex-row bg-none border border-light flex-1 px-2  py-2 rounded-sm"
                  }
                >
                  <CheckIcon color="#fff" scale={0.8} />
                  <Text style={styles.sampleText} className=" font-text-light mx-2 text-white text-xl font-semibold">
                    My List
                  </Text>
                </Button>

                <Button
                  classes={
                    "flex  items-center flex-row bg-white flex-1 px-2  py-2 rounded-sm mx-2"
                  }
                >
                  <PlayIcon color="#222" scale={0.8} />
                  <Text style={styles.sampleText} className="mx-2 font-text-light text-xl font-semibold">
                    Play
                  </Text>
                </Button>

                <Button
                  classes={
                    "flex  items-center flex-row bg-none border border-light flex-1 px-2  py-2 rounded-sm"
                  }
                >
                  <ExclamationCircleIcon color="#fff" scale={0.8} />
                  <Text style={styles.sampleText} className="mx-2 font-text-light text-white  font-semibold">
                    Info
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        }


      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(35), // 50% of window height
    width: responsiveWidth(50), // 50% of window width
    objectFit:'fit',
  },
  sampleText: {
    fontSize: responsiveFontSize(2) // 2% of total window size
  }

});