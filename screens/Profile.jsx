import { useMemo, useRef, useState, useCallback,useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// components
import Header from "../components/Header";
import Button from "../components/Button";

// Appwrite
import { GetDefaultImages } from "../Appwrite/Appwrite";

// icons
import { PencilSquareIcon, PlusIcon ,CheckCircleIcon} from "react-native-heroicons/solid";


// context
import { useGlobalContext } from "../context/Context";

// Appwrite
import {createProfile,GetuserProfile} from '../Appwrite/Appwrite'

// Toast
import Toast from "react-native-root-toast";
import {ToastOptions} from '../config/toast'

// router
import { router } from 'expo-router'

const Profile = () => {
  const {user,updateUser,isLoggedIn} = useGlobalContext()
  
  const [profiles,setProfiles]= useState([])
  const [Images,setImages]= useState([])

  const [sheetIndex, setSheetIndex] = useState(-1);
  const [selectedItem,setSelectedItem] = useState(null);
  const [name,setName] = useState("")

  

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%","70%"], []);


  useEffect(() => {
    //  fetching user's profile
   async function FetchData(){
    try {
      
      if(user?.$id){
        const results = await GetuserProfile(user?.$id)
        setProfiles(results)
       
      }
      
    } catch (error) {
       Toast(`${error.message}`,ToastOptions)
       console.log(error)
    }
  }

    FetchData()
   
  }, [user?.$id]);

  // activating bottomsheet
  const handlePresentPress = useCallback(async() => {
    setSheetIndex(0);
    const result = await GetDefaultImages()

    setImages(result.documents)
  }, []);
  
  // choosing profile
  const handlePress=(image_url,name)=>{
    const profile = {
      image_url,
      name
    }

    updateUser(profile)

    router.push('/home')
  }

  // creating profile
  const handleSubmit=async()=>{ 
      
     try {
      if(!name || !selectedItem ){
        throw Error("Please Fill in all the Fields")
      }
      const result = await createProfile(user.$id,name,selectedItem)

      if(result){
        Toast.show("Profile created successfully",ToastOptions)
      }

     } catch (error) {
       Toast.show(`${error.message}`,ToastOptions)
     }
     finally{
       setName("")
       setSelectedItem(null)
       setSheetIndex(-1)
     }
  }



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
            
            {
              profiles.map((profile)=>{
                 return <Pressable onPress={()=>handlePress(profile.defaultimage?.image_url,profile?.name)} className="w-28" key={profile.$id}>
                 <Image
                   source={{uri:profile.defaultimage?.image_url}}
                   resizeMode="contain"
                   className="h-24 w-28 object-cover rounded-sm"
                 />
                 <Text className="text-white text-base font-text-light  mt-1 text-center">
                  {profile?.name}
                 </Text>
               </Pressable>
              })
            }

           
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
                {Images.map((image) => {
                  return (
                    <Pressable className='relative' key={image.$id} onPress={()=>setSelectedItem(image.$id)}>
                      <Image
                        source={{uri:image.image_url}}
                        resizeMode="contain"
                        className={`h-20 w-20 mr-4 object-cover rounded-sm p-2 `}
                      />
                     
                      {
                        selectedItem === image.$id &&
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
