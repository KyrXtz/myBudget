import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View ,Dimensions} from 'react-native';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );
export const ModalIconViewMoveDown = (props) => {
  const moveAnim = useRef(new Animated.Value(-deviceHeight/1.7)).current  // Initial value for margin: 400

  const animIn = Animated.timing(
    moveAnim,
    {
      toValue: deviceHeight/32.5,
      duration: 1700,
      easing: Easing.elastic(1.1),
      useNativeDriver:false
    }
  )
  const animOut = Animated.timing(
    moveAnim,
    {
      toValue: -deviceHeight/1.7,
      duration: 1700,
      easing: Easing.elastic(),
      useNativeDriver:false
    }
  )
    
  React.useEffect(() => {
    
      animIn.start();
      
    
  }, [moveAnim])

  if(!props.shouldClose){
  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        top: moveAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>    
  );
    }
    if(props.shouldClose){
      return(
      <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        top: moveAnim,         // Bind opacity to animated value
      }}
    >
      {animOut.start()}
      {props.children}
    
    </Animated.View> 
      )
    }
}
