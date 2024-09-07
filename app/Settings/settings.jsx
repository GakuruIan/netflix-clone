import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useState, useMemo,useRef } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

// components
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import WrapperRow from "../../components/Wrapper/WrapperRow";

// context
import { useGlobalContext } from "../../context/Context";

// icons
import {
  WifiIcon,
  ArrowDownOnSquareStackIcon,
  TvIcon,
  TrashIcon,
  GlobeEuropeAfricaIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  ArrowLeftStartOnRectangleIcon,
} from "react-native-heroicons/outline";

// appwrite
import { Logout, DeleteAccount } from "../../Appwrite/Appwrite";

// Toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";

// expo router
import { router } from "expo-router";

// components
import Modal from "../../components/Loader/Modal";
import Button from "../../components/Button";

// bottom sheet
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// image
import Sad from "../../assets/images/sad.png";

const Settings = () => {
  const bottomSheetRef = useRef(null);

  const {  setUser, setIsLoggedIn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [sheetIndex, setSheetIndex] = useState(-1);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await Logout();

      Toast.show(`Logout successful`, ToastOptions);
      setUser(null);
      setIsLoggedIn(false);

      router.replace("/login");
    } catch (error) {
      Toast.show(`${error.message}`, ToastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await Logout();

      Toast.show(`Deleted account`, ToastOptions);
      
      setUser(null);
      setIsLoggedIn(false);

      router.replace("/login");
    } catch (error) {
      Toast.show(`${error.message}`, ToastOptions);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header text="App settings" />
      <Modal isOpen={isLoading} text="Signing out" />
      <ScrollView className="h-full">
        <View className="px-4">
          <Wrapper title="Video Playback">
            <WrapperRow
              PreIcon={WifiIcon}
              text="Data usage"
              subtext="Monitor your data usage"
              postIcon={true}
            />
          </Wrapper>

          <Wrapper title="Downloads">
            <WrapperRow PreIcon={WifiIcon} text="Wifi Only" postIcon={true} />

            <WrapperRow
              PreIcon={ArrowDownOnSquareStackIcon}
              text="Smart download"
              subtext="Download next episode"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={TvIcon}
              text="Video Quality"
              subtext="Standard"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={TrashIcon}
              text="Delete All downloads"
              postIcon={true}
            />
          </Wrapper>

          <Wrapper title="About">
            <WrapperRow
              PreIcon={GlobeEuropeAfricaIcon}
              text="Internet speed test"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={ClipboardDocumentIcon}
              text="Private Policy"
              postIcon={true}
            />
          </Wrapper>

          <Wrapper title="Account">
            <WrapperRow
              PreIcon={PencilSquareIcon}
              text="Edit profile"
              postIcon={true}
            />

            <WrapperRow
              PreIcon={ArrowLeftStartOnRectangleIcon}
              text="Sign Out"
              postIcon={true}
              handlePress={handleSignOut}
            />

            <WrapperRow
              PreIcon={TrashIcon}
              handlePress={() => setSheetIndex(0)}
              text="Delete Account"
              postIcon={true}
            />
          </Wrapper>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={sheetIndex}
          onChange={(index) => setSheetIndex(index)}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#272727" }}
          handleIndicatorStyle={{ backgroundColor: "#DF0912" }}
        >
          <Text className="text-center text-white font-title mb-1">
            Account Deletion
          </Text>
          <Text className="text-center text-white font-text-light ">
            It's sad to see you leave
          </Text>
          <View className="h-full flex-1">
            <View className="flex-1 items-center justify-center">
              {isDeleting ? (
                <View className="flex-1  gap-y-2 justify-center items-center">
                  <ActivityIndicator color="red" size="large" />
                  <Text className="text-base text-gray-200">Deleting</Text>
                </View>
              ) : (
                <View>
                  <View className="items-center justify-center">
                    <Image
                      source={Sad}
                      resizeMode="contain"
                      className="h-48 w-48 object-fit"
                    />
                    <Text className="text-base font-text-light text-white">
                      Are you sure you want to delete your Account ?
                    </Text>
                  </View>

                  <View className="flex-row justify-center items-center mt-8">
                    <Button 
                    handlePress={()=>bottomSheetRef.current?.close()}
                      classes={
                        "bg-transparent border border-gray-300 py-3 w-36 mr-4"
                      }
                    >
                      <Text className="text-base text-white">No,I don't</Text>
                    </Button>
                    <Button 
                    handlePress={handleDelete}
                    classes={"bg-primaryBtn py-3 w-36"}>
                      <Text className="text-base text-white">
                        Yes,I am sure
                      </Text>
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
