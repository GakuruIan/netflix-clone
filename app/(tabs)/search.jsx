import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";
// icons
import {
  MagnifyingGlassIcon,
  CircleStackIcon,
  CalendarDaysIcon,
  StarIcon,
} from "react-native-heroicons/outline";

// image
import action from "../../assets/images/Onboarding/action.jpg";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <View className="w-full relative py-2 px-2 mb-2">
          <Input
            placeholder="Movies, Tv shows and more."
            PreIcon={CircleStackIcon}
            secure={false}
            value={search}
            handleChange={(e) => setSearch(e)}
            className=""
          />

          <View className="absolute right-4 top-10">
            <Button>
              <MagnifyingGlassIcon color="#fff" />
            </Button>
          </View>
        </View>
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

export default Search;
