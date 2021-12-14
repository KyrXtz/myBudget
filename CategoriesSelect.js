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
import AsyncStorage  from '@react-native-community/async-storage';

export const CategoriesSelect = ({changeCategories,categoryIcon0,categoryIcon1,categoryIcon2,categoryIcon3,categoryIcon4,categoryIcon5,categoryIcon6,categoryIcon7}) => {
  console.log('HEYO')
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center'}}>
      <View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 1</Text>
        <CPicker categoryNo={0} categoryIcon={categoryIcon0 != null?categoryIcon0:'fas fa-wallet'}></CPicker>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 2</Text>
        <CPicker categoryNo={1} categoryIcon={categoryIcon1 != null?categoryIcon1:'fas fa-coffee'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 3</Text>
        <CPicker categoryNo={2} categoryIcon={categoryIcon2 != null?categoryIcon2:'fas fa-utensils'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 4</Text>
        <CPicker categoryNo={3} categoryIcon={categoryIcon3 != null?categoryIcon3:'fas fa-shopping-cart'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 5</Text>
        <CPicker categoryNo={4} categoryIcon={categoryIcon4 != null?categoryIcon4:'fas fa-money-check-alt'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 6</Text>
        <CPicker categoryNo={5} categoryIcon={categoryIcon5 != null?categoryIcon5:'fas fa-tshirt'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 7</Text>
        <CPicker categoryNo={6} categoryIcon={categoryIcon6 != null?categoryIcon6:'fas fa-gas-pump'}></CPicker>
      </View><View style={styles.rowContainer}>
        <Text style={styles.thankyou}>{I18n.t('Category')} 8</Text>
        <CPicker categoryNo={7} categoryIcon={categoryIcon7 != null?categoryIcon7:'fas fa-bus'}></CPicker>
      </View>

    </ScrollView>
  )
   
 
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
      fontSize: 30,
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

  export const CPicker =({categoryIcon,categoryNo})=>{
    return(
      <CustomPicker modalAnimationType="slide"
      fieldTemplateProps={{backgroundColor:'red'},{backgroundColor:'blue'}}
      backdropStyle={{backgroundColor:'transparent'}}
      modalStyle={{borderRadius:10}}
      maxHeight={'80%'}
      
            options={fontawesome}
            getLabel={item => item.l}
            fieldTemplate={(settings)=>{
              const { selectedItem, defaultText, getLabel, clear } = settings
              return (
                <View>
                {!selectedItem && (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(categoryIcon)}
                  />
                )}
                
                
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
            onValueChange={async (value) => {
              console.log('Selected Item', value || 'No item were selected!');
              console.log('categoryIcon'+categoryNo,value.c);
              await AsyncStorage.setItem('categoryIcon'+categoryNo, value.c);

            }}
          />
    )
    //GIA TO ASYNC STORAGE

   }
   