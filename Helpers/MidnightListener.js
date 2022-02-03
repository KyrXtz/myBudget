import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Midnight from 'react-native-midnight'

export const MidnightListener = (props) => {
    //console.log('MIDNIGHT LISTENER READY');
    React.useEffect(() => {
      const listener = Midnight.addListener(() => {
         // console.log("HELLO FROM LISTERNER");
          props.changeDayOnMidnight();
            })
      //console.log('MIDNIGHT LISTENER REMOVE');
      return () => listener.remove()
    }, [])
  
    return <View></View>
  }