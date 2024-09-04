import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useRef } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

// components
import Header from "../../components/Header";
import Modal from "../../components/Loader/Modal";
import Wrapper from "../../components/Wrapper/Wrapper";
import WrapperRow from "../../components/Wrapper/WrapperRow";
import Button from "../../components/Button";

// context
import { useGlobalContext } from "../../context/Context";
import {
  ArrowPathRoundedSquareIcon,
  PencilSquareIcon,
  PencilIcon,
  LanguageIcon,
  ExclamationTriangleIcon,
  ChatBubbleBottomCenterIcon,
  TrashIcon
} from "react-native-heroicons/solid";

// appwrite
import { EditProfile,DeleteProfile } from "../../Appwrite/Appwrite";

// image picker
import * as ImagePicker from "expo-image-picker";

// Toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";
import { router } from "expo-router";

const User = () => {
  const { user, modifyUser } = useGlobalContext();
  const textRef = useRef(null);

  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isDeleting,setIsetDeleting] = useState(false);

  const handleEdit = () => {
    if (textRef.current) {
      textRef.current.focus();
    }
  };
   
  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      if (!name) {
        throw new Error("Please fill in the name field");
      }

      const response = await EditProfile(user.profileId, name, image);

      modifyUser(response.name, response.image);

      Toast.show(`Profile updated successfully`, ToastOptions);
    } catch (error) {
      Toast.show(`${error.message}`, ToastOptions);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete=async()=>{
      setSubmitting(true)
      setIsetDeleting(true)
      try {
         await DeleteProfile(user?.profileId)
         router.replace('/')
         Toast.show(`Profile deleted successfully`, ToastOptions);
      } catch (error) {
        Toast.show(`${error.message}`, ToastOptions);
      }
      finally{
        setSubmitting(false)
      }
  } 

  return (
    <SafeAreaView className="bg-primary">
      <Header text="Profile" />

      <Modal isOpen={submitting} text={`${isDeleting ? 'Deleting' : "Saving"} `} />

      <ScrollView className="h-full">
        <View className="px-2">
          <View className="mb-6">
            <View className="items-center justify-center">
              <View className="relative">
                <Image
                  source={{
                    uri: user?.profile_image || user?.image_url,
                  }}
                  resizeMode="cover"
                  className="h-36 w-36 rounded-sm"
                />

                <Pressable
                  onPress={openImagePicker}
                  className="absolute flex items-center justify-center rounded-md bottom-[-10px] right-[-10px] bg-indigo-600 h-8 w-8"
                >
                  <PencilSquareIcon color="#fff" />
                </Pressable>
              </View>

              <View className="bg-[#202020] py-3 w-72 mt-6 px-2 rounded-md">
                <View className="items-center flex-row justify-between">
                  <Text className="mb-2 text-[#6B7280] text-base font-text-light">
                    Profile name
                  </Text>

                  <Pressable onPress={handleEdit}>
                    <PencilIcon color="#fff" scaleX={0.8} scaleY={0.8} />
                  </Pressable>
                </View>

                <TextInput
                  ref={textRef}
                  className="flex-1 text-white "
                  placeholderTextColor="#6B7280"
                  value={name}
                  //   defaultValue={user?.name}
                  onChangeText={(e) => setName(e)}
                />
              </View>

              <Button
                handlePress={handleSubmit}
                classes={"bg-white w-72 mt-4 py-3"}
              >
                <Text className="text-base font-text-light">Save</Text>
              </Button>
            </View>
          </View>
          <Wrapper title="Profile Setting">
            <WrapperRow
              PreIcon={ExclamationTriangleIcon}
              text="Maturity Rating"
              subtext="No restrictions"
              postIcon={true}
            />
            <WrapperRow
              PreIcon={LanguageIcon}
              text="Display Language"
              subtext="English"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={ChatBubbleBottomCenterIcon}
              text="Audio & Subtitle"
              subtext="English"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={ArrowPathRoundedSquareIcon}
              text="Autoplay Preview"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={TrashIcon}
              text="Delete Profile"
              postIcon={true}
              handlePress={handleDelete}
            />
          </Wrapper>
        </View>
        <Text className="text-center text-gray-500 font-text-light">
          Changes made apply to all device
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;
