import {
  View,
  Text,
  FlatList,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Navbar from "../../components/Navbar";

// icons
import {
  BellAlertIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/outline";

// toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";

import { BaseUrl, ImageUrl } from "../../Axios/axios";
const New = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    BaseUrl.get("movie/popular")
      .then((response) => {
        if (response.status === 200) {
          const { results } = response.data;
          setPopular(results);
        }
      })
      .catch((err) => {
        Toast.show("An error occured", ToastOptions);
        console.log(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="h-full bg-primary">
      <Navbar />

      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
           <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <FlatList
          data={popular}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-2 ">
              {/* content */}
              <View className="py-4 border-b border-light ">
                <Text className="text-white text-xl font-title mb-2">
                  {item?.title ? item.title : item.original_title}
                </Text>

                <Image
                  source={{
                    uri: `${ImageUrl}/${
                      item?.poster_path
                        ? item?.poster_path
                        : item?.backdrop_path
                    }`,
                  }}
                  resize="cover"
                  className="h-64 w-full object-fit rounded-sm"
                />

                <View className="mt-3">
                  <Text className="text-base  text-gray-400 font-text-light">
                    {item?.overview}
                  </Text>
                  <View className="flex-row items-center justify-between  mt-3">
                    <Text className="text-base text-white font-text-light">
                      Coming August 31
                    </Text>

                    <View className="flex-row items-center">
                      <BellAlertIcon color="#fff" />
                      <EllipsisVerticalIcon color="#fff" />
                    </View>
                  </View>
                </View>
              </View>
              {/* content */}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default New;
