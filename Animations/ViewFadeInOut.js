import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { ExtendedExceptionData } from 'react-native/Libraries/LogBox/LogBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export const ViewFadeInOut = (props) => {

  let bool = false;
  const fadeAnim = useRef(new Animated.Value(0)).current  
  const animIn = Animated.timing(
    fadeAnim,
    {
      toValue: 0.7,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver:false
    }
  )
  const animOut = Animated.timing(
    fadeAnim,
    {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver:false
    }
  )
    
 

  setInterval(() => {
    bool = !bool;
    if(bool){
        animIn.start();
       }else{
          animOut.start();
       }
  }, 1000)
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>    
    );     
}

