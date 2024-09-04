import React from "react";
import { View, Text,StyleSheet, ActivityIndicator,Dimensions } from "react-native";

// responsive dimensions
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

// modal
import Modal  from "react-native-modal"

const RNModal = ({ isOpen,text }) => {

     
  return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isOpen}
        deviceWidth={responsiveWidth(100)}
        deviceHeight={responsiveHeight(100)}
      >
        <View className="flex-1 justify-center items-center" style={styles.overlay}>
          <ActivityIndicator size="small" color="red"/>
          <Text className="text-white mt-4 font-text-light">{text}</Text>
        </View>
      </Modal>
  );
};


const styles = StyleSheet.create({
  overlay:{
    backgroundColor:'rgba(0,0,0,.2)',
    height:responsiveHeight(100),
    width:responsiveWidth(100),
    flex:1
  }
})

export default RNModal;
