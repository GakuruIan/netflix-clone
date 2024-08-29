import { useMemo, useRef, useState, useCallback } from "react";
import { View, Text, ScrollView, Image, StyleSheet,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// components
import Header from "../components/Header";
import Button from "../components/Button";

// icons
import { PencilSquareIcon, PlusIcon ,CheckCircleIcon} from "react-native-heroicons/solid";

// images
import blue from "../assets/images/Profile/blue-profile.png";
import purple from "../assets/images/Profile/purple-profile.png";
import red from "../assets/images/Profile/red-profile.png";
import green from "../assets/images/Profile/green-profile.png";

const Profile = () => {
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [selectedItem,setSelectedItem] = useState(null);
  const [name,setName] = useState("")

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%","70%"], []);

  const handlePresentPress = useCallback(() => {
    setSheetIndex(0);
  }, []);

  const handleSubmit=()=>{
      
      setSelectedItem(null)
  }

  const data = [
    {
      id: 1,
      image: red,
    },
    {
      id: 2,
      image: blue,
    },
    {
      id: 3,
      image: purple,
    },
    {
      id: 4,
      image: green,
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full  relative">
      <ScrollView className="h-full">
        <Header
          text="Who's watching? "
          showPostIcon={true}
          PostIcon={PencilSquareIcon}
        />

        <View className="px-4 mt-8 items-center">
          <View className="flex flex-row  w-80  flex-wrap items-center justify-center gap-x-10 gap-y-8">
            <View className="w-28">
              <Image
                source={green}
                resizeMode="cover"
                className="h-24 w-full object-cover rounded-sm"
              />
              <Text className="text-white text-base font-text-light  mt-1 text-center">
                Profile
              </Text>
            </View>

            <View className="w-28">
              <Image
                source={purple}
                resizeMode="cover"
                className="h-24 w-full object-cover rounded-sm"
              />
              <Text className="text-white text-base font-text-light  mt-1 text-center">
                Profile
              </Text>
            </View>

            <View className="w-28">
              <Image
                source={blue}
                resizeMode="cover"
                className="h-24 w-full object-cover rounded-sm"
              />
              <Text className="text-white text-base font-text-light  mt-1 text-center">
                Profile
              </Text>
            </View>

            <View className="w-28">
              <Image
                source={red}
                resizeMode="cover"
                className="h-24 w-full object-cover rounded-sm"
              />
              <Text className="text-white text-base font-text-light  mt-1 text-center">
                Profile
              </Text>
            </View>

            {/* create profile */}
            <View className="w-24">
              <Button
                handlePress={() => handlePresentPress()}
                classes={
                  "h-24 rounded-md items-center justify-center border border-gray-300"
                }
              >
                <PlusIcon color="#fff" scale={20} />
              </Button>
              <Text className="text-white text-base font-text-light mt-1 text-center">
                Add profile
              </Text>
            </View>
            {/* create profile */}
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={sheetIndex}
        onChange={(index) => setSheetIndex(index)}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#272727" }}
        handleIndicatorStyle={{ backgroundColor: "#DF0912" }}
      >
        <View className="px-4">
          <Text className="text-xl  text-center font-text-light text-white my-2">
            Create Profile
          </Text>

          <View>
          <View className='mb-2 py-1'>
             <Text className="text-base font-text-light mb-1 text-white ">
                Enter name
              </Text>

              <BottomSheetTextInput value={name} onChangeText={(e)=>setName(e)} placeholder="John Doe" placeholderTextColor={"#ccc"} style={styles.input} />
            </View>

            <View className='mb-4'>
              <Text className="text-base font-text-light text-white ">
                Choose an Image
              </Text>

              <View className="flex-row mt-2">
                {data.map((item) => {
                  return (
                    <Pressable className='relative' key={item.id} onPress={()=>setSelectedItem(item.id)}>
                      <Image
                        source={item.image}
                        resizeMode="cover"
                        className={`h-20 w-20 mr-4 object-cover rounded-sm p-2 `}
                      />
                      {
                        selectedItem === item.id &&
                        <View className="absolute top-[-8px] right-3">
                          <CheckCircleIcon scale={20} color="white" />
                        </View>
                      }
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Button
                handlePress={handleSubmit}
                classes={
                  "py-4 mt-4 bg-white rounded-md items-center justify-center border border-gray-300"
                }
              > 
              <Text className='text-black font-semibold text-base= font-text-light'>Create Profile</Text>
            </Button>
            
          </View>
        </View>
      </BottomSheet>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 input:{
  width:'full',
  backgroundColor:'#333',
  padding:12,
  borderRadius:2,
  color:"#fff"
 }
});


export default Profile;
