import React, { useState } from "react"
import { TouchableOpacity,View, StyleSheet, Text } from "react-native"
import useInAppPurchase from "./android/app/src/lib/custom_hooks/useInAppPurchase"
import {withIAP} from 'react-native-iap';


import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import AsyncStorage  from '@react-native-community/async-storage';


export const RemoveAds = () => {
  const {
    removeAdsCheck,
    isFullAppPurchased
  } = useInAppPurchase();
  
  return (
    <View style={styles.container}>
      
      
      {/* <Button title="Purchase" handlePress={buySmallCoffee} /> */}
      {/* {connectionErrorMsg ? (
        <Text style={{ ...styles.msg, color: "red" }}>
          {connectionErrorMsg}
        </Text>
      ) : null} */}

      <View   style={styles.rowContainer}>
      <TouchableOpacity style={{alignSelf:'center'}} onPress={removeAdsCheck}>
      <FontAwesome
            style={[styles.iconStyle,{alignSelf:'center',position:'absolute',color:'#000001',marginTop:-15}]}

            icon={SolidIcons.slash}
      />
      <FontAwesome
            style={[styles.iconStyle,{fontSize:27,alignSelf:'center',paddingVertical:5,position:'absolute',marginTop:-15}]}

            icon={SolidIcons.ad}
      />
      </TouchableOpacity>     
      </View>
      
      {isFullAppPurchased ? (
        <Text style={styles.removeAds}>{I18n.t('RemoveAdsEndMessage')}</Text>
      ) : <View>
      <Text style={styles.removeAds}>{I18n.t('RemoveAdsMessage')}</Text>
      <Text style={styles.removeAdsSub}>{I18n.t('RemoveAdsSubMessage')}</Text>
      </View>}
      
      <Text></Text>
      <Text></Text>
      <Text style={styles.warningSubText}>{I18n.t('PaymentsByGoogle')}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: "transparent",
      padding: 16,
    },
    msg: {
      fontSize: 20,
      textAlign: "center",
      marginVertical: 16,
    }, rowContainer: {
      flexDirection: 'row',
      justifyContent:'space-between',
      padding:20
    },iconStyle: {
      fontSize: 40,
      color: 'black',
      textAlign:'center',
  
      //  aspectRatio:1
    },removeAds:{
      fontSize:17,
      fontStyle:'italic',
      alignSelf:'center'
    },removeAdsSub:{
      fontSize:12,
      fontStyle:'italic',
      alignSelf:'center',
      color:'#00000199'
    },warningSubText:{
      fontSize:10,
      fontStyle:'italic',
      alignSelf:'flex-end',
      position : 'absolute',
      bottom:0,
      right:0,
      color:'#00000199'
    }
  })