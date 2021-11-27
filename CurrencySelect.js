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


export const CurrencySelect = ({changeCurrency}) => {
  
  return (
    <View style={styles.container}>
      <View   style={styles.rowContainer}>
      <TouchableOpacity onPress={async ()=>{changeCurrency('EUR')}}>
      <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.euroSign}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={async ()=>{changeCurrency('GBP')}}>
      <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.poundSign}
          />
      </TouchableOpacity>
      </View>
      <View   style={styles.rowContainer}>
      <TouchableOpacity onPress={async ()=>{changeCurrency('USD')}}>
      <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.dollarSign}
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