import { View, Text } from "react-native";
import React from "react";

const Wrapper = ({ title, children }) => {
  return (
    <View className="mb-6">
      <Text className="text-base font-title text-white">{title}</Text>
      <View className="bg-[#121315] rounded-md mt-2">{children}</View>
    </View>
  );
};

export default Wrapper;
