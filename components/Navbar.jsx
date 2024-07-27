import { View, Text, Image, Dimensions, Animated } from "react-native";
import React,{useRef} from "react";

import logo from "../assets/images/netflix-logo.png";
import profile from "../assets/images/Profile/blue-profile.png";

// icons
import { BellIcon } from "react-native-heroicons/outline";
import Category from "./Category";

const Navbar = () => {
    
  return (
    <View className="pb-3 px-2">
      <View
        className="pt-4 mb-4 w-full flex-row items-center justify-between  z-20"
      >
        <Image
          source={logo}
          resizeMode="contain"
          className="h-6 w-6 object-fit"
        />
        
        <View className="flex-row items-center gap-x-4">
         
         <BellIcon color="#fff"/>
        <Image
          source={profile}
          resizeMode="contain"
          className="h-6 w-6 object-fit"
        />
        </View>

      </View>
      
      <Category/>
    </View>
  );
};

export default Navbar;
