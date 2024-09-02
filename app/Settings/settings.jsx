import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

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
  ArrowLeftStartOnRectangleIcon
} from "react-native-heroicons/outline";

// appwrite
import { Logout } from "../../Appwrite/Appwrite";

// Toast
import Toast from "react-native-root-toast";
import {ToastOptions} from '../../config/toast'

// expo router
import {router} from 'expo-router'

const Settings = () => {
  const { user,setUser ,setIsLoggedIn} = useGlobalContext();

  const handleSignOut=async()=>{
     try {
        await Logout();
        
        Toast.show(`Logout successful`,ToastOptions)
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/login')
     } catch (error) {
      Toast.show(`${error.message}`,ToastOptions)
     }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header text="App settings" />
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
              PreIcon={ ArrowLeftStartOnRectangleIcon}
              text="Sign Out"
              postIcon={true}
              handlePress={handleSignOut}
            />

          <WrapperRow
              PreIcon={ TrashIcon}
              text="Delete Account"
              postIcon={true}
            />
          </Wrapper>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
