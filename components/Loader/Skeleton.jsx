import { View, FlatList, StyleSheet } from "react-native";
import React from "react";

// Skeleton
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

// responsive dimensions
import {responsiveWidth} from "react-native-responsive-dimensions";
const Skeleton = ({ num, title }) => {
  const skeletons = Array(num).fill(0);
  return (
    <>
      <View className="px-2 pb-4 h-full flex-row  gap-x-2  gap-y-2 flex-wrap">
        {
          title && 
          <View className="mx-1">
          <ContentLoader
            speed={2}
            width={responsiveWidth(30)}
            height={10}
            viewBox="0 0 123 10"
            backgroundColor="#141414"
            foregroundColor="#202020"
          >
            <Rect x="0" y="0" rx="5" ry="5" width={responsiveWidth(30)} height="10" />
          </ContentLoader>
        </View>
        }
        {skeletons.map((item, index) => {
          return (
            <View style={styles.image} className="h-40 my-2" key={index}>
              <View key={item} className="mx-1">
                <ContentLoader
                  speed={2}
                  width={responsiveWidth(30)}
                  height={170}
                  viewBox="0 0 123 170"
                  backgroundColor="#141414"
                  foregroundColor="#202020"
                >
                  <Rect x="0" y="0" rx="5" ry="5" width={responsiveWidth(30)} height="170" />
                </ContentLoader>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(30),
  },
});

