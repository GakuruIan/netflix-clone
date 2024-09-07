import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions
} from "react-native";
import React, { useRef, useState, useEffect,useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import Button from "../../components/Button";
import Row from "../../components/Row";
import Cast from "../../components/Cast";

// expo-router
import { router, useLocalSearchParams } from "expo-router";

// icons
import {
  PlayIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowDownOnSquareIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

// axios
import { BaseUrl, ImageUrl } from "../../Axios/axios";

// Toast
import Toast from "react-native-root-toast";
import { ToastOptions } from "../../config/toast";

// responsive dimensions
import {responsiveHeight,responsiveWidth} from "react-native-responsive-dimensions";

// bottom sheet
import BottomSheet,{BottomSheetScrollView} from "@gorhom/bottom-sheet";

// component
import Reviews from "../../components/Reviews";

const Movie = () => {
  const castRef = useRef(null)
  const scrollY = useRef(new Animated.Value(0)).current;

  const [shouldFetch,setShouldFetch] = useState(false)
  const [fetched,setFetched]= useState(false)
  const [sheetIndex,setSheetIndex] = useState(-1)
  const[reviews,setReviews] = useState([])

  const snapPoints = useMemo(() => ["50%","70%"], []);

  const titleAppearThreshold = responsiveHeight(50);

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, titleAppearThreshold],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState({});

  const FetchMovie = async () => {
    await BaseUrl.get(`/movie/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setMovie(response.data);
        }
      })
      .catch((err) => {
        Toast.show("An error occured", ToastOptions);
        console.log(err);
      });
  };

  useEffect(() => {
    FetchMovie();
  }, []);

  const checkIfCastInView = (event) => {
    event.persist();
    
    try {
      if (castRef.current) {
        castRef.current.measure((x, y, width, height, pageX, pageY) => {
          const windowHeight = Dimensions.get('window').height;
          
          const scrollYValue = scrollY.__getValue();
          const castTop = pageY;
          const castBottom = pageY + height;
          
          if (castTop < scrollYValue + windowHeight && castBottom > scrollYValue) {
            setShouldFetch(true)
          } 
        });
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleReviews=async()=>{
    setSheetIndex(0)
     await BaseUrl.get(`/movie/${id}/reviews`)
     .then((res)=>{
      setReviews(res.data.results)
     })
     .catch((err)=>{
      Toast.show("An error occured", ToastOptions);
      console.log(err);
     })
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* animated header */}
      <Animated.View>
        <View className="px-2 h-16  w-full flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon color="#fff" className="h-10 w-10" />
          </TouchableOpacity>
          <Animated.Text
            style={{opacity:titleOpacity}}
            numberOfLines={1}
            className="text-white font-text-light text-base"
          >
            {movie?.original_title ? movie?.original_title : movie?.title}
          </Animated.Text>
          <Text></Text>
        </View>
      </Animated.View>

      {/* animated header */}



      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true ,listener:checkIfCastInView}
        )}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View className='px-1 mt-2 flex-row items-center justify-center'>
          <Image
            source={{
              uri: `${ImageUrl}/${
                movie?.poster_path ? movie?.poster_path : movie?.backdrop_path
              }`,
            }}
            resizeMode="cover"
            style={styles.image}
            className=" object-cover rounded-md mb-4"
          />
        </View>

        <View className="px-2.5 pb-4">
          {/* movie name and tags */}
          <View className="mb-2">
            <Text className="text-white text-3xl font-title">
              {movie?.original_title ? movie?.original_title : movie?.title}
            </Text>

            {/* tags */}

            {movie?.genres?.length > 0 && (
              <View className="flex-row gap-x-2 items-center my-2">
                {movie?.genres.map((genre) => {
                  return (
                    <Text
                      key={genre.id}
                      className="text-gray-400 font-text-light"
                    >
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}

            {/* tags */}
          </View>
          {/* movie name and tags */}

          <View className="mb-4">
            <Button
              classes={"flex flex-row items-center bg-white py-3 rounded-sm"}
            >
              <PlayIcon color="#222" />
              <Text className="font-text-light text-xl ml-4">Play</Text>
            </Button>

            <Button
              classes={
                "mt-4 flex flex-row items-center bg-light py-3 rounded-sm"
              }
            >
              <ArrowDownOnSquareIcon color="#fff" />
              <Text className="font-text-light text-white text-xl ml-4">
                Download
              </Text>
            </Button>
          </View>

          {/* movie overview */}
          <View className=" mb-2">
            <Text className="text-base text-gray-200 font-text-light">
              {movie?.overview}
            </Text>
          </View>
          {/* movie overview */}

          {/* actions */}
          <View className={`mt-2 mb-4 flex-row items-center  w-[${responsiveWidth}]`}>

            <Button handlePress={()=>console.log("dummy")} classes={"flex-row flex-1  justify-center  items-center py-3 mr-2  rounded-md bg-primaryBtn hover:bg-red-500 transition-colors duration-75 "}>
              <CheckIcon color="#fff" />
              <Text className="text-white font-text-light text-base ml-3">
                My List
              </Text>
            </Button>

            <Button handlePress={handleReviews} classes={"flex-row flex-1  justify-center  items-center py-3 mr-2  rounded-md bg-primaryBtn hover:bg-red-500 transition-colors duration-75 "} >
              <ChatBubbleBottomCenterTextIcon color="#fff" scale={20} />
              <Text className="text-white font-text-light text-base ml-3">
                Reviews
              </Text>
            </Button>

          </View>
          {/* actions */}

          {/*cast information  */}
          <View className=" mb-2"  ref={castRef} onLayout={checkIfCastInView}>
            <Text className="text-white font-text-title text-xl mb-4">
              Top Cast
            </Text>
            {/* casts list */}
            <Cast url={`movie/${id}/credits`} shouldFetch={shouldFetch} />
            {/* cast list */}
          </View>
          {/*cast information  */}

          <Row
            title="More Like This"
            url={`movie/${id}/similar`}
            wide={false}
          />
        </View>
      </Animated.ScrollView>

      <BottomSheet  
        snapPoints={snapPoints}
        index={sheetIndex}
        onChange={(index) => setSheetIndex(index)}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#272727" }}
        handleIndicatorStyle={{ backgroundColor: "#DF0912" }}>
           <Text className="text-center text-white font-title mb-4">Reviews</Text>
         <BottomSheetScrollView className="h-full">
           <View className="px-2">
               {
                  reviews.map((review)=>{
                     return <Reviews key={review?.id} review={review}/>
                  })
               }
           </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Movie;

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(50),
    width: responsiveWidth(95),
  },


});