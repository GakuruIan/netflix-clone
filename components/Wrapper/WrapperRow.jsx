import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// icons
import { ChevronRightIcon } from "react-native-heroicons/outline";

const WrapperRow = ({ PreIcon, text, subtext, postIcon, handlePress,border}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="px-2.5 py-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-4">
          <PreIcon color="#fff" />
          <View className={`${border && 'w-72 border-b border-gray-700 pb-2'}`}>
            <Text
              className={`text-base text-white font-text-light ${
                subtext ? "mb-0.3" : ""
              }`}
            >
              {text}
            </Text>
            {subtext && (
              <Text className="text-sm text-gray-300 font-text-light">
                {subtext}
              </Text>
            )}
          </View>
        </View>
        {postIcon && <ChevronRightIcon color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};

export default WrapperRow;
