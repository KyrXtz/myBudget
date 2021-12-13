import React from "react"
import { TouchableOpacity,View, StyleSheet, Text } from "react-native"
import Flag from 'react-native-flags';

import I18n from "i18n-js";
 import * as RNLocalize from "react-native-localize";


export const LanguageSelect = ({changeLanguage}) => {
  
  return (
    <View style={styles.container}>
      <View   style={styles.rowContainer}>
      <TouchableOpacity onPress={async ()=>{changeLanguage('el','EUR')}}>
        <Flag
        code="GR"
        size={48}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={async ()=>{changeLanguage('enGB','GBP')}}>
       <Flag
        code="GB"
        size={48}
        />
      </TouchableOpacity>
      </View>
      <View   style={styles.rowContainer}>
      <TouchableOpacity onPress={async ()=>{changeLanguage('enUS','USD')}}>
        <Flag
        code="US"
        size={48}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={async ()=>{changeLanguage('de','EUR')}}>
        <Flag
        code="DE"
        size={48}
        />
      </TouchableOpacity>
      </View>
      <View   style={styles.rowContainer}>
      <TouchableOpacity onPress={async ()=>{changeLanguage('zh','CNY')}}>
        <Flag
        code="CN"
        size={48}
        />
      </TouchableOpacity>     
      </View>
      {/* <Text style={styles.thankyou}>{I18n.t('ThankYou')}</Text> */}

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
      padding:20,
      width:'100%'
    },iconStyle: {
      fontSize: 40,
      color: 'black',
      textAlign:'center',
  
      //  aspectRatio:1
    },thankyou:{
      fontSize:20,
      fontStyle:'italic',
      alignSelf:'center'
    }
  })