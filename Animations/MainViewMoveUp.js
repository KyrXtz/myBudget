import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

export const MainViewMoveUp = (props) => {
  const fadeAnim = useRef(new Animated.Value(400)).current  // Initial value for margin: 400

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 700,
        easing: Easing.elastic(),
        useNativeDriver:false
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        marginTop: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}
