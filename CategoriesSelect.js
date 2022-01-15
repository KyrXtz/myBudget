import React from "react"
import { TouchableOpacity,View, StyleSheet, Text, ScrollView,Alert,Dimensions } from "react-native"
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
const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );
export const CategoriesSelect = ({categoryNameChangeCallback,callback,isPro,changeCategories,categoryIcon0,categoryIcon1,categoryIcon2,categoryIcon3,categoryIcon4,categoryIcon5,categoryIcon6,categoryIcon7 ,categoryName0,categoryName1,categoryName2,categoryName3,categoryName4,categoryName5,categoryName6,categoryName7}) => {
  console.log('HEYO')
  
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center'}}>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.thankyou}>{categoryName0 != null?categoryName0:I18n.t('DefaultCategoryName0')} </Text>
          <TouchableOpacity onPress={()=>categoryNameChangeCallback(0,categoryName0 != null?categoryName0:I18n.t('DefaultCategoryName0'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro} categoryNo={0} categoryIcon={categoryIcon0 != null?categoryIcon0:'fas fa-wallet'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName1 != null?categoryName1:I18n.t('DefaultCategoryName1')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(1,categoryName1 != null?categoryName1:I18n.t('DefaultCategoryName1'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={1} categoryIcon={categoryIcon1 != null?categoryIcon1:'fas fa-coffee'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName2 != null?categoryName2:I18n.t('DefaultCategoryName2')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(2,categoryName2 != null?categoryName2:I18n.t('DefaultCategoryName2'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={2} categoryIcon={categoryIcon2 != null?categoryIcon2:'fas fa-utensils'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName3 != null?categoryName3:I18n.t('DefaultCategoryName3')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(3,categoryName3 != null?categoryName3:I18n.t('DefaultCategoryName3'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={3} categoryIcon={categoryIcon3 != null?categoryIcon3:'fas fa-shopping-cart'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName4 != null?categoryName4:I18n.t('DefaultCategoryName4')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(4,categoryName4 != null?categoryName4:I18n.t('DefaultCategoryName4'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={4} categoryIcon={categoryIcon4 != null?categoryIcon4:'fas fa-money-check-alt'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName5 != null?categoryName5:I18n.t('DefaultCategoryName5')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(5,categoryName5 != null?categoryName5:I18n.t('DefaultCategoryName5'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={5} categoryIcon={categoryIcon5 != null?categoryIcon5:'fas fa-tshirt'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName6 != null?categoryName6:I18n.t('DefaultCategoryName6')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(6,categoryName6 != null?categoryName6:I18n.t('DefaultCategoryName6'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={6} categoryIcon={categoryIcon6 != null?categoryIcon6:'fas fa-gas-pump'}></CPicker>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.thankyou}>{categoryName7 != null?categoryName7:I18n.t('DefaultCategoryName7')}</Text>
        <TouchableOpacity onPress={()=>categoryNameChangeCallback(7,categoryName7 != null?categoryName7:I18n.t('DefaultCategoryName7'))} style={styles.editIconTouchable}>
          <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
        <CPicker callback={callback} isPro ={isPro}  categoryNo={7} categoryIcon={categoryIcon7 != null?categoryIcon7:'fas fa-bus'}></CPicker>
        </View>
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
      width:'77%'
      

    },iconStyle: {
      fontSize: 30,
      color: 'black',
      textAlign:'center',
  
      //  aspectRatio:1
    },editIconTouchable:{
      marginTop:11,marginLeft:5
    },
    editIcon:{
      fontSize: 11,
      color: '#000001CC',
      textAlign:'left',
      textAlignVertical:'center'
    },
    thankyou:{
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

  export const CPicker =({callback,isPro,categoryIcon,categoryNo})=>{
    return(
      <CustomPicker modalAnimationType="slide"
      fieldTemplateProps={{backgroundColor:'red'},{backgroundColor:'blue'}}
      backdropStyle={{backgroundColor:'transparent'}}
      modalStyle={{borderRadius:10}}
      maxHeight={'84%'}
            options={fontawesome}
            getLabel={item => item.l}
            fieldTemplate={(settings)=>{
              const { selectedItem, defaultText, getLabel, clear } = settings
              return (
                <View>
                {(!selectedItem) && (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(categoryIcon)}
                  />
                )}
                
                
                {(selectedItem && isPro=='true') && (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(selectedItem.c)}
                  />
                )}
                {(selectedItem && isPro!='true') && (
                <FontAwesome
                      style={styles.iconStyle}
                      icon={parseIconFromClassName(categoryIcon)}
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
              if(isPro=='true'){
                console.log('Selected Item', value || 'No item were selected!');
                console.log('categoryIcon'+categoryNo,value.c);
                await AsyncStorage.setItem('categoryIcon'+categoryNo, value.c);
              }else{
                console.log('not pro')
                callback();
              }
              

            }}
          />
    )
    //GIA TO ASYNC STORAGE

   }
   