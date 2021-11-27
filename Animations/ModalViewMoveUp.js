import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View,Dimensions } from 'react-native';
import { ExtendedExceptionData } from 'react-native/Libraries/LogBox/LogBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );
export const ModalViewMoveUp = (props) => {

  const moveAnim = useRef(new Animated.Value(900)).current  
  const animIn = Animated.timing(
    moveAnim,
    {
      toValue: 50,
      duration: 1200,
      easing: Easing.elastic(),
      useNativeDriver:false
    }
  )
  const animOut = Animated.timing(
    moveAnim,
    {
      toValue: deviceHeight/0.63,
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

