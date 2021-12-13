import React from "react"
import { TouchableOpacity,View, StyleSheet, Text, ScrollView } from "react-native"
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import { CustomPicker } from 'react-native-custom-picker'

import I18n from "i18n-js";
 import * as RNLocalize from "react-native-localize";
 import {Picker} from '@react-native-picker/picker';
import fontawesome from './android/app/src/main/assets/fontawesome.json'
export const CategoriesSelect = ({changeCategories}) => {
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center'}}>
      <View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 1</Text>
        <CPicker></CPicker>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 2</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 3</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 4</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 5</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 6</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 7</Text>
        <CPicker></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>Category 8</Text>
        <CPicker></CPicker>
      </View>

    </ScrollView>
  )
   
 
  const renderOption =(settings) =>{
    const { item, getLabel } = settings
    return (
      
          <Text style={{ color: item.color, alignSelf: 'center' }}>LOL</Text>
       
    )
  }
}
  const options = [
    {
      color: '#2660A4',
      label: 'One',
      value: 1
    },
    {
      color: '#FF6B35',
      label: 'Two',
      value: 2
    },
    {
      color: '#FFBC42',
      label: 'Three',
      value: 3
    },
    {
      color: '#AD343E',
      label: 'Four',
      value: 4
    },
    {
      color: '#051C2B',
      label: 'Five',
      value: 5
    }
  ]

const styles = StyleSheet.create({
  optionContainer: {
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
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
      fontSize: 20,
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

  export const CPicker =()=>{
    return(
      <CustomPicker
            options={fontawesome}
            getLabel={item => item.l}
            fieldTemplate={(settings)=>{
              const { selectedItem, defaultText, getLabel, clear } = settings
              return (
                <View>
                {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
                {selectedItem && (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(selectedItem.c)}
                  />
                )}
                </View>
                )
            }}
            optionTemplate={(settings)=>{
              return (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(settings.item.c)}
                  />
                )
              }}
            onValueChange={value => {
              console.log('Selected Item', value || 'No item were selected!')
            }}
          />
    )
   }