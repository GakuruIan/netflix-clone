import { View, Text, Image, Dimensions, Animated } from "react-native";
import React,{useRef} from "react";

import logo from "../assets/images/netflix-logo.png";

// icons
import { BellIcon,Cog6ToothIcon } from "react-native-heroicons/outline";
import Category from "./Category";

// context
import { useGlobalContext } from "../context/Context";

// expo-router
import { Link } from "expo-router";

const Navbar = () => {
    const {user} = useGlobalContext()

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
        
        <View className="flex-row items-center gap-x-3">
         
         <BellIcon color="#fff"/>
         <Link  href='/Settings/settings'>
          <Cog6ToothIcon color="#fff"/>
         </Link>
        <Image
          source={{uri:user?.image_url}}
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
