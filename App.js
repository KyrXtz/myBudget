/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Fragment, useState,useRef,useEffect, Component} from 'react';
 import AnimatedStyles from 'react-native-animated-styles';
 import VersionCheck from 'react-native-version-check';
 import Rate, { AndroidMarket } from 'react-native-rate'
 import {
   SafeAreaView,
   Dimensions,
   StyleSheet,
   TextInput,
   ScrollView,
   View,
   Text,
   StatusBar,
   NativeModules,
   Button,
   TouchableOpacity,
   Image,
   Animated,
   TouchableOpacityBase,
   AppRegistry,
   BackHandler,
   Keyboard,
   FlatList,
   Alert,
   ActivityIndicator,
   AppState  
 } from 'react-native';
 import CalendarPicker from 'react-native-calendar-picker';
 import Modal from "react-native-modal";
//  import Spinner from 'react-native-loading-spinner-overlay';

 import Midnight from 'react-native-midnight';
 import AsyncStorage  from '@react-native-community/async-storage';
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import 'moment/locale/el'  // without this line it didn't work

import { moduleExpression, stringLiteral, tsParenthesizedType } from '@babel/types';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {MainViewMoveUp} from './Animations/MainViewMoveUp'
import {InfoWrapperMoveUp} from './Animations/InfoWrapperMoveUp'
import {ModalViewMoveDown} from './Animations/ModalViewMoveDown'
import {ModalViewMoveUp} from './Animations/ModalViewMoveUp'
import {ModalIconViewMoveDown} from './Animations/ModalIconViewMoveDown'
import { MidnightListener } from './Helpers/MidnightListener';
import { ViewFadeInOut } from './Animations/ViewFadeInOut';
import { Billing } from './Billing';
import { RemoveAds } from './RemoveAds';
import { LanguageSelect } from './LanguageSelect';
import { CurrencySelect } from './CurrencySelect';

import {withIAPContext} from 'react-native-iap';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MenuDrawer from 'react-native-side-drawer'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper'
import {LocaleConfig,Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { AdMobBannerComponent } from './AdMobBannerComponent';
import {AdMobInterstitial} from 'react-native-admob';





//LOCALIZATION
import I18n, { locale } from "i18n-js";
 import * as RNLocalize from "react-native-localize";
 import enUS from "./android/app/src/main/assets/translations/en-US.json";
 import enGB from "./android/app/src/main/assets/translations/en-GB.json";
 import en from "./android/app/src/main/assets/translations/en.json";
 import el from "./android/app/src/main/assets/translations/el.json";
 import currencies from "./android/app/src/main/assets/currencies/currencies.json";
 const availableTranslations = ['en','en-US','en-GB','el'];
 const availableTranslationsRef = [en,enUS,enGB,el];
 I18n.fallbacks = true;
 I18n.defaultLocale = 'en';
 I18n.translations = {
    en,
    enUS,
    enGB,
    el
 };
 //END LOCALIZATION
 const SharedStorage = NativeModules.SharedStorage;
//  const [index, setIndex] = useState(() => 0);

//  const [date, setDate] = useState(new Date()) ; 
//  const [open, setOpen] = useState(false); 
let isEditingTextSavings1 = false;
let isEditingText1 = false;
let isEditingText3 = false;
let refEuroState = '';
let refSavingsState = '';
let refUpdateSetAmountAside = false;
let refPayDay ='';
let refFullPayDay='';
let refSpentToday='';
let refNewSpent='';
let checkIfSpentTodayEdited='';
let checkIfSavingsEdited ='';
let intervalId = 0;
let setPointerEventsOfDrawer = 'none';
let selectedLocale ='';
let refCurrency = '';
let refMinDate = new Date();
let refExpensesHistoryJson = '';
let refspentMonthHistory ='';
const locales = RNLocalize.getLocales();
//const currenciesLocal = RNLocalize.getCurrencies();
 if (Array.isArray(locales)) { 
    var lanTag = locales[0].languageTag;
    var lanCode = locales[0].languageCode;
    console.log('THIS IS TAG '+lanTag) //en-us
    console.log('THIS IS code '+lanCode) //en

    if(availableTranslations.includes(lanTag)){
      // exoyme translation tou styl en-US    
      I18n.locale = lanTag.replace('-','');
      LocaleConfig.defaultLocale = lanTag.replace('-','');
    }else if (availableTranslations.includes(lanCode)){
      //exoume translation tou styl en
      I18n.locale = lanCode;
      LocaleConfig.defaultLocale = lanCode;
    }else{
      //vazoume to fallback
      I18n.locale = 'en';
      LocaleConfig.defaultLocale = 'en';
    }
    console.log('THIS IS SET CODE '+I18n.locale)
    //  if(locales[0].languageTag.includes('-')){
    //   I18n.locale = locales[0].languageCode+locales[0].languageTag.split('-')[1] ;
    //   LocaleConfig.defaultLocale = locales[0].languageCode+locales[0].languageTag.split('-')[1] ; //gia to calendar
    //  }else{
    //  I18n.locale = locales[0].languageCode;
    //  LocaleConfig.defaultLocale = locales[0].languageCode; //gia to calendar
    //  }
    //   console.log("Locales"+element.languageTag);
    
    //  });
 }
 
 
 //I18n.locale = 'el';     

 

//let refSpentMonth='';

 class App extends Component {
   // state = {
   //   euroState:this.props.Euros,
   //   paydayState:this.props.PayDay,
   //   spentTodayState:this.props.SpentToday
 
     
   // }
   
   _calendarRef;
   _swiperRef;
   constructor(props) {
     super(props);
     this.state = { 
      spinner: false,
       debug:"DEBUG",
       euroState:"",
       savingsState:"",
       startingEuroState:"",
       paydayState:"",
       fullDatePaydayState:"",
       spentTodayState:"",
       newSpent:"",
       spentMonthState:"",
       moniesState:"",
       selectedDayExpensesString : '',
       open: false,
       selectedStartDate: null,
       tutorialViewd: 'false',
       cardTutorial:'false',
       loading :true,
       isTutActive : false,
       idOfTutToShow:0,
       swiperIndex:0,
       xPx:0,
       yPx:0,
       tutorialText:'',
       buttonModal1 :false,
       buttonModal2 :false,
       buttonModal3 :false,
       closeModal1 :false,
       closeModal2 :false,
       closeModal3 :false,
       openCoffeeShop:false,
       removeAdsShop:false,
       openLanguageSelect:false,
       openCurrencySelect:false,
       openSettings:false,
       isEditingEuroState:false,
       areAdsRemoved:'false',
       daysPassed:0,
       stopShowingPromptToRate:'false',
       dataSource : "",
       dataSourcePerDay : "",
       markedDates: {},
       appState: AppState.currentState,
       selectedCategoryBtn:6




     };
     this.onDateChange = this.onDateChange.bind(this);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

   }
   calendarLocaleConfigWrapper(){
    availableTranslations.forEach(element => {
      let _locale = element.replace('-','');
      LocaleConfig.locales[_locale] = {
        monthNames: [I18n.t("January",{ locale: _locale }),I18n.t("February",{ locale: _locale }),I18n.t("March",{ locale: _locale }),I18n.t("April",{ locale: _locale }),I18n.t("May",{ locale: _locale }),I18n.t("June",{ locale: _locale }),I18n.t("July",{ locale: _locale }),I18n.t("August",{ locale: _locale }),I18n.t("September",{ locale: _locale }),I18n.t("October",{ locale: _locale }),I18n.t("November",{ locale: _locale }),I18n.t("December",{ locale: _locale })],
        monthNamesShort: [I18n.t("JanuaryShort",{ locale: _locale }),I18n.t("FebruaryShort",{ locale: _locale }),I18n.t("MarchShort",{ locale: _locale }),I18n.t("AprilShort",{ locale: _locale }),I18n.t("MayShort",{ locale: _locale }),I18n.t("JuneShort",{ locale: _locale }),I18n.t("JulyShort",{ locale: _locale }),I18n.t("AugustShort",{ locale: _locale }),I18n.t("SeptemberShort",{ locale: _locale }),I18n.t("OctoberShort",{ locale: _locale }),I18n.t("NovemberShort",{ locale: _locale }),I18n.t("DecemberShort",{ locale: _locale })],
        dayNames: [,I18n.t("Sunday",{ locale: _locale }),I18n.t("Monday",{ locale: _locale }),I18n.t("Tuesday",{ locale: _locale }),I18n.t("Wednesday",{ locale: _locale }),I18n.t("Thursday",{ locale: _locale }),I18n.t("Friday",{ locale: _locale }),I18n.t("Saturday",{ locale: _locale })],
        dayNamesShort: [,I18n.t("SundayShort",{ locale: _locale }),I18n.t("MondayShort",{ locale: _locale }),I18n.t("TuesdayShort",{ locale: _locale }),I18n.t("WednesdayShort",{ locale: _locale }),I18n.t("ThursdayShort",{ locale: _locale }),I18n.t("FridayShort",{ locale: _locale }),I18n.t("SaturdayShort",{ locale: _locale })],
        today: I18n.t("Today",{ locale: _locale })
      };
     });
     
    // _locale = 'enGB';
    // LocaleConfig.locales[_locale] = {
    //   monthNames: [I18n.t("January",{ locale: _locale }),I18n.t("February",{ locale: _locale }),I18n.t("March",{ locale: _locale }),I18n.t("April",{ locale: _locale }),I18n.t("May",{ locale: _locale }),I18n.t("June",{ locale: _locale }),I18n.t("July",{ locale: _locale }),I18n.t("August",{ locale: _locale }),I18n.t("September",{ locale: _locale }),I18n.t("October",{ locale: _locale }),I18n.t("November",{ locale: _locale }),I18n.t("December",{ locale: _locale })],
    //   monthNamesShort: [I18n.t("JanuaryShort",{ locale: _locale }),I18n.t("FebruaryShort",{ locale: _locale }),I18n.t("MarchShort",{ locale: _locale }),I18n.t("AprilShort",{ locale: _locale }),I18n.t("MayShort",{ locale: _locale }),I18n.t("JuneShort",{ locale: _locale }),I18n.t("JulyShort",{ locale: _locale }),I18n.t("AugustShort",{ locale: _locale }),I18n.t("SeptemberShort",{ locale: _locale }),I18n.t("OctoberShort",{ locale: _locale }),I18n.t("NovemberShort",{ locale: _locale }),I18n.t("DecemberShort",{ locale: _locale })],
    //   dayNames: [I18n.t("Monday",{ locale: _locale }),I18n.t("Tuesday",{ locale: _locale }),I18n.t("Wednesday",{ locale: _locale }),I18n.t("Thursday",{ locale: _locale }),I18n.t("Friday",{ locale: _locale }),I18n.t("Saturday",{ locale: _locale }),I18n.t("Sunday",{ locale: _locale })],
    //   dayNamesShort: [I18n.t("MondayShort",{ locale: _locale }),I18n.t("TuesdayShort",{ locale: _locale }),I18n.t("WednesdayShort",{ locale: _locale }),I18n.t("ThursdayShort",{ locale: _locale }),I18n.t("FridayShort",{ locale: _locale }),I18n.t("SaturdayShort",{ locale: _locale }),I18n.t("SundayShort",{ locale: _locale })],
    //   today: I18n.t("Today",{ locale: _locale })
    // };
    // _locale = 'el';
    // LocaleConfig.locales[_locale] = {
    //   monthNames: [I18n.t("January",{ locale: _locale }),I18n.t("February",{ locale: _locale }),I18n.t("March",{ locale: _locale }),I18n.t("April",{ locale: _locale }),I18n.t("May",{ locale: _locale }),I18n.t("June",{ locale: _locale }),I18n.t("July",{ locale: _locale }),I18n.t("August",{ locale: _locale }),I18n.t("September",{ locale: _locale }),I18n.t("October",{ locale: _locale }),I18n.t("November",{ locale: _locale }),I18n.t("December",{ locale: _locale })],
    //   monthNamesShort: [I18n.t("JanuaryShort",{ locale: _locale }),I18n.t("FebruaryShort",{ locale: _locale }),I18n.t("MarchShort",{ locale: _locale }),I18n.t("AprilShort",{ locale: _locale }),I18n.t("MayShort",{ locale: _locale }),I18n.t("JuneShort",{ locale: _locale }),I18n.t("JulyShort",{ locale: _locale }),I18n.t("AugustShort",{ locale: _locale }),I18n.t("SeptemberShort",{ locale: _locale }),I18n.t("OctoberShort",{ locale: _locale }),I18n.t("NovemberShort",{ locale: _locale }),I18n.t("DecemberShort",{ locale: _locale })],
    //   dayNames: [I18n.t("Monday",{ locale: _locale }),I18n.t("Tuesday",{ locale: _locale }),I18n.t("Wednesday",{ locale: _locale }),I18n.t("Thursday",{ locale: _locale }),I18n.t("Friday",{ locale: _locale }),I18n.t("Saturday",{ locale: _locale }),I18n.t("Sunday",{ locale: _locale })],
    //   dayNamesShort: [I18n.t("MondayShort",{ locale: _locale }),I18n.t("TuesdayShort",{ locale: _locale }),I18n.t("WednesdayShort",{ locale: _locale }),I18n.t("ThursdayShort",{ locale: _locale }),I18n.t("FridayShort",{ locale: _locale }),I18n.t("SaturdayShort",{ locale: _locale }),I18n.t("SundayShort",{ locale: _locale })],
    //   today: I18n.t("Today",{ locale: _locale })
    // };
    // _locale = 'fr';
    // LocaleConfig.locales[_locale] = {
    //   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    //   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    //   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    //   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
    //   today: 'Aujourd\'hui'
    // };
    //console.log(LocaleConfig.locales);
   }
   async init(){
    //AsyncStorage.clear();
    //await storageSet('CardTutorialViewed','false');
    //this.setState({ debug: "debug" }) ;
     //await storageSet('RemovedAds','false');
    // const latestVersion = await VersionCheck.getLatestVersion()     
    let currentBuildNo = VersionCheck.getCurrentBuildNumber();
    let savedBuildNo = await storageGet('CurrentBuildNo');
    if(savedBuildNo != currentBuildNo){
       //await storageSet('TutorialViewd','false');
       //to kanoume deactive pros to paron, mexri na to ftiaksws
        if (VersionCheck.getCurrentBuildNumber() <= 40){
          let dateString = await storageGet('fullDatePayday');
          if(dateString != '' && dateString != null){
            var a = moment(dateString);
            var b = moment(moment(new Date()).format("YYYY-MM-DD"));
            //Difference in number of days
            await storageSet('PayDay',(a.diff(b, 'days')).toString());
          }
        }
        if (VersionCheck.getCurrentBuildNumber() <= 41){
          //edw tha trexei kai ta updates tou 40, kai meta tou 41, klp ...
        }

        
    }
    await storageSet('CurrentBuildNo',currentBuildNo.toString());
    let tut = await storageGet('TutorialViewd');
     if(tut == "" || tut == null){
       tut = 'true';
     }

     let cardTutorial = await storageGet('CardTutorialViewed');
     if (cardTutorial == "" || cardTutorial == null){
      await storageSet('CardTutorialViewed','false');
      cardTutorial = 'false';
     }
     

     let value1 = await storageGet('Euros');
     let value2 = await storageGet('PayDay');
     let value3 = await  storageGet('SpentToday');
     let value4 = await storageGet('startingEuros');
     let value5 = await storageGet('fullDatePayday');
     let value6 = await  storageGet('SpentMonthBeforeToday');
     let value7 = await  storageGet('monies'); 
     let value8 = await storageGet('Savings');

     let languageCode = await storageGet('LanguageCode');
     this.calendarLocaleConfigWrapper();
     if(languageCode!='' && languageCode!=null){
      I18n.locale = languageCode;
      LocaleConfig.defaultLocale = languageCode;
     }
     let currencyCode = await storageGet('Currency');
     if(currencyCode!='' && currencyCode!=null){
      refCurrency = currencyCode;
     }else{
       refCurrency = I18n.t("DefaultCurrency");
     }
     


     let value9 = await this.fetchJsonExpenses();
     let value10 = await storageGet('FirstDate');
     refExpensesHistoryJson = await storageGet('ExpensesHistoryJson');
     if(value10 != '' && value10 !=null){
       refMinDate = new Date(value10);
     } 
     let today = await storageGet('today');
    //  let day = new Date().getDate().toString();
    //  let month = (new Date().getMonth()+1).toString();
    //  let year = new Date().getFullYear().toString();
    
    let _markedDates = {};
    if(value5 != '' && value5 !=null){
      _markedDates = this.getMarkedDates(value5,null);
    }
     let todayrly = new Date().toLocaleDateString();
     console.log(today);
     console.log(todayrly);


     if(value3 == null){
      value3 = '0';
      }
      if(value6 == null){
        value6 = '0';
        }
     if(today != todayrly){
       console.log("DAY DCHANGED ON INIT");
        await this.DayChanged(todayrly);
        value6 = await  storageGet('SpentMonthBeforeToday'); // ksanapairnoyme to value6
        value3 = '0';
        value9 = await this.fetchJsonExpenses(); // ksanapairnoyme to value9
        value2 = await storageGet('PayDay'); //to theloyme pali
        value7 = await this.CalculateEuroPerDay();//allakse i mera


     }else{
      //
      
     }

     let _areAdsRemoved = await storageGet('RemovedAds');
     let _daysPassed =parseInt( await storageGet('DaysPassed'));
     let _stopShowingPromptToRate = await storageGet('stopShowingPromptToRate');
     //ena modal k einai ok to prompt to rate
     
     console.log('ARE ADS REMOVE'+_areAdsRemoved)
     this.setState({markedDates:_markedDates,dataSourcePerDay:null,dataSource:value9,savingsState:value8,isEditingEuroState:false,newSpent:'0',openSettings:false,openCurrencySelect:false,openLanguageSelect:false,openCoffeeShop:false,removeAdsShop:false,closeModal1:false,closeModal2:false,closeModal3:false,moniesState:value7,spentMonthState: value6,fullDatePaydayState:value5, startingEuroState: value4 ,euroState: value1, paydayState: value2,spentTodayState: value3 , open: false ,cardTutorial:cardTutorial,tutorialViewd:tut,idOfTutToShow:0 , xPx:0,yPx:0,buttonModal1:false,buttonModal2:false,buttonModal3:false,areAdsRemoved:_areAdsRemoved,daysPassed:_daysPassed,stopShowingPromptToRate:_stopShowingPromptToRate, swiperIndex:0,selectedCategoryBtn:6,tutorialText:I18n.t('TutorialText1')}) ;
     if(this.state.tutorialViewd == 'false'){
      this.setState({tutorialViewd:'false'});
      intervalId =  setInterval(() => {
        let bool = !this.state.isTutActive;
        this.setState({isTutActive : bool})
      }, 1000)
    }
    
    //INIT REF VALUES
    refEuroState = this.state.euroState;
    refSavingsState = this.state.savingsState;
    refPayDay = this.state.paydayState;
    refFullPayDay = this.state.fullDatePaydayState;
    refSpentToday = this.state.spentTodayState;
    this.isLoading();
    this.allLoaded();
     
    
     // this.state.euroState = value1;
     // this.state.paydayState;
   }
   async fetchJsonExpenses(){
    var json = await storageGet('SpentTodayJson');
    if(json ==null ){
      json = '[]';
    }
    return JSON.parse(json);
   }
   onDateChange(passedDate) {
  //  let date = moment(MomentDate).toDate();
    console.log(passedDate)
    let date = new Date(passedDate.dateString)
    let today = new Date();
    console.log(date)
    console.log(today)
    if(date<today && today.toDateString() != date.toDateString()){
     //alert("dont set date in the past pls"); 
     //edw tha deixnoyme dedomena gia past dates
     let _markedDates2 = {};
     _markedDates2 = this.getMarkedDates(this.state.fullDatePaydayState,moment(date).format('YYYY-MM-DD'));
     let selectedDaysData = this.getSelectedDaysExpenseData(moment(date).format('YYYY-MM-DD'));
     let _selectedDayExpensesString = moment(date).format('YYYY-MM-DD');
     this.setState({markedDates:_markedDates2,dataSourcePerDay : selectedDaysData, selectedDayExpensesString:_selectedDayExpensesString});
     return;
    }
  //   let nowmonth = new Date().getMonth()+1; //DE KSERW GIATI THELEI +1
  //   let paymonth = date.getMonth()+1; //DE KSERW GIATI THELEI +1
  //   if(paymonth<=nowmonth){ //mono otan einai next year
  //    let nowyear = new Date().getFullYear();
  //    let payyear = date.getFullYear();
  //    paymonth += (payyear-nowyear)*12;

  //   }
  //   let diff = paymonth-nowmonth;
  //  //this.state.selectedDayExpensesString = date;
  //  this.state.paydayState = (date.getDate() + diff*30).toString();
   // allagi edw
  //  this.state.fullDatePaydayState = moment(date).format('MMMM Do YYYY')
  this.state.fullDatePaydayState = passedDate.dateString;
  // var given = moment(passedDate.dateString, "YYYY-MM-DD");
  // var current = moment(new Date() ,"YYYY-MM-DD");
  // console.log('given ' + given) ;
  // console.log('current '+ current) ;
  var a = moment(passedDate.dateString);
  var b = moment(moment(new Date()).format("YYYY-MM-DD"));
  
  
  //Difference in number of days
  console.log('dif '+a.diff(b, 'days')  ) ;
  this.state.paydayState = (a.diff(b, 'days')).toString() ;
  console.log(this.state.paydayState);


  let _markedDates = {};
  _markedDates = this.getMarkedDates(this.state.fullDatePaydayState,null);

  // this.state.open = false; //KLEINOYME TO MODAL
   this.setState({selectedDayExpensesString:'',dataSourcePerDay:null,markedDates:_markedDates, fullDatePaydayState:this.state.fullDatePaydayState,selectedStartDate: date, paydayState: this.state.paydayState, open:false }) ;
   
  }
  getMarkedDates(payDayString,selectedDayString){
    
    //moment(refMinDate).format('YYYY-MM-DD')
    
    let markedDates = {};
    markedDates[payDayString] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let dateArray = this.getDates(refMinDate,new Date().setDate(new Date().getDate() -1 ));
    dateArray.forEach(element => {
      //edw check an to element exei expenses sto ExpensesHistoryJson
      let expenseData = this.getSelectedDaysExpenseData(moment(element).format('YYYY-MM-DD'));
      if(expenseData!=null){
        if(moment(element).format('YYYY-MM-DD') == selectedDayString){
          markedDates[moment(element).format('YYYY-MM-DD')] = { marked: true ,dotColor: '#F279FF'};
        }else{
          markedDates[moment(element).format('YYYY-MM-DD')] = { marked: true ,dotColor: '#80c0ff'};
        }
      }else if (element){
        markedDates[moment(element).format('YYYY-MM-DD')] = {disabled: true, disableTouchEvent: true};

      }
    });
    
    //markedDates['2021-11-06'] = { marked: true ,dotColor: 'red',text: {color: '#6fc3c3'}};

    // markedDates={
    //   "2021-11-07": {selected: true, marked: true, selectedColor: 'blue'},
    //   '2021-11-06': {marked: true}
      
    // };
    return markedDates;
  }
  getDates(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };
  getSelectedDaysExpenseData(dateString){
    if(refExpensesHistoryJson ==null){
      return null;
    }
    //console.log(refExpensesHistoryJson);
    let jsondata = JSON.parse(refExpensesHistoryJson);
    for (var i=0; i<jsondata.length; i++) {
      var data = jsondata[i];
      //console.log(data);
      if(data.length >0){

      
        if(data[0].Day == dateString){
          return data;
        }
      }
      // for (var y=0; y<data.length; y++) {
      //   var expense = data[y];
      //   console.log(expense);
      // }
  }
  return null;
  }
  getDateFromDateString(){
    if(this.state.fullDatePaydayState == null || this.state.fullDatePaydayState == ''){
      return new Date();
    }
    var date = new Date(this.state.fullDatePaydayState);
    if(!this.isValid(date)){
      date = new Date();
    }
    return date;
  }
  getSpentThisMonth(){
    if(this.state.spentMonthState=='' || this.state.spentMonthState==null){
      if(this.state.spentTodayState=='' || this.state.spentTodayState==null){
        return '0';
      }
      var index = this.state.spentTodayState.indexOf('.');
      if (index >= 0) {
        return (parseFloat(this.state.spentTodayState).toFixed(2)).toString();
      } else {
        return this.state.spentTodayState;
      }
    }else{

    var index = this.state.spentTodayState.indexOf('.');
    var index2 = this.state.spentMonthState.indexOf('.');
    if(index>=0 || index2 >=0){
      return ((parseFloat(this.state.spentMonthState) + parseFloat(this.state.spentTodayState)).toFixed(2)).toString();
    }else{
      return ((parseFloat(this.state.spentMonthState) + parseFloat(this.state.spentTodayState)).toFixed(0)).toString();
    }
    }
  }
  getRemainingToday(){
    if(this.state.spentTodayState=='' || this.state.spentTodayState==null){
      return this.CalculateEuroPerDayNotAsync().toString();
    }
    let spentToday = "";
    var index = this.state.spentTodayState.indexOf('.');
      if (index >= 0) {
        spentToday= (parseFloat(this.state.spentTodayState).toFixed(2)).toString();
      } else {
        spentToday= this.state.spentTodayState;
      }
    let remainingMonies = (parseFloat(this.CalculateEuroPerDayNotAsync() - parseFloat(this.state.spentTodayState))).toString();
    var index2 = remainingMonies.indexOf('.');
      if (index2 >= 0) {
        remainingMonies= (parseFloat(remainingMonies).toFixed(2)).toString();
      }
    return remainingMonies.toString();
  }
  async DayChanged(todayrly){ // tha einai h 0 , h tha exoyn tis apothikeymenes times
        let value0 = await storageGet('DaysPassed');
        if(value0 =='' || value0 ==null){
          await storageSet('DaysPassed','0');
        }else{
          await storageSet('DaysPassed',(parseInt(value0)+1).toString());
        }
        let value1 =  await storageGet('SpentToday');
        let value2 =  await storageGet('SpentMonthBeforeToday');
        //checn an exei allaksei minas
        let savedToday = await storageGet('today');
        await storageSet('today',todayrly);
        if( savedToday == '' || savedToday==null){
          return;
        }
        if( value1 == '' || value1==null ){
         value1 ='0';
        }
        if( value2 == '' || value2==null ){
          value2 ='0';
         
        }
        //enimerwsi payday
        let paydayString = await storageGet('fullDatePayday');
        var a = moment(paydayString);
        var b = moment(moment(new Date()).format("YYYY-MM-DD"));         
        //Difference in number of days
        console.log('dif '+a.diff(b, 'days')  ) ;
        this.state.paydayState = (a.diff(b, 'days')).toString() ;
        //this.state.paydayState = (parseInt(payday) - 30*monthDiff).toString();
        //allagi edw
        await storageSet('PayDay',this.state.paydayState);
        
        
        let dateFrom = new Date(savedToday);
        let dateTo = new Date();
        let monthDiff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
        let spentMonthF = parseFloat(value1) + parseFloat(value2);
        await storageSet('SpentToday','0');
        if(monthDiff >0) { //month changed
          var spentMonthJson = await storageGet('SpentMonthJson');
          if(spentMonthJson == null){
            spentMonthJson ='[]';
          }
          var addComma = ',';
          if(spentMonthJson == '[]'){
            addComma = '';
          }
          
          var spentMonthJsonEntry = '{"Amount":"'+spentMonthF+'", "Time":"'+moment(dateFrom).format('YYYY-MM')+'"}';
          spentMonthJson = spentMonthJson.substring(0,spentMonthJson.length-1) +addComma+spentMonthJsonEntry +']';
          await storageSet('SpentMonthJson',spentMonthJson);
          console.log('THIS IS EXPENSES HISTORY OF MONTH')
          console.log(spentMonthJson)

          await storageSet('SpentMonthBeforeToday','0');         
        }else{
          await storageSet('SpentMonthBeforeToday',(spentMonthF).toString());

        }
        var spentTodayJson = await storageGet('SpentTodayJson');
        if(spentTodayJson == '[]' || spentTodayJson ==null){
          return;
        }
        var expensesHistoryJson = await storageGet('ExpensesHistoryJson');
        if(expensesHistoryJson =='' || expensesHistoryJson == null){
          expensesHistoryJson = '[]';
        }
        var addComma = ',';
        if(expensesHistoryJson == '[]'){
          addComma = '';
        }
        expensesHistoryJson = expensesHistoryJson.substring(0,expensesHistoryJson.length-1) +addComma+spentTodayJson +']';
        await storageSet('ExpensesHistoryJson',expensesHistoryJson);
        await storageSet('SpentTodayJson','[]');
        
        console.log('THIS IS EXPENSES HISTORY');
        console.log(expensesHistoryJson);
        refExpensesHistoryJson = expensesHistoryJson;
  }
  
  async MidnightDetected(){
    // let day = new Date().getDate().toString();
    //  let month = (new Date().getMonth()+1).toString();
    //  let year = new Date().getFullYear().toString();
    let todayrly = new Date().toLocaleDateString();
    // let todayrly = day+month+year;
    await this.DayChanged(todayrly);
    let value1 = await storageGet('SpentMonthBeforeToday');
    let value9 = await this.fetchJsonExpenses(); // ksanapairnoyme to value9
    let value7 = await this.CalculateEuroPerDay();
    let value2 = await storageGet('PayDay'); //to theloyme pali
    this.setState({spentMonthState:value1, spentTodayState:'0' , dataSource:value9,moniesState:value7, paydayState:value2});

  }
   allLoaded(){
     this.state.loading= false;
     this.setState({loading:false});
   }
   componentDidMount() {
    this.state.loading= true;
    this.setState({loading:true});
    this.isLoading();
    this.init();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    AppState.addEventListener('change', this._handleAppStateChange);

    //console.log('DATA SOURCE:'+this.state.dataSource[0].Time);

    // I18n.locale
    // console.log(I18n.t("hello", I18n.locale));
    //I18n.t("hello",{locale})
    //console.log(I18n.t("hello",{ locale: 'gr' }))
    // console.log(I18n.t("hello"))
    // I18n.locale = 'gr'    ;
    // console.log(I18n.t("hello"))
 

   // this.saveAndSetSharedStorage();
  
   
  //StatusBar.setHidden(true);
  console.log('THIS IS DEVICE HEIGHT:'+deviceHeight);
  console.log('THIS IS DEVICE WIDTH:'+deviceWidth);
  
  console.log(moment(new Date('2021-11-01')).locale('en').format('MMMM Do YYYY'))
  console.log(moment(new Date('2021-11-01')).locale('el').format('MMMM Do YYYY'))
  

   

 
  
   }
   componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);

   }
   _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      this.setState({hideThisAd1:false,hideThisAd2:false,hideThisAd3:false,hideThisAd4:false});

    }
    this.setState({appState: nextAppState});
  }
   _keyboardDidShow =()=> {
    //alert('Keyboard Shown');
  }
    
  _keyboardDidHide = () => {
    console.log('KEYBOARD HIDDEN')
    if(isEditingText1){
      this.endEdit1();
    }
    if(isEditingText3){
      this.endEdit3();
    }
    if(isEditingTextSavings1){
      this.endEdit1Savings();
    }

  }

   
   handleBackButtonClick() {
     console.log('BACK PRESS')
     //me to return false synexizei kai ta ypoloipa listeners
     if(this.state.openSettings){
       this.openSettings(false);
       return true;
     }
    return false;
    }
   isLoading(bool){
    this.setState({
      spinner: !this.state.spinner
    });
   }
async progressTutorial(){
  let tutViewd = 'false';
  this.state.idOfTutToShow +=1;
  
  switch (this.state.idOfTutToShow ){
    case 1:
      this.state.tutorialText = I18n.t('TutorialText2');
      break;
      case 2:
      this.state.tutorialText = I18n.t('TutorialText3');
      break;
      case 3:
      this.state.tutorialText = I18n.t('TutorialText4');
      break;
      case 4:
      this.state.tutorialText = I18n.t('TutorialText5');
      break;
      case 5:
      this.state.tutorialText = I18n.t('TutorialText6');
      break;
      case 6:
      tutViewd = 'true';
      break;
  }
  if( tutViewd == 'true')
  {
    await storageSet('TutorialViewd','true');
    clearInterval(intervalId);
  }
  this.setState({idOfTutToShow:this.state.idOfTutToShow , tutorialText:this.state.tutorialText,tutorialViewd:tutViewd});
  // await storageSet('TutorialViewd','true');
  // this.setState({ tutorialViewd:'true' }) ;

}

closeThis = (bool) =>{
  console.log('hello'+bool);
};

render() {
     //GIA TA ANIMATIONS TOU TUTORIAL

    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    
    //console.log("RENDER");
    
    if(this.state.cardTutorial == 'false' && this.state.loading == false){
     
        return(
          <View style = {{flex:1}}>
            <StatusBar backgroundColor={'transparent'} translucent={true} />

          <Swiper  
          dot ={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: deviceHeight/283.3333333333333, marginRight:deviceHeight/283.3333333333333, marginTop: deviceHeight/283.3333333333333, marginBottom: deviceHeight/283.3333333333333}} />}
          activeDot={<View style={{backgroundColor: '#62CCFF', width: 8, height: 8, borderRadius: 4, marginLeft: deviceHeight/283.3333333333333, marginRight: deviceHeight/283.3333333333333, marginTop: deviceHeight/283.3333333333333, marginBottom: deviceHeight/283.3333333333333}} />}
          nextButton={<Text style={{fontSize:50,color:'#62CCFF'}}>›</Text>}
          prevButton={<Text style={{fontSize:50,color:'#62CCFF'}}>‹</Text>}
          paginationStyle={{flexDirection:'column',position: 'absolute',top: deviceHeight/1.35064939468626,left: deviceWidth/1.047272727272733}}
          buttonWrapperStyle={styles.swiperButtonStyle}
          ref={(swiper) => {this._swiperRef = swiper;}}
          onIndexChanged = {(index) => this.setState({swiperIndex:index})}
          loop={false} showsButtons={true}>

            <View style={styles.slideFirst}>
              <View style={{justifyContent:'space-between'}}>
              {I18n.locale == 'el' &&
              <Image  style={{height:'35%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EL.png')}/>}
              {I18n.locale != 'el' && //!= ola ta ypoloipa translations
              <Image  style={{height:'35%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EN.png')}/>}
              <View>
              <Text style={[styles.swiperText,{paddingVertical:30,elevation:10,borderRadius:30,backgroundColor:'#FFFFFD',paddingHorizontal:20,fontSize:30,fontWeight:'bold'}]}>{I18n.t("SwiperTutorial0")}</Text>
              <Text style={{fontSize:10,alignSelf:'center', fontStyle:'italic',color:'#FFFFFD99'}}>{I18n.t("InternetConnectionRequired")}</Text>
              </View>
              </View>
            </View>
            <View style={styles.slideMain}>
              <Image  onLoad={ () => this.setState({ isImageLoaded1: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded1 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/uqXENh8fEy4mGemW4O/giphy.gif'}} />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded1 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial1")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded2: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded2 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/BJuoGHXw4yUd9UgHpF/giphy.gif'}} />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded2 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial2")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded3: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded3 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/mdZGSABzYOIdfH6N13/giphy.gif'}} />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded3 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial3")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded4: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded4 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/mMRvMdql0khLTvl6jZ/giphy.gif'}}  />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded4 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial4")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded5: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded5 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/3yb0PPItGb4aqFbtgb/giphy.gif'}}  />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded5 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial5")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded6: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded6 ? 'flex' : 'none') }]}
               source={{uri:'https://media.giphy.com/media/kw5ahJeXUZDorrKpE8/giphy.gif'}}   />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded6 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial6")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            <View style={styles.slideMain}>
            <Image  onLoad={ () => this.setState({ isImageLoaded7: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded7 ? 'flex' : 'none') }]}
               source={{uri:'https://media.giphy.com/media/0dpW4OiH09bDUpoOB2/giphy.gif'}}  />
              <ActivityIndicator size = {50} color={'#62CCFF'}
                style={[styles.loadingTut,{ display: (this.state.isImageLoaded7 ? 'none' : 'flex') }]}
              />
              <Text style={styles.footerLine}></Text>
              <ScrollView style={styles.scrollViewTut}>
              <Text style={styles.swiperText}>{I18n.t("SwiperTutorial7")}</Text>
              </ScrollView>
              <Text style={styles.footerLine}></Text>
            </View>
            
            
            
            
            
            
            <View style={styles.slideFirst}>
              <View style={{justifyContent:'space-between'}}>
              {I18n.locale == 'el' &&
              <Image  style={{height:'40%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EL.png')}/>}
              {I18n.locale != 'el' && //!= ola ta ypoloipa translations
              <Image  style={{height:'40%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EN.png')}/>}
              <TouchableOpacity onPress={async ()=> await this.setCardTutorial('true')}>
              <Text style={[styles.swiperText,{paddingVertical:30,elevation:10,borderRadius:30,backgroundColor:'#FFFFFD',paddingHorizontal:20,fontSize:30,fontWeight:'bold'}]}>{I18n.t("SwiperTutorial8")}</Text>
              <Text style={{fontSize:10,alignSelf:'center', fontStyle:'italic',color:'#FFFFFD'}}>{I18n.t("SwiperTutorial13")}</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Swiper>
          <Text style={styles.footerLine}></Text>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          {this.state.swiperIndex!=8 &&
          <TouchableOpacity onPress={()=>this.skipTutorialWarning()} style={{backgroundColor:'#62CCFF',flex:1,borderBottomLeftRadius:60, borderBottomRightRadius:60, height:'100%'}}><Text style={{fontSize:30, alignSelf:'center'}}>{I18n.t("SwiperTutorial11")}</Text></TouchableOpacity>
          }
          {this.state.swiperIndex==8 &&
          <TouchableOpacity onPress={()=> this._swiperRef.scrollBy(-8,true)} style={{flex:0.49,backgroundColor:'#62CCFF',borderRadius:15, height:'100%'}}><Text style={{fontSize:20, alignSelf:'center'}}>{I18n.t("SwiperTutorial10")}</Text></TouchableOpacity>
          }
          {this.state.swiperIndex==8 &&
          <TouchableOpacity onPress={async ()=> await this.setCardTutorial('true')} style={{flex:0.49,backgroundColor:'#62CCFF',borderRadius:15, height:'100%'}}><Text style={{fontSize:20, alignSelf:'center'}}>{I18n.t("SwiperTutorial9")}</Text></TouchableOpacity>
          }
          </View>
          <Text style={styles.footerLine}></Text>

          
          </View>

        );
    }else{
      // if(this._ref!=undefined){
      //  this._ref.measure( (fx, fy, width, height, px, py) => {
      //     console.log('Component width is: ' + width)
      //     console.log('Component height is: ' + height)
      //   //  console.log('X offset to frame: ' + fx)
      //   //  console.log('Y offset to frame: ' + fy)
      //     console.log('X offset to page: ' + px)
      //     console.log('Y offset to page: ' + py)
      //   this.state.xPx = px;
      //   this.state.yPx = py;

      //    }) 
      //   }
      

     return (
       
       <Fragment>
<StatusBar backgroundColor={'transparent'} translucent={true} />
<MidnightListener changeDayOnMidnight={()=>this.MidnightDetected()} />
<View style={styles.parentView}>
        { (this.state.loading == false) &&   
         <View style={styles.titleImageWrapper}>
           {I18n.locale == 'el' &&
           <Image  style={styles.titleImage} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EL.png')}/>}
           {I18n.locale != 'el' && //!= ola ta ypoloipa translations
           <Image  style={styles.titleImage} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EN.png')}/>}
           </View>
        }
        { (this.state.loading == false) &&       
        <View style={{flex:1}}>
        {/* {TUTORIAL} */}
        <View style={{position:'absolute',height:'100%',width:'25%'}}>
                  { this.state.idOfTutToShow == 5 && this.state.tutorialViewd =='false'  &&
                  <Text style={[styles.tutText,{width:'140%',top:-80,left:215,elevation:500}]}>{this.state.tutorialText}</Text>   
                  }
                  { this.state.idOfTutToShow == 5 && this.state.tutorialViewd =='false'  &&
                  <FontAwesome
                    style={[{top:-30,left:380,elevation:101,fontSize:15}]}

                    icon={RegularIcons.laughBeam}
                  />
                }
                  { this.state.idOfTutToShow == 5 && this.state.tutorialViewd =='false' &&  
                  <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
                  
                  </TouchableOpacity>
                  }
        </View>
        {/* { end TUTORIAL} */} 
        <MainViewMoveUp  style={styles.mainView}>
        <InfoWrapperMoveUp style={styles.rowContainer}>   
          <View style={styles.iconWrapper}>      
          <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.coins}
          />
          </View>       
          <TouchableOpacity  ref={(r) => { this._ref = r;} } onPress={()=>this.openBtnModal(1,true)} style={styles.infoWrapper}>  
          {/* {TUTORIAL} */}
          { this.state.idOfTutToShow == 0 && this.state.tutorialViewd =='false' &&
          <Text style={styles.tutText}>{this.state.tutorialText}</Text>   
          }
          { this.state.idOfTutToShow == 0 && this.state.tutorialViewd =='false' &&  
          <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
          <ViewFadeInOut  style={styles.tutView}> 
          </ViewFadeInOut>
          </TouchableOpacity>
          }
          {/* { end TUTORIAL} */}

         <View style={styles.colContainer}>
         <Text style={styles.textBold}>{I18n.t('Balance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>  
         <Text style={styles.textFaint}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
         {(this.state.savingsState!='' && this.state.savingsState!=null && this.state.savingsState!='0')  &&
         <Text style={styles.textFaint}>{I18n.t('SavingsBalance')} {this.stringWithCorrectCurrencyPosition(this.getSavingsStateWithCorrectDecimals())}</Text>
         }
         <Modal useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.Modal} coverScreen={true} animationIn = {'fadeIn'} animationOut={'fadeOut'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.buttonModal1}>
          <View style={styles.ModalViewWrapper}>
         <ModalViewMoveDown style={styles.modalTopBackground} shouldClose = {this.state.closeModal1}> 
         </ModalViewMoveDown>
         <ModalIconViewMoveDown style={styles.modalIconBackground} shouldClose = {this.state.closeModal1}>
         <View style={styles.modalIconWrapper}>      
          <FontAwesome
            style={styles.modalIconStyle}

            icon={SolidIcons.coins}
          />
          </View>
         </ModalIconViewMoveDown>
         <ModalViewMoveUp style={styles.modalBottomBackground} shouldClose = {this.state.closeModal1}> 
        <View style={styles.colContainer}>
        <View style={styles.modalMainViewWrapper}>
        <Text style={styles.modalMainViewTitle}>{I18n.t('BudgetQuestion')}</Text>
        <ScrollView  ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} nestedScrollEnabled={true} style={{marginTop:10}}>
        <Text style={styles.modalMainViewSubHeader}>{I18n.t('Amount')}</Text>
        <View style={styles.inputRowContainer}>
        <View style={styles.iconContainer}>
        <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
        </View>
        <View style={styles.inputContainer}>
          {/* {TUTORIAL} */}
          { this.state.idOfTutToShow == 6 && this.state.tutorialViewd =='false' &&
          <Text style={styles.tutText}>{this.state.tutorialText}</Text>   
          }
          { this.state.idOfTutToShow ==6  && this.state.tutorialViewd =='false' &&
          <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
          <ViewFadeInOut  style={styles.tutView}> 
          </ViewFadeInOut>
          </TouchableOpacity>
          }
          {/* { end TUTORIAL} */}
        <TextInput 
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(text)=> this.onChanged1(text)}
            defaultValue={this.state.euroState}
            maxLength={10}  //setting limit of input
            onEndEditing={()=>this.endEdit1()}
            onTouchStart={()=>this.startEdit1()}
            value={this.state.euroState}


        />
        </View>
        </View>
        <View  style={styles.inputInfoColContainer}>
        {(this.state.euroState!='' && this.state.euroState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('CurrentBalance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
        }
        {/* {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('StartingBalance')} {this.getEuroStateWithCorrectDecimals()} €</Text>
        } */}
        {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
        }
        {(this.state.savingsState!='' && this.state.savingsState!=null && this.state.savingsState!='0' || refUpdateSetAmountAside == true)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('SavingsBalance')} {this.stringWithCorrectCurrencyPosition(this.getSavingsStateWithCorrectDecimals())}</Text>
        }
        </View>
        <View style={styles.twoViewsStartEndContainer}>
        {(this.state.euroState!='' && this.state.euroState!=null && this.state.isEditingEuroState == false)   &&
        <Text style={styles.modalMainViewSubTitle} >{I18n.t('SetAsideQuestion')} </Text>
        }
        {(this.state.euroState!='' && this.state.euroState!=null && this.state.isEditingEuroState == false)  &&
        <BouncyCheckbox style={styles.BouncyCheckbox}
        onPress={(isChecked: boolean) => this.checkStateOfCheckBox2(isChecked)}
        fillColor = {'#6cc3c3'}
        isChecked={this.getDefaultStateOfSavings()}
        ></BouncyCheckbox>
        }
        </View>
        {refUpdateSetAmountAside == true && this.state.isEditingEuroState == false &&
        <Text style={styles.modalMainViewSubHeader}>{I18n.t('SavingsAmount')}</Text>
        }
        {refUpdateSetAmountAside == true && this.state.isEditingEuroState == false && //thelei setState kapioy alloy gia na kanei re-render h selida
        <View style={styles.inputRowContainer}>
        <View style={styles.iconContainer}>
        <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
        </View>
        <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(text)=> this.onChanged1Savings(text)}
            defaultValue={this.state.savingsState}
            value={this.state.savingsState}
            onTouchStart={()=>this.startEdit1Savings()}
            maxLength={10}  //setting limit of input
            onEndEditing={()=>this.endEdit1Savings()}
            // onTouchStart={()=>this.startEdit1()}

        />
        </View>
        </View>
        }
        {/* <View style={styles.twoViewsStartEndContainer}>
        {(this.state.startingEuroState!='' && this.state.startingEuroState!=null && this.state.euroState != refEuroState && this.state.isEditingEuroState == false)  &&
        <Text style={styles.modalMainViewSubTitle} >{I18n.t('UpdateStartingBalanceQuestion')}</Text>
        }
        {(this.state.startingEuroState!='' && this.state.startingEuroState!=null && this.state.euroState != refEuroState && this.state.isEditingEuroState == false)  &&
        <BouncyCheckbox  style={styles.BouncyCheckbox}
        onPress={(isChecked: boolean) => this.checkStateOfCheckBox1(isChecked)}
        fillColor = {'#6cc3c3'}
        ></BouncyCheckbox>
        }
        </View> */}
        </ScrollView>

        </View>
        
        </View>

        
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={()=>this.cancelBtnModal(1,true)} style={styles.cancelBtn}><Text style={styles.cancelBtnText}>{I18n.t('Cancel')}</Text></TouchableOpacity>
          <TouchableOpacity onPress={async ()=>this.confirmBtnModal(1,true)} style={styles.confirmBtn}><Text style={styles.confirmBtnText}>{I18n.t('Confirm')}</Text></TouchableOpacity>

        </View>
         </ModalViewMoveUp>
         </View>
         {!(this.state.areAdsRemoved == 'true') && (this.state.loading == false) &&
          <AdMobBannerComponent showAd = {!this.state.hideThisAd1} callback = {this.hideThisAd1}></AdMobBannerComponent>

         }
        </Modal>
        </View>
        
        </TouchableOpacity>
       

        </InfoWrapperMoveUp>
 <View style={styles.rowContainer}>
 <View style={styles.iconWrapper}>      
          <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.calendarAlt}
          />
          </View> 
          <TouchableOpacity onPress={()=>this.openBtnModal(2,true)} style={styles.infoWrapper}>
            {/* {TUTORIAL} */}
          { this.state.idOfTutToShow == 1 && this.state.tutorialViewd =='false' &&
          <Text style={styles.tutText}>{this.state.tutorialText}</Text>   
          }
          { this.state.idOfTutToShow == 1 && this.state.tutorialViewd =='false' &&  
          <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
          <ViewFadeInOut  style={styles.tutView}> 
          </ViewFadeInOut>
          </TouchableOpacity>
          }
          {/* { end TUTORIAL} */}
          <View style={styles.colContainer}>
          <Text style={styles.textBold}>{I18n.t('PayDay')} {this.getLocalisedFullDateString(this.state.fullDatePaydayState)}</Text>  
         <Text style={styles.textFaint}>{I18n.t('DaysLeft')} {this.getDaysLeftToPayday()}</Text>
         
         <Modal useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.Modal} coverScreen={true} animationIn = {'fadeIn'} animationOut={'fadeOut'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.buttonModal2}>
      <View style={styles.ModalViewWrapper}>

         <ModalViewMoveDown style={styles.modalTopBackground} shouldClose = {this.state.closeModal2}> 
         </ModalViewMoveDown>
         <ModalIconViewMoveDown style={styles.modalIconBackground} shouldClose = {this.state.closeModal2}>
         <View style={styles.modalIconWrapper}>      
          <FontAwesome
            style={styles.modalIconStyle}

            icon={SolidIcons.calendarAlt}
          />
          </View>
         </ModalIconViewMoveDown>
         <ModalViewMoveUp style={styles.modalBottomBackground} shouldClose = {this.state.closeModal2}> 
        
         <View style={styles.colContainer}>
         {/* <Swiper   
         scrollEnabled = {true}
        //  index={index}
         >   */}
         <View style={styles.modalMainViewWrapper}>
         <Text style={styles.modalMainViewTitle}>{I18n.t('WhenAreYouGettingPaidQuestion')} </Text>      
         <ScrollView  ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} nestedScrollEnabled={true} style={{marginTop:10}}>
  
         <View style={styles.calendar}>
         {/* <GestureRecognizer 
          config ={{velocityThreshold:0.1,directionalOffsetThreshold:10000,gestureIsClickThreshold:0}}
          onSwipe={(e) => this.OnSwipe(e)}>
              <CalendarPicker 
                  ref = {cal =>this._calendarRef = cal}
                  initialDate={this.getDateFromMomentDate()}
                  selectedStartDate = {this.getDateFromMomentDate()}
                  minDate={new Date()}
                  onDateChange={this.onDateChange}
                  headerWrapperStyle={{maxWidth:370}}
                  width={350}
                  months={[I18n.t('Jan'), I18n.t('Feb'), I18n.t('Mar'), I18n.t('Apr'), I18n.t('May'), I18n.t('Jun'), I18n.t('Jul'), I18n.t('Aug'), I18n.t('Sep'), I18n.t('Oct'), I18n.t('Nov'), I18n.t('Dec')]}
                  previousTitle={I18n.t('Previous')}
                  nextTitle={I18n.t('Next')}
                  //scrollable={true}
                  
              />
              </GestureRecognizer> */}
              <Calendar 
              // Set custom calendarWidth.
              minDate={refMinDate}
              onDayPress={this.onDateChange}
              markedDates={this.state.markedDates}
              enableSwipeMonths={true}
              current = {this.getDateFromDateString()}
              hideExtraDays={true}
              onPressArrowRight={subtractMonth => this.onPressArrowRight(subtractMonth)}
              onPressArrowLeft={addMonth => this.onPressArrowLeft(addMonth)}
              onMonthChange={(month) => this.setExpensesOfPastMonth(month) }

              // onTouchStart={()=>console.log('HEYYY')}
              // onTouchEnd={()=>console.log('END')}
              // renderArrow={(direction) => (<Arrow/>)}
              renderArrow={(direction) => direction === 'left' ? <FontAwesome style={{fontSize:20,color:'#6fc3c3'}} icon={SolidIcons.chevronLeft} /> : < FontAwesome style={{fontSize:20,color:'#6fc3c3'}} icon={SolidIcons.chevronRight} />}
              theme={{textDisabledColor:'#d3d3d3'}}

              
            />
              </View>
              <Text></Text>
        <View  style={styles.inputInfoRowContainer}>
        {(this.state.fullDatePaydayState!='' && this.state.fullDatePaydayState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('PayDay')} {this.getLocalisedFullDateString(this.state.fullDatePaydayState)}</Text>
        }
        </View>
        <View  style={styles.inputInfoRowContainer}>
        {(this.state.paydayState!='' && this.state.paydayState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('DaysLeft')} {this.getDaysLeftToPayday()}</Text>
        }
        </View>
        <View  style={styles.inputInfoRowContainer}>
        {(this.state.paydayState!='' && this.state.paydayState!=null && this.state.spentPastMonth != null && this.state.spentPastMonth!='')  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('SpentMonth')} {this.stringWithCorrectCurrencyPosition(this.state.spentPastMonth)}</Text>
        }
        </View>
        <Text></Text>
        {this.state.dataSourcePerDay!=null &&
        <View  style={styles.inputInfoRowContainer}>
        <Text style={[styles.modalMainViewSubInfo,{fontSize:16,color:'black',fontStyle:'italic'}]}>{I18n.t('ExpensesOf')} {this.getLocalisedFullDateString(this.state.selectedDayExpensesString)}</Text>
        </View>
        }
        {this.state.dataSourcePerDay!=null &&
        <View style={{padding:20}}>
            {/* <Text>timestamp</Text>
            <Text>amount</Text>
            <Text>delete button</Text>     */}  
            {/* <FlatList style={styles.ExpensesList}
              data={this.state.dataSource}
              renderItem={this.renderExpensesJsonList}
            /> */}
            
        { this.state.dataSourcePerDay.map((item) => (
                <View style={[styles.rowContainer,{justifyContent:'space-between'}]}>
                <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
                {item.Category ==0 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.coffee}
               />
               }
               {item.Category ==1 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.gasPump}
               />
               }{item.Category ==2 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.utensils}
               />
               }{item.Category ==3 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.moneyCheckAlt}
               />
               }{item.Category ==4 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.bus}
               />
               }{item.Category ==5 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.tshirt}
               />
               }{item.Category ==6 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.wallet}
               />
               }
                <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{item.Time}</Text>
                </View> 
            ))}
        </View>
        }
        {/* <Swiper  style={{ }}>
          
          <Text>hellohellohellohellohellohello</Text>
          <Text>hellohellohellohellohellohello</Text>

        </Swiper> */}
        </ScrollView>

        </View>
        
        </View>
        
        {/* <ScrollView  style={{marginTop:40}}>

        </ScrollView> */}
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={()=>this.cancelBtnModal(2,true)} style={styles.cancelBtn}><Text style={styles.cancelBtnText}>{I18n.t('Cancel')}</Text></TouchableOpacity>
          <TouchableOpacity onPress={async ()=>this.confirmBtnModal(2,true)} style={styles.confirmBtn}><Text style={styles.confirmBtnText}>{I18n.t('Confirm')}</Text></TouchableOpacity>
        </View>
        
         </ModalViewMoveUp>
         </View>
         {!(this.state.areAdsRemoved == 'true') && (this.state.loading == false) &&
          <AdMobBannerComponent showAd = {!this.state.hideThisAd2} callback = {this.hideThisAd2}></AdMobBannerComponent>

         }
        </Modal>
      </View>
       </TouchableOpacity>
       {/* <DatePicker date={date} ></DatePicker> */}
 </View>
 <View style={styles.rowContainer}>
 <View style={styles.iconWrapper}>      
          <FontAwesome
            style={styles.iconStyle}

            icon={SolidIcons.moneyBillWave}
          />
          </View>
          <TouchableOpacity onPress={()=>this.openBtnModal(3,true)} style={styles.infoWrapper}>
              {/* {TUTORIAL} */}
          { (this.state.idOfTutToShow == 2 || this.state.idOfTutToShow == 3) && this.state.tutorialViewd =='false' &&
          <Text style={[styles.tutText,{width:'120%',right:0,top:-70}]}>{this.state.tutorialText}</Text>   
          }
          { (this.state.idOfTutToShow == 2 || this.state.idOfTutToShow == 3) && this.state.tutorialViewd =='false' &&  
          <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
          <ViewFadeInOut  style={styles.tutView}> 
          </ViewFadeInOut>
          </TouchableOpacity>
          }
          {/* { end TUTORIAL} */}
            <View style={styles.colContainer}>
            {parseFloat(this.getRemainingToday()) >=0 &&
            <Text style={styles.textBold}>{this.stringWithCorrectCurrencyPosition(this.state.moniesState)} {I18n.t('PerDay')}</Text>
            }
            {parseFloat(this.getRemainingToday()) <0 &&
            <Text style={[styles.textBold,{color:'#FF2D00DD'}]}>{this.stringWithCorrectCurrencyPosition(this.state.moniesState)} {I18n.t('PerDay')}</Text>
            }
            <Text style={styles.textFaint}>{I18n.t('SpentToday')} {this.stringWithCorrectCurrencyPosition(this.getSpentTodayStateWithCorrectDecimals())}</Text> 
            { parseFloat(this.getRemainingToday()) <0 &&
            <Text style={[styles.textFaint,{color:'#FF2D00DD'}]}>{I18n.t('AmountOver')} {this.stringWithCorrectCurrencyPosition(this.getRemainingToday().replace('-',''))}</Text>
            }
            { parseFloat(this.getRemainingToday()) >=0 &&
            <Text style={styles.textFaint}>{I18n.t('RemainingMonies')} {this.stringWithCorrectCurrencyPosition(this.getRemainingToday())}</Text>
            }
         <Modal useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.Modal} coverScreen={true} animationIn = {'fadeIn'} animationOut={'fadeOut'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.buttonModal3}>
   <View style={styles.ModalViewWrapper}>

         <ModalViewMoveDown style={styles.modalTopBackground} shouldClose = {this.state.closeModal3} > 
         </ModalViewMoveDown>
         <ModalIconViewMoveDown style={styles.modalIconBackground} shouldClose = {this.state.closeModal3} >
         <View style={styles.modalIconWrapper}>      
          <FontAwesome
            style={styles.modalIconStyle}

            icon={SolidIcons.moneyBillWave}
          />
          </View>
         </ModalIconViewMoveDown>
         <ModalViewMoveUp style={styles.modalBottomBackground} shouldClose = {this.state.closeModal3}> 
         <View style={styles.colContainer}>
         <View style={styles.modalMainViewWrapper}>
         <Text style={styles.modalMainViewTitle}>{I18n.t('HowMuchDidYouSpendTodayQuestion')} </Text>
         <ScrollView  nestedScrollEnabled={false} style={{marginTop:10}}>
         <Text style={styles.modalMainViewSubHeader}>{I18n.t('Amount')}</Text>
        <View style={styles.inputRowContainer}>
        <View style={styles.iconContainer}>
        <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
        </View>
        <View style={[styles.inputContainer , {width:'50%'}]}>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(text)=> this.onChanged3(text)}
          onEndEditing={()=>this.endEdit3()}
          onTouchStart={()=>this.startEdit3()}
          defaultValue={this.state.newSpent}
          value = {this.state.newSpent}
          maxLength={10}  //setting limit of input
      />
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={async () =>   this.spentTodayButton(-1)} >
        <View style={{paddingHorizontal:10}}>      
          <FontAwesome
            style={[styles.modalIconStyle , {color:'#6d6d6d'}]}

            icon={SolidIcons.arrowAltCircleDown}
          />
          </View>
          </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton} onPress={async () =>   this.spentTodayButton(1)} >
        <View style={{paddingHorizontal:10}}>      
          <FontAwesome
            style={[styles.modalIconStyle , {color:'#6d6d6d'}]}

            icon={SolidIcons.arrowAltCircleUp}
          />
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:0})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=0 && styles.categoryButton,this.state.selectedCategoryBtn == 0 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.coffee}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:1})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=1 && styles.categoryButton,this.state.selectedCategoryBtn == 1 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.gasPump}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:2})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=2 && styles.categoryButton,this.state.selectedCategoryBtn == 2 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.utensils}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:3})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=3 && styles.categoryButton,this.state.selectedCategoryBtn == 3 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.moneyCheckAlt}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:4})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=4 && styles.categoryButton,this.state.selectedCategoryBtn == 4 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.bus}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:5})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=5 && styles.categoryButton,this.state.selectedCategoryBtn == 5 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.tshirt}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:6})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=6 && styles.categoryButton,this.state.selectedCategoryBtn == 6 && styles.selectedCategoryButton]}
           
                 icon={SolidIcons.wallet}
               />
           </TouchableOpacity>
        </View>
        <View  style={styles.inputInfoColContainer}>
        {(this.state.spentTodayState!='' && this.state.spentTodayState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('SpentToday')} {this.stringWithCorrectCurrencyPosition(this.getSpentTodayStateWithCorrectDecimals())}</Text>
        }
        {(this.state.spentTodayState!='' && this.state.spentTodayState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('SpentMonth')} {this.stringWithCorrectCurrencyPosition(this.getSpentThisMonth())}</Text>
        }
        {(this.state.euroState!='' && this.state.euroState!=null)  &&
        <Text style={styles.modalMainViewSubInfo}>{I18n.t('CurrentBalance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
        }
        </View>

        <Text></Text>     
        {this.state.dataSource!=null && this.state.dataSource.length !=0 &&
        <View  style={styles.inputInfoRowContainer}>
        <Text style={[styles.modalMainViewSubInfo,{fontSize:16,color:'black',fontStyle:'italic'}]}>{I18n.t('SpentToday')}</Text>
        </View>
        }
        {this.state.dataSource!=null && this.state.dataSource.length !=0 &&
        <View style={{padding:20}}>
            {/* <Text>timestamp</Text>
            <Text>amount</Text>
            <Text>delete button</Text>     */}  
            {/* <FlatList style={styles.ExpensesList}
              data={this.state.dataSource}
              renderItem={this.renderExpensesJsonList}
            /> */}
            
        { this.state.dataSource.map((item) => (
               <View style={[styles.rowContainer,{justifyContent:'space-between'}]}>
               <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
               {item.Category ==0 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.coffee}
               />
               }
               {item.Category ==1 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.gasPump}
               />
               }{item.Category ==2 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.utensils}
               />
               }{item.Category ==3 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.moneyCheckAlt}
               />
               }{item.Category ==4 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.bus}
               />
               }{item.Category ==5 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.tshirt}
               />
               }{item.Category ==6 && 
                <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={SolidIcons.wallet}
               />
               }
               <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{item.Time}</Text>
               <TouchableOpacity onPress={async ()=>this.deleteExpense(item)}>
               <FontAwesome
                  style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}
           
                 icon={RegularIcons.trashAlt}
               />
               </TouchableOpacity>
               </View>
            ))}
        </View>
        }
        </ScrollView>
        </View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={()=>this.cancelBtnModal(3,true)} style={styles.cancelBtn}><Text style={styles.cancelBtnText}>{I18n.t('Cancel')}</Text></TouchableOpacity>
          <TouchableOpacity onPress={async ()=>this.confirmBtnModal(3,true)} style={styles.confirmBtn}><Text style={styles.confirmBtnText}>{I18n.t('Confirm')}</Text></TouchableOpacity>
        </View>
         </ModalViewMoveUp>
         </View>
         {!(this.state.areAdsRemoved == 'true') && (this.state.loading == false) &&
          <AdMobBannerComponent showAd = {!this.state.hideThisAd3} callback = {this.hideThisAd3}></AdMobBannerComponent>

         }
        </Modal>

 </View>
 </TouchableOpacity>

 </View>
 </MainViewMoveUp>
 {this.state.stopShowingPromptToRate!='true' && this.state.daysPassed>=2 &&
 <Modal  useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={true}> 
            <View style={styles.billingWindowStyle}>
            {/* <Swiper> */}
            <Text style={{ fontSize:22,fontStyle:'italic',alignSelf:'center'}}>Do you like this app ?</Text>
            <Text></Text>
            <Text style={{ fontSize:17,alignSelf:'center',paddingHorizontal:10}}>If you do, please take a moment to rate it, it really helps us grow!</Text>
            <Text></Text>
            <View style={{ flexDirection: 'row',justifyContent:'space-around',paddingHorizontal:5}}>
              <TouchableOpacity style={{width:'30%'}} onPress={async () => await this.stopShowingPrompt()}><Text  style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>I have already rated</Text></TouchableOpacity>
              <Text style={{width:'30%'}}></Text>
              <TouchableOpacity style={{width:'20%'}} onPress={() => this.setState({daysPassed:0})}><Text style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>Maybe later</Text></TouchableOpacity>
              <TouchableOpacity style={{width:'20%'}} onPress={()=>this.takeUserToRate()}><Text style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>Yes please!</Text></TouchableOpacity>


      
            </View>

          {/* <LanguageSelect changeLanguage={this.changeLanguage}/>
          </Swiper> */}
          </View>
</Modal>  
}
 <View style={styles.footerLine}></View>
 <TouchableOpacity style={styles.updateButton}  onPress={async () => this.updateButton()}>
     {/* {TUTORIAL} */}
     { this.state.idOfTutToShow == 4 && this.state.tutorialViewd =='false' &&
          <Text style={[styles.tutText,{paddingHorizontal:20}]}>{this.state.tutorialText}</Text>   
          }
          { this.state.idOfTutToShow == 4  && this.state.tutorialViewd =='false' &&  
          <TouchableOpacity style={styles.tutTouchableOpacity} onPress={()=>this.progressTutorial()}>
          <ViewFadeInOut  style={styles.tutViewUpdate}> 
          </ViewFadeInOut>
          </TouchableOpacity>
          }
          {/* { end TUTORIAL} */}
          <Text style={styles.updateButtonText}>{I18n.t('Update')}</Text></TouchableOpacity>
 </View>
    }
    
 </View>
 {!(this.state.areAdsRemoved == 'true') && (this.state.loading == false) &&
<AdMobBannerComponent showAd = {!this.state.hideThisAd4} callback = {this.hideThisAd4}></AdMobBannerComponent>
}
 {/* backdrop tou drawer  */}
{this.state.openSettings == true &&
<View pointerEvents='none' style={{flex:1,position:'absolute'}} > 
   <Text style={{height:deviceHeight,width:deviceWidth,backgroundColor:'#00000188'}}></Text>
 </View>
}
 <View pointerEvents={setPointerEventsOfDrawer} style={{position:'absolute',zIndex:1}}>
          <MenuDrawer  //TOU XW VALEI DEVICE HEIGHT ME OVERRIDE
          open={this.state.openSettings} 
          drawerContent={this.settingsMenuContent()}
          drawerPercentage={100}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          
        >
           
        </MenuDrawer>
       

</View>


{ (this.state.loading == false) &&   

 <TouchableOpacity  onPress={()=>this.openSettings(!this.state.openSettings)} style={styles.topLeftButton}>
          <FontAwesome
            style={styles.barStyle}

            icon={SolidIcons.bars}
          />
           {/* {TUTORIAL} */}
          { this.state.idOfTutToShow == 5 && this.state.tutorialViewd =='false'  &&
          <ViewFadeInOut  style={styles.tutView}> 
          </ViewFadeInOut>
          }
          {/* { end TUTORIAL} */} 
</TouchableOpacity>
}


       </Fragment>
     );
     }
    }
   
 
 hideThisAd1 = () =>{
   console.log('AD HIIDDEN 1')
   this.setState({hideThisAd1:true});
 };
 hideThisAd2 = () =>{
  this.setState({hideThisAd2:true});
 };
hideThisAd3 = () =>{
  this.setState({hideThisAd3:true});
};
hideThisAd4 = () =>{
  this.setState({hideThisAd4:true});
};

async setAreAdsRemovedStateAndCloseWindow(){
  let _areAdsRemoved = await storageGet('RemovedAds');
  this.setState({areAdsRemoved : _areAdsRemoved,removeAdsShop:false})
  
}
OnSwipe(gestureName): void {
  const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  console.log('SWIPERSWEIPRSAWE')
  if(true) //an to touch einai panw sto sto calendar
   switch (gestureName) {
    case SWIPE_LEFT: {
      this.onSwipeLeft(gestureName);
      // if (index < size && swiper) {
      //   swiper.current.scrollBy(1, true);
      //   const position = index + 1;
      //   setIndex(position);
      // }
      break;
    }

    case SWIPE_RIGHT: {
      this.onSwipeRight(gestureName)
      // if (index > 0 && swiper) {
      //   swiper.current.scrollBy(-1, true);
      //   const position = index - 1;
      //   setIndex(position);
      // }
      break;
    }
  }
  return true;
}
async setCardTutorial(boolAsString){
  await storageSet('CardTutorialViewed',boolAsString);
  let cardTutorial = boolAsString;
 // console.log(this.state.cardTutorial)
 this.state.swiperIndex = 0
 if(boolAsString == 'true'){
  this.state.swiperIndex = 0
  if(this.state.openSettings){
    this.openSettings(!this.state.openSettings);

  }
 }
  this.setState({cardTutorial:cardTutorial,swiperIndex:this.state.swiperIndex  });
  //console.log(this.state.cardTutorial)

  //this.render();
}
skipTutorialWarning(){
  
  Alert.alert(
    I18n.t("AreYouSure"),
    I18n.t("SwiperTutorial12"),
    [
       // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: I18n.t("No"),
      },
      // The "Yes" button
      {
        text: I18n.t("Yes"),
        onPress: () => {
          this.skipTutorial();
          return;
        },
      },
     
    ]
  );
}
 skipTutorial(){
   var scrollby = 8-this.state.swiperIndex;
   console.log(scrollby);
  this._swiperRef.scrollBy(scrollby,true);
 }
 onSwipeLeft(gestureState) {
  console.log('LEFT');
  this._calendarRef.handleOnPressNext();
} 
onSwipeRight(gestureState) {
  console.log('RIGHT');
  this._calendarRef.handleOnPressPrevious();

}
onPressArrowRight(subtractMonth){
  // this.state.dataSourcePerDay =null;
  this.setState({dataSourcePerDay:null})
  subtractMonth();
}
onPressArrowLeft(addMonth){
  // this.state.dataSourcePerDay =null;
  this.setState({dataSourcePerDay:null})
  addMonth();
}

async setExpensesOfPastMonth(month){
  //{"dateString": "2021-12-22", "day": 22, "month": 12, "timestamp": 1640131200000, "year": 2021}
  // if(month.year +'-'+month.month == moment(new Date()).format("YYYY-MM")){ // an o minas einai o mellontikos
  //   return; //TODO
  // }
  if((month.year +'-'+month.month == moment(new Date()).format("YYYY-MM"))){ // an o minas einai o twrinos
    this.state.spentPastMonth = this.getSpentThisMonth();
    this.setState({spentPastMonth:this.state.spentPastMonth})
    return;
  }
  if(refspentMonthHistory == ''){
    refspentMonthHistory =  await storageGet('SpentMonthJson');
  }
  if(refspentMonthHistory == null){
    this.state.spentPastMonth = '';
    this.setState({spentPastMonth:this.state.spentPastMonth});
    return;
  }
 JSON.parse(refspentMonthHistory).forEach(element => {
   if(month.year+'-'+month.month == element.Time){
     console.log('this month:'+element.Amount)
     this.state.spentPastMonth =  element.Amount;
      return;
     }
     this.state.spentPastMonth = '';

 });
 this.setState({spentPastMonth:this.state.spentPastMonth})


}

   settingsMenuContent = () => {
    return (
      <View style={{flex:1}}>
      <View style={styles.drawerContainer}>
      <View style={styles.drawerMainView}>
        <Text style={{fontWeight:'600',fontSize:20,color:'#3d3d3d',height:'10%',alignSelf:'center',textAlignVertical:'bottom'}}>{I18n.t("AppName")}</Text>
        <Text style={{fontWeight:'300',fontSize:15,color:'#8d8d8d',height:'3%',alignSelf:'center',textAlignVertical:'bottom'}}>{I18n.t("AppSubName")}</Text>
        <View style={styles.footerLine}/>
         <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.globe}/>
        <TouchableOpacity  onPress={()=>this.setState({openLanguageSelect:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("ChangeLanguage")}</Text>
          </TouchableOpacity>
          <Modal  onBackdropPress={()=>this.setState({openLanguageSelect:false})} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openLanguageSelect}> 
            <View style={styles.billingWindowStyle}>
            {/* <Swiper> */}
          <LanguageSelect changeLanguage={this.changeLanguage}/>
          {/* <LanguageSelect changeLanguage={this.changeLanguage}/>
          </Swiper> */}
          </View>
        </Modal>
        </View>
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.dollarSign}/>
        <TouchableOpacity  onPress={()=>this.setState({openCurrencySelect:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("ChangeCurrency")}</Text>
          </TouchableOpacity>
          <Modal  onBackdropPress={()=>this.setState({openCurrencySelect:false})} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openCurrencySelect}> 
            <View style={styles.billingWindowStyle}>
            {/* <Swiper> */}
          <CurrencySelect changeCurrency={this.changeCurrency}/>
          {/* <LanguageSelect changeLanguage={this.changeLanguage}/>
          </Swiper> */}
          </View>
        </Modal>
        </View>
        <View style={styles.footerLine}/>
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.donate}/>
       <TouchableOpacity  onPress={()=>this.setState({openCoffeeShop:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("OpenCoffeeShop")}</Text>
          </TouchableOpacity>
       <Modal  onBackdropPress={()=>this.setState({openCoffeeShop:false})} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openCoffeeShop}>
            <View style={[styles.billingWindowStyle]}>
          <Billing/>
          </View>
      </Modal>
      </View>
      <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.ad}/>
       <TouchableOpacity  onPress={()=>this.setState({removeAdsShop:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("RemoveAds")}</Text>
          </TouchableOpacity>
       <Modal  onBackdropPress={async()=>await this.setAreAdsRemovedStateAndCloseWindow()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.removeAdsShop}>
            <View style={[styles.billingWindowStyle]}>
          <RemoveAds/>
          </View>
      </Modal>
      </View>
      <View style={styles.footerLine}/>

      <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.chalkboardTeacher}/>
       <TouchableOpacity  onPress={async ()=>await this.setCardTutorial('false')} >
            <Text style={styles.drawerButtonText}>{I18n.t("ReviewTutorial")}</Text>
          </TouchableOpacity>
      </View>
      <View style={[styles.footerLine]}/>
     </View>
      
      <View style={styles.drawerExitView}>
      <TouchableOpacity style={{flex:1}} onPress={()=>this.openSettings(false)} >
            
      </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  };
   changeLanguage = async (languageCode)=>{
    I18n.locale = languageCode;
    await storageSet('LanguageCode',languageCode);
    LocaleConfig.defaultLocale = languageCode; //it works
    await this.changeCurrency(I18n.t("DefaultCurrency"));
    this.setState({openLanguageSelect:false})
  }
  changeCurrency = async (currency)=>{
    await storageSet('Currency',currency);
    refCurrency=currency;
    this.setState({openCurrencySelect:false})

  }
  stringWithCorrectCurrencyPosition(stringToReturn){
    if(stringToReturn ==null){
      stringToReturn = '';
    }
    let currencyInfo = currencies.filter(
      function(data){ 
        if(data.currencyCode == refCurrency){
          return data;
        }
          
      }
    );
    if(currencyInfo.length == 0){
      currencyInfo[0] = currencies[0]; //FALLBACK GIA AN DEN EXOYME TO CURRENCY POY EINAI LOCAL TOY
    }
    if(currencyInfo[0].Position == "first"){
      return currencyInfo[0].Symbol + " " +stringToReturn;
    }else if (currencyInfo[0].Position == "last"){
      return stringToReturn + " " + currencyInfo[0].Symbol;
    }
  }
  correctFontAwesomeCurrencyIcon(){
    let currencyInfo = currencies.filter(
      function(data){ 
        if(data.currencyCode == refCurrency){
          return data;
        }
          
      }
    );
    if(currencyInfo.length == 0){  //FALLBACK GIA AN DEN EXOYME TO CURRENCY POY EINAI LOCAL TOY
      currencyInfo[0] = currencies[0];
    }
    if(currencyInfo[0].currencyCode == "USD"){
      return SolidIcons.dollarSign;
    }else if (currencyInfo[0].currencyCode == "GBP"){
      return SolidIcons.poundSign;
    }else if (currencyInfo[0].currencyCode == "EUR"){
      return SolidIcons.euroSign;
    }
  }
   openSettings(shouldOpen){
    if(this.state.tutorialViewd =='false'){ //patise to tutorial
      this.progressTutorial();
      return;
    }
    switch(shouldOpen){
      case true:
        setPointerEventsOfDrawer = 'auto'
        break;
      case false:
        setPointerEventsOfDrawer = 'none'
        break;
    }
    this.setState({openSettings:shouldOpen})

   }
 
    setOpen(bool){
      this.state.open = bool;
      this.setState({ open: bool }) ;

    }
   setDate(date){
     let today = new Date();
     if(date<today && today.toDateString() != date.toDateString()){
      alert("dont set date in the past pls");
      return;
     }
     let nowmonth = new Date().getMonth()+1; //DE KSERW GIATI THELEI +1
     let paymonth = date.getMonth()+1;
     if(paymonth<=nowmonth){ //mono otan einai next year
      let nowyear = new Date().getFullYear();
      let payyear = date.getFullYear();
      paymonth += (payyear-nowyear)*12;

     }
     let diff = paymonth-nowmonth;
    this.state.selectedDayExpensesString = date;
    console.log("diff: "+diff);
    this.state.paydayState = (date.getDate() + diff*30).toString();
    this.setState({ date: date, paydayState: (date.getDate() + diff*30).toString() }) ;
    // await storageSet('PayDay',(this.state.date.getDate().toString()));


  }
   async updateButton(){
    if(this.state.tutorialViewd =='false' && this.state.idOfTutToShow!=5){ //patise to tutorial
      this.progressTutorial();
      return;
    }else if (this.state.tutorialViewd == 'false'){
      return;
    }
    //await this.endEdit3();
    await this.saveData();

     await this.saveAndSetSharedStorage();
     this.state.moniesState = await this.CalculateEuroPerDay();
     this.setState({moniesState:this.state.moniesState})
     
   }
   onChanged1Savings(text){
     
    let newText = '';
    let numbers = '0123456789';
  
    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
             newText = newText + text[i];
         }
         else {
             // your call back function
             //alert("please enter numbers only");
             if(!newText.includes('.')){

              if(text[i]==',' || text[i]=='.'){
                //text[i]=='.';
                newText = newText + '.';
               
              }
             }
         }
     }
     if(newText=='.'){
      newText = '0';
    }
    this.state.savingsState = newText;
    this.setState({savingsState: newText });

    // if(this.state.euroState!=null && this.state.euroState!='' && this.state.savingsState!=null && this.state.savingsState!=''){
    //   if(refSavingsState!= null && refSavingsState!=''){
    //   if(parseFloat(this.state.savingsState) < refSavingsState){
    //       this.state.euroState = (parseFloat(this.state.euroState) + (parseFloat(refSavingsState) - parseFloat(this.state.savingsState))).toString();
    //   }else{
    //     this.state.euroState = (parseFloat(this.state.euroState) - (parseFloat(this.state.savingsState) - parseFloat(refSavingsState))).toString();

    //   }
    //   }
    // this.state.euroState = (parseFloat(this.state.euroState) - parseFloat(this.state.savingsState)).toString()
    // }
   // this.setState({ savingsState: newText });
   //  await storageSet('Euros',newText);
   //  this.SetSharedStorage();
  }
  startEdit1Savings(){
    isEditingText1Savings =true;
   }
  endEdit1Savings(){ 
    isEditingTextSavings1 =false;

    if(checkIfSavingsEdited =='' || checkIfSavingsEdited == null){
      checkIfSavingsEdited ='0'   ;
    }
    let savings= checkIfSavingsEdited;
    let addedOrSubbed = 0;
    if(savings == null){
      savings = "0";
    }
    if (this.state.savingsState == "" || this.state.savingsState == null){
      this.state.savingsState = "0";
    }
    let AlertStringToShow ='';
    
    if(this.state.savingsState != savings){ // exei kanei ontws edit
    
      console.log('EDIT')
      if((parseFloat(this.state.savingsState) - parseFloat(savings))>0){
        //added
        AlertStringToShow =  I18n.t("SubtractAmount");
      }else{
        //subbed
        AlertStringToShow = I18n.t("AddAmount");
  
      }
      //this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
      //prepi na kanw save edw gia na min ksanaafairesei to neo yparxon poso
     
      Alert.alert(
        I18n.t("UpdateCurrentBalanceQuestion"),
        AlertStringToShow,
        [
           // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: I18n.t("No"),
            onPress: () =>{
              if(this.state.savingsState.split('.')[1]?.length>0)
              {
              this.state.savingsState = (parseFloat(this.state.savingsState).toFixed(2)).toString();
              }
              this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
              checkIfSavingsEdited = this.state.savingsState;

            }
            
          },
          // The "Yes" button
          {
            text: I18n.t("Yes"),
            onPress: async () => {
              if(this.state.savingsState.split('.')[1]?.length>0)
              {
              this.state.savingsState = (parseFloat(this.state.savingsState).toFixed(2)).toString();
              }
              if(this.state.euroState =="" || this.state.euroState == null){

              }else{
              this.state.euroState  = (parseFloat(this.state.euroState) - (parseFloat(this.state.savingsState) - parseFloat(checkIfSavingsEdited))).toString();
                
            }
            this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
            checkIfSavingsEdited = this.state.savingsState;

            return;
            },
          },
         
        ]
      );
      return;
      //await storageSet('Savings',this.state.savingsState);
      //await storageSet('Euros',this.state.euroState);


    }

  
  }
   onChanged1(text){
     let newText = '';
     let numbers = '0123456789';
   
     for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
             newText = newText + text[i];
         }
         else {
             // your call back function
             //alert("please enter numbers only");
             if(!newText.includes('.')){

              if(text[i]==',' || text[i]=='.'){
                //text[i]=='.';
                newText = newText + '.';
               
              }
             }
         }
     }
     if(newText=='.'){
      newText = '0';
    }
     this.state.euroState = newText;
     this.setState({isEditingEuroState:true, euroState: newText });
    //  await storageSet('Euros',newText);
    //  this.SetSharedStorage();
   }
   endEdit1(){
    console.log('END EDIT1')
    isEditingText1 =false;
    if(this.state.euroState!= '' && this.state.euroState != null){
    if(this.state.euroState.split('.')[1]?.length>0)
    {
      this.state.euroState = (parseFloat(this.state.euroState).toFixed(2)).toString();
    }
    }
    this.setState({isEditingEuroState:false,euroState:this.state.euroState});
   }
   startEdit1(){
    isEditingText1 =true;
    this.setState({isEditingEuroState:true});
   }
   startEdit1Savings(){
    isEditingTextSavings1 =true;
   }
   
   checkStateOfCheckBox2(isChecked){
    refUpdateSetAmountAside= isChecked;
    this.setState({startingEuroState:this.state.startingEuroState});
   }
   getDefaultStateOfSavings(){
    if(this.state.savingsState != '' && this.state.savingsState!=null && this.state.savingsState!='0'){
      return true;
      //  this.checkStateOfCheckBox2(true);
      // console.log('HEYOYOYOYOYOYOYOOYOYOYOYOOYOYYYOYO')
    }else{false}
   }
   async onChanged2(text){
     let newText = '';
     let numbers = '0123456789';
   
     for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
             newText = newText + text[i];
         }
         else {
             // your call back function
             alert("please enter numbers only");
         }
     }

     this.state.paydayState = newText;
     this.setState({ paydayState: newText });
     
    //  this.setState({ PayDay: newText });
    //  await storageSet('PayDay',newText);
 
    //  this.SetSharedStorage();
     
     
   }
   async endEdit2(){
    if(this.state.paydayState< new Date().getDate()){
      alert("dont set date in the past pls");
      let spent= await storageGet('PayDay');
      this.state.paydayState = spent;
      this.setState({ paydayState: spent });


    }
   }
   onChanged3(text){
     let newText = '';
     let numbers = '0123456789';
     
    //  console.log(text);
    //  if(String(text).includes('.')) {
    //   text = String(text).substring(0,String(text).indexOf('.'));
    //  }
    //  console.log(text);

     for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
             newText = newText + text[i];
         }
         else {
             // your call back function
             //alert("please enter numbers only");
             if(!newText.includes('.')){

             if(text[i]==',' || text[i]=='.'){
               //text[i]=='.';
               newText = newText + '.';
              
             }
            }

         }
     }
     if(newText=='.'){
      newText = '0';
    }

     this.state.newSpent = newText;
     this.setState({ newSpent: newText });
     
    //  this.state.spentTodayState = newText;
    //  this.setState({ spentTodayState: newText });
    //  this.SetSharedStorage();
     
     
   }
   startEdit3(){
    isEditingText3 =true;
   }
   endEdit3(){
    console.log('END EDIT3')
    isEditingText3 =false;
    let spent= checkIfSpentTodayEdited;
    if(spent == null){
      spent = "0";
    }
    if (this.state.spentTodayState == ""){
      this.state.spentTodayState = "0";
    }
    if(this.state.newSpent == null || this.state.newSpent== ''){
      this.state.newSpent = '0';
    }    
    if(this.state.spentTodayState.split('.')[1]?.length>0)
    {
    this.state.spentTodayState = (parseFloat(this.state.spentTodayState).toFixed(2)).toString();
    }
    if(this.state.newSpent.split('.')[1]?.length>0)
    {
    this.state.newSpent = (parseFloat(this.state.newSpent).toFixed(2)).toString();
    }
    if(this.state.newSpent != refNewSpent){
    this.state.spentTodayState = (parseFloat(this.state.spentTodayState) + parseFloat(this.state.newSpent) -  parseFloat(refNewSpent)).toString();
    refNewSpent = this.state.newSpent;
    }
    console.log(this.state.spentTodayState);
    if(this.state.spentTodayState != spent){ // exei kanei ontws edit
      if(this.state.euroState =="" || this.state.euroState == null){

        }else{
        this.state.euroState  = (parseFloat(this.state.euroState) - (parseFloat(this.state.spentTodayState) - parseFloat(spent))).toString();

      }
      
      this.setState({ spentTodayState: this.state.spentTodayState ,euroState: this.state.euroState, newSpent:this.state.newSpent  });
      //prepi na kanw save edw gia na min ksanaafairesei to neo yparxon poso
      checkIfSpentTodayEdited = this.state.spentTodayState;
      //await storageSet('SpentToday',this.state.spentTodayState);
      //await storageSet('Euros',this.state.euroState);


    }
  }
  async spentTodayButton(i){
  
    //await this.endEdit3();
    if(parseFloat(this.state.spentTodayState) + i < 0){
      return;
    }
    if(parseFloat(this.state.newSpent) + i < 0){
      return;
    }
    if(refNewSpent == ''){
      refNewSpent = 0;
    }
    this.state.spentTodayState = (parseFloat(this.state.spentTodayState) + i).toString();
    this.state.newSpent = (parseFloat(this.state.newSpent) + i).toString();
    refNewSpent = this.state.newSpent;
    if(this.state.euroState =="" || this.state.euroState == null ){
  
    }else{
      this.state.euroState = (parseFloat(this.state.euroState) - i).toString();
  
    }
    this.setState({newSpent:this.state.newSpent, spentTodayState: this.state.spentTodayState , euroState: this.state.euroState  });
    checkIfSpentTodayEdited =this.state.spentTodayState;
    //await storageSet('SpentToday',this.state.spentTodayState); //
    //await storageSet('Euros',this.state.euroState); //
  
  
  
   }
 
  openBtnModal(i,bool){
    // if(this.state.tutorialViewd =='false' && this.state.idOfTutToShow == i-1){ //patise to tutorial
    //   this.progressTutorial();
    //   return;
    // }
    if(this.state.tutorialViewd =='false' && this.state.idOfTutToShow!=5){ //patise to tutorial
      this.progressTutorial();
      return;
    }else if (this.state.tutorialViewd == 'false'){
      return;
    }
    switch (i) 
    {
      case 1:
      this.state.buttonModal1 = bool;
      this.state.closeModal1 = !bool;   
      this.setState({buttonModal1:bool,closeModal1:!bool});
      refEuroState = this.state.euroState;
      refSavingsState = this.state.savingsState;
      refUpdateSetAmountAside = false;
      if(this.state.savingsState != '' && this.state.savingsState!=null && this.state.savingsState!='0'){
         this.checkStateOfCheckBox2(true);
        // console.log('HEYOYOYOYOYOYOYOOYOYOYOYOOYOYYYOYO')
      }
      checkIfSavingsEdited = refSavingsState;
      break;
      case 2:
      this.state.buttonModal2 = bool;
      this.state.closeModal2 = !bool;
      if((moment(new Date(this.state.fullDatePaydayState)).format("YYYY-MM") == moment(new Date()).format("YYYY-MM"))){ // an o minas einai o twrinos
        this.state.spentPastMonth = this.getSpentThisMonth();
       // this.setState({spentPastMonth:this.state.spentPastMonth})
      }else{
        this.state.spentPastMonth = '';
      }
      let _markedDates = {};
      _markedDates = this.getMarkedDates(this.state.fullDatePaydayState,null);
      this.setState({spentPastMonth:this.state.spentPastMonth,markedDates:_markedDates,buttonModal2:bool,closeModal2:!bool,dataSourcePerDay:null});
      refFullPayDay = this.state.fullDatePaydayState;
      refPayDay = this.state.paydayState;
      break;
      case 3:
      this.state.buttonModal3 = bool;
      this.state.closeModal3 = !bool;
      this.state.selectedCategoryBtn = 6;
      this.setState({buttonModal3:bool,closeModal3:!bool,selectedCategoryButton:6});
      refSpentToday = this.state.spentTodayState;
      refEuroState = this.state.euroState;
      refNewSpent = '0';
      checkIfSpentTodayEdited =refSpentToday;

      break;
    }

    // AdMobInterstitial.setAdUnitID('ca-app-pub-4278197343444747/8778680203');
    // AdMobInterstitial.setTestDevices(['CF583E54-34C6-453C-80FC-493D2468A51E']);
    // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

  }
  cancelBtnModal(i,bool){
    console.log("LOCK")
    
   //undo stuff
    switch (i) 
    {
      case 1:        
      this.state.euroState =refEuroState;
      this.state.savingsState = refSavingsState;
      this.state.closeModal1 = bool;
      this.setState({closeModal1:bool , euroState:this.state.euroState,savingsState:this.state.savingsState});
      break;
      case 2:
      this.state.paydayState = refPayDay;
      this.state.fullDatePaydayState = refFullPayDay;
      this.state.closeModal2 = bool;
      this.setState({closeModal2:bool,paydayState:this.state.paydayState,fullDatePaydayState:this.state.fullDatePaydayState});
      break;
      case 3:
      this.state.spentTodayState = refSpentToday;
      this.state.euroState = refEuroState;
      this.state.closeModal3 = bool;
      refNewSpent = 0;
      this.setState({newSpent:'0',closeModal3:bool,euroState:this.state.euroState,spentTodayState:this.state.spentTodayState});
      break;
    }
    console.log("UNLOCK")
    setTimeout( 
      () => {
      this.openBtnModal(i,!bool);
   },300);

  }
  async confirmBtnModal(i,bool,conditionalAlertBool1,conditionalAlertBool2,responseBool1){
    console.log("LOCK")
    
    switch (i) 
    {
      case 1:    
      if( this.state.euroState =='' || this.state.euroState ==null){
        Alert.alert(I18n.t("Error"),I18n.t("SetCurrentBalance"))
        return;
      }
      if(this.state.euroState <0 ){
        if(conditionalAlertBool1!=true){
          Alert.alert(
            I18n.t("AreYouSure"),
            I18n.t("NegativeBalance"),
            [
               // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: I18n.t("No"),
              },
              // The "Yes" button
              {
                text: I18n.t("Yes"),
                onPress: async () => {
                  await this.confirmBtnModal(1,true,true);
                  return;
                },
              },
             
            ]
          );
          return;
      }
      }
      if(this.state.euroState != refEuroState){
        if(conditionalAlertBool2!=true){
        Alert.alert(
          I18n.t("UpdateStartingBalanceQuestion"),
          I18n.t("UpdateStartingBalanceFullQuestion"),
          
          [
             // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: I18n.t("No"),
              onPress: async () => {
                await this.confirmBtnModal(1,true,true,true,false);
                return;
              },
            },
            // The "Yes" button
            {
              text: I18n.t("Yes"),
              onPress: async () => {
                await this.confirmBtnModal(1,true,true,true,true);
                return;
              },
            },
           
          ]
        );
        return;
        }
      if(responseBool1!=null){
        if (responseBool1){
          this.state.startingEuroState = this.state.euroState;
        }
      }
      }
      // do stuff
      if(this.state.startingEuroState == '' || this.state.startingEuroState == null){
        this.state.startingEuroState = this.state.euroState;
      }
      
      // if(refUpdateStartingEuroState){
      //   refUpdateStartingEuroState = false;
      //   this.state.startingEuroState = this.state.euroState;
      // }
      if(refUpdateSetAmountAside){
        refUpdateSetAmountAside = false;
      }
      
      this.state.moniesState = this.CalculateEuroPerDayNotAsync();
      this.state.closeModal1 = bool;
      this.setState({closeModal1:bool , startingEuroState:this.state.startingEuroState , moniesState:this.state.moniesState});
      break;
      case 2:
      this.state.moniesState = this.CalculateEuroPerDayNotAsync();
      this.state.closeModal2 = bool;
      this.setState({closeModal2:bool, moniesState:this.state.moniesState});
      break;
      case 3:
      if( this.state.euroState =='' || this.state.euroState ==null){
        Alert.alert(I18n.t("Error"),I18n.t("SetCurrentBalanceBeforeSpending"))
        return;
      }
      if(this.state.euroState < 0 ){
        if(conditionalAlertBool1!=true){
           Alert.alert(
            I18n.t("AreYouSure"),
            I18n.t("NegativeBalance"),
            [
               // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: I18n.t("No"),
              },
              // The "Yes" button
              {
                text: I18n.t("Yes"),
                onPress: async () => {
                  await this.confirmBtnModal(3,true,true);
                  return;
                },
              },
             
            ]
          );
          return;
      }
      };
      //do stuff
      this.state.moniesState = this.CalculateEuroPerDayNotAsync();
      this.state.closeModal3 = bool;
      console.log('NEW SPENT'+this.state.newSpent+' TIME:' +moment(new Date()).local().format('HH:mm:ss'));
      //await storageSet(
      var spentTodayJson = await this.saveExpensesToStorage();
      this.setState({dataSource:spentTodayJson,newSpent:'0',closeModal3:bool,moniesState:this.state.moniesState});
      break;
    }
    await this.saveData();
    setTimeout( 
      () => {
      this.openBtnModal(i,!bool);
   },300);
    setTimeout(
      async ()=>{
        console.log('REVIEW????????????????')
        let times = await storageGet('howManyTimesPressedConfirm');
        let hasReviewdInApp = await storageGet('hasReviewdInApp');
        if(times =='' || times == null){
          await storageSet('howManyTimesPressedConfirm','0');
        }else{
          times = (parseInt(times)+1).toString();
          await storageSet('howManyTimesPressedConfirm',times);
        }
        if(parseInt(times)>=2 && hasReviewdInApp!='true'){
          const options = {
            //AppleAppID:"2193813192",
            GooglePackageName:"com.kyrxtz.mybudget",
          // AmazonPackageName:"com.mywebsite.myapp",
            //OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:true,
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
          });
        }
      },400);
    console.log("UNLOCK")
  }

  async saveExpensesToStorage(){
    
    var spentTodayJson = await storageGet('SpentTodayJson');
    if(spentTodayJson==null){
      spentTodayJson = '[]'
    }
    if(this.state.newSpent==0){
      return JSON.parse(spentTodayJson);
    }
    var addComma = ',';
    if(spentTodayJson =='[]'){
      addComma='';
    }
    var newEntry = this.jsonifySpentToday(this.state.newSpent,moment(new Date()).local().format('HH:mm:ss'),this.state.selectedCategoryBtn);
    
    spentTodayJson = spentTodayJson.substring(0,spentTodayJson.length-1)+addComma+newEntry+']';
    await storageSet('SpentTodayJson',spentTodayJson);

    //ayto edw gia na exei minDate to calendar
    var value3 = await storageGet('FirstDate');
        if(value3 == '' || value3 == null){
          var todate =  moment(new Date()).format('YYYY-MM-DD');
          await storageSet('FirstDate',todate);
        }
    return JSON.parse(spentTodayJson);
  }
  jsonifySpentToday(spent,time,category){
    var todate =  moment(new Date()).format('YYYY-MM-DD');
    return '{"Amount":"'+spent+'", "Time":"'+time+'", "Day":"'+todate+'", "Category":"'+category+'"}';
  }
  renderExpensesJsonList = ({ item }) => (
    <View style={[styles.rowContainer,{justifyContent:'space-between'}]}>
    <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
    <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic'}]}>{item.Time}</Text>
    <TouchableOpacity onPress={async ()=>this.deleteExpense(item)}>
    <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}}

      icon={RegularIcons.trashAlt}
    />
    </TouchableOpacity>
    </View>

  );
  async deleteExpense(item){
    //var spentTodayJson = this.state.dataSource;
    console.log(item.Time);
    var newJson = '[';
    for(var i=0; i<this.state.dataSource.length; i++){
      if(this.state.dataSource[i].Time != item.Time){
        newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
      }
    }
    newJson = newJson.substring(0,newJson.length-1)+']';
    if(newJson == ']'){ //an einai keno
      newJson='[]';
    }
    console.log(newJson);
    await storageSet('SpentTodayJson',newJson);
    this.state.dataSource = JSON.parse(newJson);

    this.state.spentTodayState = (parseFloat(this.state.spentTodayState) - parseFloat(item.Amount)).toString();
    if(this.state.euroState =="" || this.state.euroState == null ){
  
    }else{
      this.state.euroState = (parseFloat(this.state.euroState) + parseFloat(item.Amount)).toString();
      refEuroState = (parseFloat(this.state.euroState) + parseFloat(this.state.newSpent)).toString();

  
    }
    refSpentToday = (parseFloat(this.state.spentTodayState) - parseFloat(this.state.newSpent)).toString();
    //refNewSpent = '0';
    //checkIfSpentTodayEdited =refSpentToday;
    this.setState({euroState:this.state.euroState,spentTodayState:this.state.spentTodayState,dataSource:this.state.dataSource})

  }
  getSavingsStateWithCorrectDecimals(){
    if(this.state.savingsState=='' || this.state.savingsState==null){
      return '';
    }
    var index = this.state.savingsState.indexOf('.');
    if (index >= 0) {
      return (parseFloat(this.state.savingsState).toFixed(2)).toString();
    } else {
      return this.state.savingsState;
    }
   //(parseFloat(this.state.euroState).toFixed(2)).toString()
  }
 getEuroStateWithCorrectDecimals(){
   if(this.state.euroState =='' || this.state.euroState==null){
     return '';
   }
   var index = this.state.euroState.indexOf('.');
   if (index >= 0) {
     return (parseFloat(this.state.euroState).toFixed(2)).toString();
   } else {
     return this.state.euroState;
   }
  //(parseFloat(this.state.euroState).toFixed(2)).toString()
 }
 getStartingEuroStateWithCorrectDecimals(){
  if(this.state.startingEuroState =='' || this.state.startingEuroState==null){
    return '';
  }
  var index = this.state.startingEuroState.indexOf('.');
  if (index >= 0) {
    return (parseFloat(this.state.startingEuroState).toFixed(2)).toString();
  } else {
    return this.state.startingEuroState;
  }
 //(parseFloat(this.state.euroState).toFixed(2)).toString()
}
getSpentTodayStateWithCorrectDecimals(){
  if(this.state.spentTodayState =='' || this.state.spentTodayState==null){
    return '0';
  }
  var index = this.state.spentTodayState.indexOf('.');
  if (index >= 0) {
    return (parseFloat(this.state.spentTodayState).toFixed(2)).toString();
  } else {
    return this.state.spentTodayState;
  }
 //(parseFloat(this.state.euroState).toFixed(2)).toString()
}

getLocalisedFullDateString(dateString){
  if(dateString == '' || dateString == null){
    return null;
  }
   var languageCode = I18n.locale;
   if(I18n.locale.length>2){
     languageCode = languageCode[0] + languageCode[1];
   }
   var date = new Date(dateString);
   if(!this.isValid(date)){
     date = new Date();
   }
   return moment(date).locale(languageCode).format('LL')
  // console.log(moment(new Date('2021-11-01')).locale('en').format('MMMM Do YYYY'))
  // console.log(moment(new Date('2021-11-01')).locale('el').format('MMMM Do YYYY'))
}
isValid(date:Date) {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return date.getTime() === date.getTime();
};  
 getDaysLeftToPayday(){
    
    let pd =  this.state.paydayState;
    if(pd == null || pd ==''){
      return '';
    }
    //let today = new Date().getDate();
    
    let remainingDays = parseInt(pd);
    console.log('THIS IS REAL DAYS LEFT'+remainingDays)
    if(remainingDays <0){
      remainingDays = 0;
    }
    return remainingDays.toString();
  }
  async stopShowingPrompt(){
    await storageSet('stopShowingPromptToRate','true');
    this.setState({stopShowingPromptToRate:'true'})

  }
 takeUserToRate(){
  const options = {
    //AppleAppID:"2193813192",
    GooglePackageName:"com.kyrxtz.mybudget",
  // AmazonPackageName:"com.mywebsite.myapp",
    //OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp:true,
    openAppStoreIfInAppFails:true,
    //fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
  }
  Rate.rate(options, async (success, errorMessage)=>{
    if (success) {
      // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
      //this.setState({rated:true})
      await storageSet('hasReviewdInApp','true');
      await storageSet('DaysPassed','0');
      this.setState({daysPassed:0})
    }
    if (errorMessage) {
      // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
      console.log(`Example page Rate.rate() error: ${errorMessage}`)
    }
  });
 }
  async saveData(){
         //checkForNulls();
         await storageSet('Euros',this.state.euroState);
         await storageSet ('Savings',this.state.savingsState);
         await storageSet('startingEuros',this.state.startingEuroState);
         await storageSet('PayDay',this.state.paydayState);
         await storageSet('fullDatePayday',this.state.fullDatePaydayState);
         await storageSet('SpentToday',this.state.spentTodayState);
         await storageSet('SpentMonthBeforeToday',this.state.spentMonthState);
         let monies = await this.CalculateEuroPerDay();
         await storageSet('monies',monies);
        //  console.log('HEYOOO'+this.state.euroState)
        //  console.log('HEYOOO'+this.state.savingsState)
        //  console.log('HEYOOO'+this.state.startingEuroState)
        //  console.log('HEYOOO'+this.state.paydayState)
        //  console.log('HEYOOO'+this.state.fullDatePaydayState)
        //  console.log('HEYOOO'+this.state.spentTodayState)
        //  console.log('HEYOOO'+this.state.spentMonthState)

        //  let day = new Date().getDate().toString();
        // let month = (new Date().getMonth()+1).toString();
        // let year = new Date().getFullYear().toString();   
        //  let todayrly = day+month+year;
         let todayrly = new Date().toLocaleDateString();

         await storageSet('today',todayrly);


  }
    async saveAndSetSharedStorage(){

      let value1 = await storageGet('Euros');
      let value2 = await storageGet('monies');
      let value3 = await  storageGet('SpentToday');
      var index = value1.indexOf('.');
       if (index >= 0) {
         value1= (parseFloat(value1).toFixed(2)).toString();
       }
        index = value2.indexOf('.');
       if (index >= 0) {
         value2= (parseFloat(value2).toFixed(2)).toString();
       }
       index = value3.indexOf('.');
       if (index >= 0) {
         value3= (parseFloat(value3).toFixed(2)).toString();
       }
     SharedStorage.set(
       JSON.stringify({text1: this.stringWithCorrectCurrencyPosition(value1) ,text2: this.stringWithCorrectCurrencyPosition(value2)+'/Day' ,text3: this.stringWithCorrectCurrencyPosition(value3)+' spent today' }),
     );
   }
  async CalculateEuroPerDay(){
      const value1 =  await storageGet('Euros');
      const value2 =  await  storageGet('PayDay');
      const value3 = await storageGet('SpentToday');
     // console.log("Payday:"+value2);
     // this.setDebug(value2);
     if(value1 != '' && value2 !='' && value1 != null && value2 !=null){     
       //let today = new Date().getDate();
       let remainingDays = parseInt(value2);
       if(value3 == null || value3==''){
         value3 = '0';
       }
       if(remainingDays <=0){
        remainingDays = 0;
        return (parseFloat(value1) + parseFloat(value3)).toString();
       }
       let moneyPerDay = ((parseFloat(value1) + parseFloat(value3))/remainingDays).toFixed(2);
       if(parseFloat(moneyPerDay) <=0){
        return '0';
      }
      if(parseFloat(moneyPerDay) < parseFloat(value3)){ //an to poso poy soy antistoixei ana imera einai mikrotero apo ayta pou ksodepses simera, return to true budget
        moneyPerDay = (parseFloat(value1)/remainingDays).toFixed(2);
      }
       return moneyPerDay.toString();
     }else{
      return '0';
    }
   }

   CalculateEuroPerDayNotAsync(){
    let value1 =  this.state.euroState;
    let value2 =  this.state.paydayState;
    let value3 = this.state.spentTodayState;
   // console.log("Payday:"+value2);
   // this.setDebug(value2);
   if(value1 != '' && value2 !='' && value1 != null && value2 !=null){     
    //let today = new Date().getDate();
     let remainingDays = parseInt(value2);
     if(value3 == null || value3==''){
      value3 = '0';
    }
     if(remainingDays <=0){
      remainingDays = 0;
      return (parseFloat(value1) + parseFloat(value3)).toString();
     }
     let moneyPerDay = ((parseFloat(value1) + parseFloat(value3))/remainingDays).toFixed(2);
     if(parseFloat(moneyPerDay) <=0){
       return '0';
     }
     if(parseFloat(moneyPerDay) < parseFloat(value3)){ //an to poso poy soy antistoixei ana imera einai mikrotero apo ayta pou ksodepses simera, return to true budget
      moneyPerDay = (parseFloat(value1)/remainingDays).toFixed(2);
    }
     return moneyPerDay.toString();
   }else{
     return '0';
   }
 }
   
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
 
 

// //DE KSERW PWS DOYLEVEI
// const animationEffect = () => {

// useEffect(() => {
//   setInterval(() => {
//     console.log('INTERVAL')
//   }, 3000);
// }, [])
// }

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

 const styles = StyleSheet.create({
  slideFirst: {
    flex: 1,
    
    backgroundColor: '#6fc3c3'
  },
  slideLast: {
    flex: 1,
    backgroundColor: '#fffffd',
    alignItems: 'center',
    justifyContent: 'center',


  },
  slideMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFD'
  },
  swiperText: {
    color: '#000001',
    alignSelf:'center',
    fontSize:22,
    fontWeight:'400'
  },ImageTut:
  {
    height:'80%',width:'100%', alignSelf:'center',resizeMode:'contain'
  },loadingTut:{
    height:'80%',width:'100%', alignSelf:'center'
  },
  scrollViewTut:{
    width:'90%',
    alignSelf:'center',
    elevation:10,
    backgroundColor:'#FFFFFD',
    borderRadius:10,
    paddingHorizontal:20
  },swiperButtonStyle:{
    backgroundColor: 'transparent',
     flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center'
  },
   scrollView: {
     backgroundColor: Colors.lighter,
   },parentView:{
    backgroundColor:'#6fc3c3',

     flex:1,
     
   },
   mainView:{
     borderTopLeftRadius:60,
     overflow: 'hidden',
     backgroundColor:'#FFFFFD',
     flex:1,
     justifyContent:'space-evenly',
     elevation:10

   },
 
   titleImage:{
     width:'100%',
     height:'100%',
     resizeMode:'stretch'
   },
   titleImageWrapper:{
     height:'20%',
     backgroundColor:'#6fc3c3',

  },
   footer:{
    flexDirection:"row",
     flexWrap:"wrap",
     textAlign:'center',
     height:'35%',
    // flexDirection:'row'
    // justifyContent: 'flex-end',
   },footerText:{
    fontSize:30,
    color:'#000000',
    textAlign:'center',

    // flex:1,
    
    
    // flex: 1,
    // justifyContent: 'flex-end',
   },iconStyle: {
    fontSize: 40,
    color: 'black',
    textAlign:'center',

    //  aspectRatio:1
  },iconWrapper: {
    // elevation:5,
   backgroundColor: '#FFFFFD',
   marginLeft:30,
   borderRadius:20,
   marginTop:20

  },
    rowContainer: {
     flexDirection: 'row',
     justifyContent:'space-between',
     padding:20
   },colContainer: {
    flexDirection: 'column',
    flexGrow: 1,            // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },infoWrapper: {
    elevation:10,
    backgroundColor: '#FFFFFD',
    width:'65%',
    borderRadius:20,
      height:'130%',

    // flexDirection:'row'

    
  },calendar: {
    backgroundColor: '#FFFFFD',
    marginTop:deviceHeight/42.5
  },textFaint:{
    marginLeft:15,
    fontSize:15,
    textAlignVertical:'center',
    color:'#b3b3b3',
  },textBold:{
    fontSize:22,
    marginLeft:12,
    textAlignVertical:'center',
    color:'#000001',
  },
   text:{
     fontSize:22,
     marginLeft:0,
     textAlignVertical:'center',
     color:'#000001'

    //  marginVertical:5,
    //  flex:1
   }, buttonText:{
    fontSize:22,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
     marginHorizontal:17,
   //  flex:1
  },
   button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '30%',
    maxHeight:'60%',
    backgroundColor: "#DDDDDD",
    marginVertical:15

    
  
  }, updateButton: {
    backgroundColor: "#DDDDDD",
    height:'13%',
    borderBottomRightRadius:60,
    backgroundColor:'#FFFFFD',
    elevation:10,
  },updateButtonText:{
    fontSize:30,
    textAlign:'center',
    marginTop:10
  },
  buttonArrowText:{
    fontSize:25,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
     marginHorizontal:13,
   //  flex:1
  },tutTouchableOpacity:{
    width:'100%',height:'100%',position:'absolute' , elevation:100,
  },tutView:{
    backgroundColor:'#939393',borderRadius:20, width:'100%',height:'100%' ,position:'absolute'
  },tutText:{
    color:'#000001', top:-40, borderRadius:20, width:'100%',height:'100%' ,position:'absolute',fontSize:15
  },tutViewUpdate:{
    backgroundColor:'#939393',borderBottomRightRadius:60, width:'100%',height:'100%' ,position:'absolute'
  },
 
  tutcontainer:{
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1,            // all the available vertical space will be occupied by it
    justifyContent: 'space-between' // will create the gutter between body and footer
  },
  
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: Colors.white,
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: Colors.black,
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: Colors.dark,
   },
   highlight: {
     fontWeight: '700',
   },
   footerLine:{
     height:'0.7%',
     backgroundColor:'#FFFFFD',
     elevation:9,
     opacity:0.6
   },modalTopBackground:{
      backgroundColor:'#6cc3c3',
      elevation:10,
      height:'100%',
      width:'100%',
      borderRadius:30,
      position: 'absolute',
     

   },modalIconBackground:{
    elevation:12,
    position: 'absolute',
    width:'8%',
    height:'7%'

 },modalBottomBackground:{
    backgroundColor:'#FFFFFD',
    elevation:11,
    height:'90%',
    width:'92%',
    borderRadius:60,
    alignSelf:'center',
    justifyContent:'space-between'

 },modalIconWrapper: {
  borderRadius:15,
  backgroundColor: '#FFFFFD00',
  left:70,
  width:'180%',
  height:'100%',
  alignSelf:'center'

},modalIconStyle: {
  fontSize: 35,
  color: '#000001',
  alignSelf:'center'

  //  aspectRatio:1
},Modal:{
  margin:0,
},coffeeShopModal:{
  margin:0,
  padding:20,
},ModalViewWrapper:{
  flex:1,
},modalMainViewWrapper:{
  marginTop:deviceHeight/21.25,
  flex:1,
  elevation:20,
  margin:20,
},cancelBtn:{
  flex:0.49,backgroundColor:'#62CCFF',
  borderBottomLeftRadius:60
},confirmBtn:{
  flex:0.49,backgroundColor:'#62CCFF',
  borderBottomRightRadius:60
},cancelBtnText:{
  fontSize:26,
  alignSelf:'flex-end',
  marginRight:10

},confirmBtnText:{
  fontSize:26,
  alignSelf: 'flex-start',
  marginLeft:10

},modalMainViewTitle:{
  fontSize:25,
  marginLeft:15,

},modalMainViewSubTitle:{
  fontSize:20,
  marginLeft:15,
  width:'70%',
  alignSelf:'center'

},modalMainViewSubHeader:{
  fontSize:13,
  color:'#D3D3D3',
  marginLeft:20,
  marginTop:20
  
},
modalMainViewSubInfo:{
  fontSize:13,
  color:'#878787',
  
},inputRowContainer: {
  flexDirection: 'row',
  marginLeft:15,
},inputIcon:{
  // borderRadius:10,
  textAlignVertical:'center',
  fontSize:17,
  padding:10
}, input: {
  // borderRadius:10,
},inputContainer:{
  borderWidth: 0.7,
  height:'80%',
  width:'80%',
  borderColor:'#D3D3D3',
  borderTopRightRadius:10,
  borderBottomRightRadius:10,
},iconContainer:{
  borderWidth: 0.7,
  height:'80%',
  borderWidth: 0.7,
  borderColor:'#D3D3D3',
  borderTopLeftRadius:10,
  borderBottomLeftRadius:10,
},twoViewsStartEndContainer:{
  justifyContent:'space-between',
  flexDirection:'row',
  marginTop:20,
  width:'100%'
},BouncyCheckbox:{
  alignSelf:'flex-end',
  
},inputInfoRowContainer:{
  justifyContent:'space-between',
  flexDirection:'row',
  width:'80%',
  marginLeft:20

},inputInfoColContainer:{
  // justifyContent:'space-between',
  // flexDirection:'row',
  width:'80%',
  marginLeft:20

},topLeftButton:{
  position:'absolute',marginTop:deviceHeight/35,marginLeft:deviceWidth/19.635,height:'5%',width:'10%',elevation:100 //, backgroundColor:'#00000088'
},billingWindowStyle:{
  backgroundColor:'#FFFFFD',justifyContent: 'flex-start',alignItems: 'flex-start',   flexDirection: 'column',  borderRadius:10

},barStyle:{
  // position:'relative',top:110,left:27,elevation:101,fontSize:23
  position:'relative',elevation:101,fontSize:25 , alignSelf:'center',marginTop:5 //MARGIN TOP GIA KANEI ALIGN ME TO RIPPLE TOY TOUCHABLE OPACITY

},drawerContainer:{
  flexDirection:'row',flexGrow:1,justifyContent:'flex-start',height:deviceHeight
},drawerMainView:{
  flex:1,justifyContent:'flex-start',width:'45%',backgroundColor:'#FFFFFD'
},drawerExitView:{
  width:'55%'
},ExpensesList:{
  marginTop:10,backgroundColor:'#FFFFFD', height:'55%',elevation:0,borderRadius:20
},drawerButtonText:{
  paddingLeft:5 //gia na min akoympaei sto icon otan de exei xwro
},categoryButton:{
  alignSelf:'center',marginTop:3,textAlignVertical:'center',fontSize:20 , padding :3
},selectedCategoryButton:{
  alignSelf:'center',marginTop:3,textAlignVertical:'center',fontSize:20 ,padding :3, backgroundColor:'#8d8d8d66'
}

   
 });

 export default withIAPContext(App);