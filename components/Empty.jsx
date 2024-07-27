import { View, Text } from "react-native";
import React from "react";

const Empty = ({ text }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-400 text-2xl font-text-light">
        {text}
      </Text>
    </View>
  );
};

export default Empty;
