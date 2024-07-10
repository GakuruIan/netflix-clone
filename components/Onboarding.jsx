import React,{useState} from "react";

import { router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
//
import { data } from "../data/data";
import poster from "../assets/images/Onboarding/poster.jpg";

import Button from './Button'

const Onboarding = () => {
  const { width, height } = useWindowDimensions();
  const [currentSlide,setCurrentSlide] = useState(0)

  const handleSlide=(e)=>{
    const contentOffsetX = e.nativeEvent.contentOffset.x
     const currentIndex = Math.floor(contentOffsetX/width)

    setCurrentSlide(currentIndex)
  }



  return (
    <View className="h-full bg-primary">
      <View className="h-full">
        <ImageBackground
          source={poster}
          resizeMode="cover"
          className="h-full w-full object-cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.4)" ,"rgba(0,0,0,0.6)"]}
            className="absolute top-0 right-0 left-0 bottom-0 h-full"
          />
        </ImageBackground>

        <View className="absolute bottom-10 ">
          <FlatList
            onMomentumScrollEnd={handleSlide}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ width: Math.floor(width) }}>
                <View className="px-2">
                  <Text className="text-4xl font-title text-white">
                    {item.title}
                  </Text>
                  <Text className="text-base font-text-light   text-white">
                    {item.description}
                  </Text>
                </View>
              </View>
            )}
          />
          <View className="flex-row gap-x-3 mb-4 items-center justify-center mt-4">

            {
              data.map((_,index)=>{
                return  <View key={index} className={`h-1  rounded-sm ${currentSlide === index ? 'w-5 bg-red-700' : 'w-3 bg-gray-200'}`}></View>
              })
            }
          
          </View>

         <View className="px-2">
           <Button classes="bg-primaryBtn " handlePress={()=>router.push('/register')}>
            <Text className='text-base font-text-light text-white'>Get Started</Text>
          </Button>
         </View>
        </View>
      </View>
      <StatusBar translucent={true} backgroundColor="transparent" />
    </View>
  );
};

export default Onboarding;
