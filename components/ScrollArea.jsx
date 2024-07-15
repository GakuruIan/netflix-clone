import { ScrollView ,Animated} from 'react-native'
import React from 'react'

const ScrollArea = ({children,scrollY}) => {
  return (
    <Animated.ScrollView
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
         {children}
    </Animated.ScrollView>
  )
}

export default ScrollArea