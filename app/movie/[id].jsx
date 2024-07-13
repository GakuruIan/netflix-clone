import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Row from "../../components/Row"

// icons
import {
  PlayIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowDownOnSquareIcon,
  PaperAirplaneIcon
} from "react-native-heroicons/outline";

// image
import action from "../../assets/images/Onboarding/action.jpg";

const Movie = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Navbar scrollY={scrollY} />

      <ScrollView>
        <Image
          source={action}
          resizeMode="cover"
          className="h-96 w-full object-cover mb-4"
        />

        <View className="px-2.5 pb-4">
          {/* movie name and tags */}
          <View className="mb-2">
            <Text className="text-white text-3xl font-title">
              Kingkong and Godzilla
            </Text>

            {/* tags */}
            <View className="flex-row gap-x-2 items-center my-2">
              <Text className="text-gray-400 font-text-light">Action</Text>
              <Text className="text-gray-400 font-text-light">
                Supernatural
              </Text>
              <Text className="text-gray-400 font-text-light">Mysterious</Text>
            </View>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              eius molestias? Sed cumque aspernatur perspiciatis debitis at sint
              ad laboriosam iure in, tenetur quae. Unde distinctio tempore
              quidem perspiciatis officia?
            </Text>
          </View>
           {/* movie overview */}

          {/* actions */}
          <View className=" mt-2 mb-4 flex-row items-center">
           <View className="flex-row items-center py-2 mr-2  rounded-md bg-primaryBtn px-4">
              <CheckIcon color="#fff"/>
              <Text className='text-white font-text-light text-base mx-2'>My List</Text>
           </View>

           <View className="flex-row items-center py-2 mr-2 rounded-md bg-primaryBtn px-4">
              <ChatBubbleBottomCenterTextIcon color="#fff" scale={20}/>
              <Text className='text-white font-text-light text-base mx-2'>Reviews</Text>
           </View>

           <View className="flex-row items-center py-2 mr-2 rounded-md bg-primaryBtn px-4">
              <PaperAirplaneIcon color="#fff" scale={20}/>
              <Text className='text-white font-text-light text-base mx-2'>Recommend</Text>
           </View>

          </View>
          {/* actions */}

          {/*cast information  */}
          <View className=" mb-2">
            <Text className="text-white font-text-title text-xl mb-4">
              Top Cast
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4, 5]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View className="mx-1 h-full ">
                  <Image
                    source={action}
                    resizeMode="cover"
                    className="mb-1 h-24 w-24 rounded-md object-cover"
                  />
                  <Text className="text-white font-text-light ">
                    Actor name
                  </Text>
                  <Text className="text-gray-400 font-text-light ">role</Text>
                </View>
              )}
            />
          </View>
          {/*cast information  */}

          
          <Row title="More Like This"/>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
