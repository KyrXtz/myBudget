import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {AdMobBanner} from 'react-native-admob';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
export const AdMobBannerComponent = ({showAd,callback}) => {
  const onFailToRecieveAd = (error) => console.log(error);
  console.log('does it pass '+showAd)
  if(showAd){
    return (
      <>
        {showAd &&
        <SafeAreaView style={{backgroundColor:'transparent',  alignItems: "center" ,justifyContent:'center'}}> 
        <View style={{backgroundColor:'transparent',flexDirection: 'row',justifyContent:'space-between'}}>      
          <AdMobBanner
            adSize="smartBanner"
            adUnitID="ca-app-pub-4278197343444747/4277819106"
            didFailToReceiveAdWithError={onFailToRecieveAd}
            onSizeChange = {(x)=>console.log('THIOS IS SIZE CHANGE'+x.width)}
          />
          <TouchableOpacity onPress={callback} >
          <FontAwesome
              style={{backgroundColor:'transparent', position:'absolute',fontSize:15,color:'#8d8d8d',right:10 }}
  
              icon={SolidIcons.timesCircle}
            />
          </TouchableOpacity>       
          </View>
        </SafeAreaView>
        }
      </>
    );
  }else{
    return(
      null
    );
  }
  
  
};

