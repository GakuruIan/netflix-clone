import { View, Text, ScrollView, Animated, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Navbar from "../../components/Navbar";
import ScrollArea from "../../components/ScrollArea";

// image
import action from "../../assets/images/Onboarding/action.jpg";

// icons
import {
  BellAlertIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/outline";

const New = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView className="h-full bg-primary">
      <Navbar text="Netflix" scrollY={scrollY} />

      <ScrollArea scrollY={scrollY}>
        <View className="px-2 ">
          {/* content */}
          <View className="py-4 border-b border-light ">
            <Text className="text-white text-xl font-title mb-2">
              Kingkong vs Godzilla
            </Text>

            <Image
              source={action}
              resize="cover"
              className="h-64 w-full object-fit rounded-sm"
            />

            <View className="mt-3">
              <Text className="text-base  text-gray-400 font-text-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                quasi architecto beatae totam fugit sed molestias numquam quidem
                consequatur repudiandae.
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

          {/* content */}
          <View className="py-4 border-b border-light ">
            <Text className="text-white text-xl font-title mb-2">
              Kingkong vs Godzilla
            </Text>

            <Image
              source={action}
              resize="cover"
              className="h-64 w-full object-fit rounded-sm"
            />

            <View className="mt-3">
              <Text className="text-base  text-gray-400 font-text-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                quasi architecto beatae totam fugit sed molestias numquam quidem
                consequatur repudiandae.
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

          {/* content */}
          <View className="py-4 border-b border-light ">
            <Text className="text-white text-xl font-title mb-2">
              Kingkong vs Godzilla
            </Text>

            <Image
              source={action}
              resize="cover"
              className="h-64 w-full object-fit rounded-sm"
            />

            <View className="mt-3">
              <Text className="text-base  text-gray-400 font-text-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                quasi architecto beatae totam fugit sed molestias numquam quidem
                consequatur repudiandae.
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
      </ScrollArea>
    </SafeAreaView>
  );
};

export default New;
