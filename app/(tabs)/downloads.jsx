import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// icons
import {
  CalendarDaysIcon,
  StarIcon,
  InboxArrowDownIcon,
} from "react-native-heroicons/outline";

const Downloads = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-2 mt-4 pb-4">
        <Text className="text-3xl font-title text-white">Downloads</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="items-center justify-center gap-y-4">
          <InboxArrowDownIcon color="#fff" scaleX={1.5} scaleY={1.5} />
          <Text className="text-gray-400 text-base  font-text-light">
            Your Downloads will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Downloads;
