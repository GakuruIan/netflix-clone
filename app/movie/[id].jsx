import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Banner from "../../components/Banner";

const Movie = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Banner />

        <View className='px-2 mb-2'>
            <Text className='text-2xl text-white font-title font-medium mb-2'>About</Text>
            <Text className='text-base text-white font-text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora cumque qui corporis esse odit harum placeat, eos optio nisi quis. Iste exercitationem tempore voluptatum libero, recusandae maxime asperiores dolore veniam itaque unde vero facere consequuntur eveniet ut suscipit molestias totam.</Text>
        </View>

        {/*meta information  */}
        <View className='px-2 mb-2'>
            <Text className='text-2xl text-white font-title font-medium mb-2'></Text>
            <Text className='text-base text-white font-text-light'></Text>
        </View>
         {/*meta information  */}

         {/* production campanies */}
         <View className='px-2 mb-2'>
            <Text className='text-2xl text-white font-title font-medium mb-2'></Text>
            <Text className='text-base text-white font-text-light'></Text>
        </View>
        {/* production campanies */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
