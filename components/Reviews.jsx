import { View, Text, Image } from "react-native";
import React from "react";

// components
import { ImageUrl } from "../Axios/axios";

// blank image
import blank from "../assets/images/blank.png";

const Reviews = ({ review }) => {
    
  return (
    <View className="mb-4">
      <View className="bg-[#333] py-2 px-2 rounded-md">
        <View className="flex-row  mb-4 items-center">
          {review?.author_details.avatar_path ? (
            <Image
              source={{
                uri: `${ImageUrl}/${review?.author_details.avatar_path}`,
              }}
              resizeMode="cover"
              className="h-8 w-8 rounded-full mr-3"
            />
          ) : (
            <Image
              source={blank}
              resizeMode="cover"
              className="h-8 w-8 rounded-full mr-3"
            />
          )}

          <Text className="text-white text-base font-text-light">
            {review?.author}
          </Text>
        </View>
        <View className="px-2">
          <Text className="text-white">{review?.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default Reviews;
