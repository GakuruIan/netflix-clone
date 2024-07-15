import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// images
import action from "../../assets/images/Onboarding/action.jpg";

// icons
import { CalendarDaysIcon, StarIcon } from "react-native-heroicons/outline";

const Downloads = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-2 mt-4 pb-4">
        <Text className="text-3xl font-title text-white">Downloads</Text>
      </View>

      <ScrollView>
        <View>
          {/* content */}
          <View className="px-2 flex-row mb-4">
            <Image
              source={action}
              resizeMode="cover"
              className="h-24 w-24 rounded-sm object-cover"
            />
            <View className="ml-2">
              <Text className="text-white font-title text-xl">
                Kingkong vs Godzilla
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center my-2">
                  <CalendarDaysIcon color="#828892" scaleX={0.8} />
                  <Text className="ml-2 text-gray-400 font-text-light text-base">
                    2024-4-9
                  </Text>
                </View>
                <View className="flex-row items-center my-2 ml-4">
                  <StarIcon color="#828892" scaleX={0.8} className="h-4 w-4" />
                  <Text className="ml-2 text-gray-400 font-text-light text-base">
                    5.9
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* content */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Downloads;
