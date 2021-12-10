import React from "react"
import { TouchableOpacity,View, StyleSheet, Text, ScrollView } from "react-native"
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import I18n from "i18n-js";
 import * as RNLocalize from "react-native-localize";
 import {Picker} from '@react-native-picker/picker';

export const CategoriesSelect = ({changeCategories}) => {
  
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center'}}>
      <View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 0</Text>
        <Picker
            style={styles.picker}
            mode="dropdown"
            itemStyle={styles.itemStyle}>
                <Picker.Item label="Basse" value="LOW" />
                <Picker.Item label="Normale" value="MEDIAN" />
        </Picker>

        {/* <TouchableOpacity onPress={async ()=>{changeCategories()}}>
            <FontAwesome
                    style={styles.iconStyle}

                    icon={SolidIcons.euroSign}
                />
        </TouchableOpacity>    */}
      </View>
      {/* <Text style={styles.thankyou}>{I18n.t('ThankYou')}</Text> */}

    </ScrollView>
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
      width:'80%'
      

    },iconStyle: {
      fontSize: 40,
      color: 'black',
      textAlign:'center',
  
      //  aspectRatio:1
    },thankyou:{
      fontSize:20,
      fontStyle:'italic',
    },itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    picker: {
        width: 100
      },
  })