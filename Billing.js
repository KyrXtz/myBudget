import React from "react"
import { TouchableOpacity,View, StyleSheet, Text ,Image} from "react-native"
import Button from "./android/app/src/lib/components/Button"
import useInAppPurchase from "./android/app/src/lib/custom_hooks/useInAppPurchase"
import {withIAP} from 'react-native-iap';
import Rate, { AndroidMarket } from 'react-native-rate'

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import AsyncStorage  from '@react-native-community/async-storage';


export const Billing = () => {
  const {
    isFullAppPurchased,
    connectionErrorMsg,
    buySmallCoffee,
    buyBigCoffee,
    buyProCheck
  } = useInAppPurchase();
  return (
    <View style={styles.container}>
      {/* {isFullAppPurchased ? (
        <Text style={{ ...styles.msg, color: "green" }}>
          Full app access available!!!
        </Text>
      ) : null} */}
      
      {/* <Button title="Purchase" handlePress={buySmallCoffee} /> */}
      {/* {connectionErrorMsg ? (
        <Text style={{ ...styles.msg, color: "red" }}>
          {connectionErrorMsg}
        </Text>
      ) : null} */}

      <View   style={styles.rowContainer}>
      {/* <TouchableOpacity onPress={buySmallCoffee}>
      <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.coffee}
      />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={async ()=>{
          let openInPlayStore = await storageGet('hasReviewdInApp');
          let openInPS = false;
          if(openInPlayStore == 'true'){
            openInPS = true;
          }
          const options = {
            //AppleAppID:"2193813192",
            GooglePackageName:"com.kyrxtz.mybudget",
           // AmazonPackageName:"com.mywebsite.myapp",
            //OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:!openInPS,
            openAppStoreIfInAppFails:true,
            //fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
          }
          Rate.rate(options, async (success, errorMessage)=>{
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              //this.setState({rated:true})
              await storageSet('hasReviewdInApp','true');
            }
            if (errorMessage) {
              // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
              console.log(`Example page Rate.rate() error: ${errorMessage}`)
            }
          })
        }}>
      <FontAwesome
            style={[styles.iconStyle]}

            icon={BrandIcons.googlePlay}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={buyProCheck}>
      <Image style={{height:40,width:40,resizeMode:'center',alignSelf:'flex-end'}}  source={require('./android/app/src/main/assets/playstoregraphics/proicon.png')}/>
      </TouchableOpacity>
      </View>
      {isFullAppPurchased ? (
        <Text style={styles.thankyou}>{I18n.t('RemoveAdsEndMessage')}</Text>
      ) : <View>
      <Text style={styles.thankyou}>{I18n.t('ThankYou')}</Text>

      </View>}
      <Text></Text>
      <Text></Text>
      <Text style={styles.warningSubText}>{I18n.t('PaymentsByGoogle')}</Text>
    </View>
  )
}
//GIA TO ASYNC STORAGE
const storageSet = async(key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("StorageSetResult: "+result);
  } catch(error) {
    //console.log(error);
  }
}

const storageGet = async(key) => {
try {
     const result = await AsyncStorage.getItem(key);
     console.log("StorageGetResult: "+result);
     return result;
  } catch(error) {
    //console.log(error);
  }
}
const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      
      backgroundColor: "transparent",
      padding: 16,
      width:'100%'
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
    },thankyou:{
      fontSize:17,
      fontStyle:'italic',
      alignSelf:'center'
    },warningSubText:{
      fontSize:10,
      fontStyle:'italic',
      alignSelf:'center',
      position : 'absolute',
      bottom:0,
      color:'#00000188'
    }
  })