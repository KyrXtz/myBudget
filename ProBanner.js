import React from "react"
import { TouchableOpacity,View, StyleSheet, Text } from "react-native"
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import I18n from "i18n-js";
 import * as RNLocalize from "react-native-localize";


export const ProBanner = ({isPro}) => {
  console.log('ispro'+isPro);
  if (isPro =='true'){
    return(<></>)

  }else{
  
  return (
    <View style={{transform: [{ rotate: '-45deg'}] ,position:'absolute',top:5,left:-13 , backgroundColor:'red', height:'60%',width:'30%',borderRadius:10}}>
        <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',fontSize:9,fontWeight:'bold'}}>Pro</Text>
    </View>
  )
  }
}