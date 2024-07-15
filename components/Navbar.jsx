import { View, Text, Image, Dimensions, Animated } from "react-native";
import React,{useRef} from "react";

import logo from "../assets/images/netflix-logo.png";
import profile from "../assets/images/Profile/blue-profile.png";

const Navbar = ({scrollY}) => {
    
  return (
    <View className="">
      <Animated.View
        className="h-16 w-full bg-transparent border-b border-b-light  flex-row items-center justify-between px-2 z-20"
        style={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, 0, -10],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Image
          source={logo}
          resizeMode="contain"
          className="h-6 w-6 object-fit"
        />
        <Text className='text-white text-xl font-text-light'>Netflix</Text>
        <Image
          source={profile}
          resizeMode="contain"
          className="h-6 w-6 object-fit"
        />
      </Animated.View>
    </View>
  );
};

export default Navbar;
