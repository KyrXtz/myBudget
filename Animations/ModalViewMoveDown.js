import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View,Dimensions } from 'react-native';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );
export const ModalViewMoveDown = (props) => {
  const moveAnim = useRef(new Animated.Value(-deviceHeight/0.85)).current  // Initial value for margin: 400

  const animIn = Animated.timing(
    moveAnim,
    {
      toValue: -deviceHeight/1.517,
      duration: 1700,
      easing: Easing.elastic(1.3),
      useNativeDriver:false
    }
  )
  const animOut = Animated.timing(
    moveAnim,
    {
      toValue: -deviceHeight/0.753,
      duration: 800,
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
