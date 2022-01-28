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
   AppState,
   PanResponder,
   KeyboardAvoidingView,
     
 } from 'react-native';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

 import CalendarPicker from 'react-native-calendar-picker';
 import Modal from "react-native-modal";
 import { VictoryPie } from "victory-native";
 import Carousel from 'react-native-snap-carousel';

//  import Spinner from 'react-native-loading-spinner-overlay';
//import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Notif, NotifPerma } from './Notifications';
 import Midnight from 'react-native-midnight';
 import AsyncStorage  from '@react-native-community/async-storage';
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';


import { moduleExpression, stringLiteral, tsParenthesizedType } from '@babel/types';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

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
import { CategoriesSelect } from './CategoriesSelect';
import { ProBanner } from './ProBanner';

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
 import moment from 'moment';
import 'moment/locale/el';  // without this line it didn't work
import 'moment/locale/de' ;
import 'moment/locale/zh-cn';



 import enUS from "./android/app/src/main/assets/translations/en-US.json";
 import enGB from "./android/app/src/main/assets/translations/en-GB.json";
 import en from "./android/app/src/main/assets/translations/en.json";
 import el from "./android/app/src/main/assets/translations/el.json";
 import de from "./android/app/src/main/assets/translations/de.json";
 import zh from "./android/app/src/main/assets/translations/zh.json";

 import currencies from "./android/app/src/main/assets/currencies/currencies.json";

 const availableTranslations = ['en','en-US','en-GB','el','de','zh'];
 I18n.fallbacks = true;
 I18n.defaultLocale = 'en';
 I18n.translations = {
    en,
    enUS,
    enGB,
    el,
    de,
    zh
 };
 //END LOCALIZATION
 const SharedStorage = NativeModules.SharedStorage;
//  const [index, setIndex] = useState(() => 0);

//  const [date, setDate] = useState(new Date()) ; 
//  const [open, setOpen] = useState(false);
let permaNotificationGoAway = false;
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
let setPointerEventsOfDesc = 'none';
let selectedLocale ='';
let refCurrency = '';
let refMinDate = new Date();
let refExpensesHistoryJson = '';
let refspentMonthHistory ='';
let refSavingsData ='';
let refFixedCostsData ='';
let refIncomesData='';
let categoryNames = [];
let categoryIcons = [];
let colorPallete = ["#6dc3c3", "#57797b", "#2a3a4a", "#7ce4ec", "#02273d","#a1acac","#346464","#A3ddff"];

let positionYRef = 0; //for scrolling drawer

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
    //SET MOMENT LOCALE
    var momLocale = I18n.locale;
    if(I18n.locale.length>2){
      momLocale = momLocale[0] + momLocale[1]; // an einai en-US krata to en 
    }
    if(momLocale == 'zh')//special case
    {
      momLocale = 'zh-cn';
    }
    moment.locale(momLocale); 
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
   _drawerScrollRef;
   _textInputRefs : Array = [];
   _descRef = null;
   _expensesPieRef;
   _pastExpensesCarousel;
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
       openCategoriesSelect:false,
       openSettings:false,
       isEditingEuroState:false,
       areAdsRemoved:'false',
       isPro :'false',
       daysPassed:0,
       stopShowingPromptToRate:'false',
       dataSource : "",
       dataSourcePerDay : "",
       dataSourceSavings: "",
       dataSourceFixedCosts: "",
       dataSourceIncomes:"",
       markedDates: {},
       appState: AppState.currentState,
       selectedCategoryBtn:0,
       savingsValues : [],
       fixedCostsValues : [],
       fixedCostsDateValues : [],
       incomesValues : [],
       incomesDateValues : [],
       shouldShowFixedCosts : false,
       shouldShowIncomes : false,
       expensesPieData: [],
       triggerAnimationPie:false
      // expensesPieDataLabels:[]





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
    //await storageSet('IncomesAndCostsJson','');

    //AsyncStorage.clear();
    //await storageSet('Currency','');
    //this.setState({ debug: "debug" }) ;
     //await storageSet('RemovedAds','false');
    // const latestVersion = await VersionCheck.getLatestVersion()     
         //await storageSet('IsPro','false');
    
    permaNotificationGoAway = (await storageGet('GoAway') == 'true');

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
     let value11 = JSON.parse(await storageGet('DataSourceSavings'));
     let value12 = JSON.parse(await storageGet('DataSourceFixedCosts'));
     this.state.shouldShowFixedCosts = (value12 == null ? false :!(Object.keys(value12).length ==0) )
     let value13 = JSON.parse(await storageGet('DataSourceIncomes'));
     this.state.shouldShowIncomes = (value13 == null ? false :!(Object.keys(value13).length ==0) )
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
     //CHECK IF DAY CHANGED
     if(today != todayrly){
       console.log("DAY DCHANGED ON INIT");
        await this.DayChanged(todayrly);
        value6 = await  storageGet('SpentMonthBeforeToday'); // ksanapairnoyme to value6
        value3 = '0';
        value9 = await this.fetchJsonExpenses(); // ksanapairnoyme to value9
        value2 = await storageGet('PayDay'); //to theloyme pali
        value5 = await storageGet('fullDatePayday'); //pali
        value7 = await this.CalculateEuroPerDay();//allakse i mera

        // check ta DataSourceIncomes kai DataSourceFixedCosts
        var oldMonth = moment(new Date(today).valueOf()).toDate();
        var thisMonth = moment(new Date(todayrly).valueOf()).toDate();
        var thisMonthDays = moment(new Date(todayrly).valueOf()).daysInMonth();
        let monthDiff = thisMonth.getMonth() - oldMonth.getMonth() + (12 * (thisMonth.getFullYear() - oldMonth.getFullYear()));
        console.log(monthDiff);
        var json13 =value13; //incomes POINTER , epeidh einai json object
        var json12 =value12; //fixedcosts POINTER
        //anti gia to payDayFromString thelw to Day apo to DataSourceIncomes
        if (monthDiff > 0){//allakse o minas prepei na ginoyn shouldUpdate ola
          console.log('ALLAKSE O MINAS, UPDATE OLA')
          if(json13 != null){ //INCOMES
            var retObj =await this.updatePastMonthData(json13,thisMonth,value1);
            json13 = retObj.json;
            value1 = retObj.returnValue;          
            //console.log(refIncomesData)
          }
          if(json12 != null){ //FIXED COSTS
            var retObj =await this.updatePastMonthData(json12,thisMonth,value1);
            json12 = retObj.json;
            value1 = retObj.returnValue;          
           // console.log(refFixedCostsData)
          }
        }
        if(json13 != null){
          var retObj2 =await this.checkForBalanceUpdates(json13,thisMonthDays,value1);
          json13 = retObj2.json;
          value1 = retObj2.returnValue;
          //refIncomesData = JSON.stringify(json13);
          await storageSet('DataSourceIncomes',JSON.stringify(json13))
          await storageSet('Euros',value1);
          value13 = json13;
          //console.log(refIncomesData)

        }
        if(json12!=null){
          var retObj2 = await this.checkForBalanceUpdates(json12,thisMonthDays,value1);
          json12 = retObj2.json;
          value1 = retObj2.returnValue;
          //refFixedCostsData = JSON.stringify(json12);
          await storageSet('DataSourceFixedCosts',JSON.stringify(json12))
          await storageSet('Euros',value1);
          value12 = json12;
          //console.log(refFixedCostsData)

        }
        
       
       

     }else{
      //
      
     }

     let _areAdsRemoved = await storageGet('RemovedAds');
     let _isPro = await storageGet('IsPro');
     let _daysPassed =parseInt( await storageGet('DaysPassed'));
     let _stopShowingPromptToRate = await storageGet('stopShowingPromptToRate');
     //ena modal k einai ok to prompt to rate
     
     console.log('ARE ADS REMOVE'+_areAdsRemoved)
     this.setState({shouldShowFixedCosts:this.state.shouldShowFixedCosts,shouldShowIncomes:this.state.shouldShowIncomes,markedDates:_markedDates,dataSourceSavings:value11,dataSourceFixedCosts:value12,dataSourceIncomes:value13,dataSourcePerDay:null,dataSource:value9,savingsState:value8,isEditingEuroState:false,newSpent:'0',openSettings:false,openCurrencySelect:false,openCategoriesSelect:false,openLanguageSelect:false,openCoffeeShop:false,removeAdsShop:false,closeModal1:false,closeModal2:false,closeModal3:false,moniesState:value7,spentMonthState: value6,fullDatePaydayState:value5, startingEuroState: value4 ,euroState: value1, paydayState: value2,spentTodayState: value3 , open: false ,cardTutorial:cardTutorial,tutorialViewd:tut,idOfTutToShow:0 , xPx:0,yPx:0,buttonModal1:false,buttonModal2:false,buttonModal3:false,areAdsRemoved:_areAdsRemoved,isPro:_isPro,daysPassed:_daysPassed,stopShowingPromptToRate:_stopShowingPromptToRate, swiperIndex:0,selectedCategoryBtn:0,tutorialText:I18n.t('TutorialText1')}) ;
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
    categoryIcons[0] = await storageGet('categoryIcon0');
    categoryNames[0] = await storageGet('categoryName0');
    categoryIcons[1] = await storageGet('categoryIcon1');
    categoryNames[1] = await storageGet('categoryName1');
    categoryIcons[2] = await storageGet('categoryIcon2');
    categoryNames[2] = await storageGet('categoryName2');
    categoryIcons[3] = await storageGet('categoryIcon3');
    categoryNames[3] = await storageGet('categoryName3');
    categoryIcons[4] = await storageGet('categoryIcon4');
    categoryNames[4] = await storageGet('categoryName4');
    categoryIcons[5] = await storageGet('categoryIcon5');
    categoryNames[5] = await storageGet('categoryName5');
    categoryIcons[6] = await storageGet('categoryIcon6');
    categoryNames[6] = await storageGet('categoryName6');
    categoryIcons[7] = await storageGet('categoryIcon7');
    categoryNames[7] = await storageGet('categoryName7');

    


    this.isLoading();
    this.allLoaded();
     
    
     // this.state.euroState = value1;
     // this.state.paydayState;
   }
   async updatePastMonthData(json,thisMonth : Date,returnValue){
    for(var i=0; i< Object.keys(json).length; i++){
      let dayOfEntry = json[i].Day;
      if(dayOfEntry == '0'){
        continue;
      }
        //na dw posoi mines perasan gia na to prosthesw toses fores
      var lastUpdatedDate = moment(new Date(json[i].lastUpdated+'-01').valueOf()).toDate();
      let monthDiff2 = thisMonth.getMonth() - lastUpdatedDate.getMonth() + (12 * (thisMonth.getFullYear() - lastUpdatedDate.getFullYear()));
      while (monthDiff2>1){
        //json13[i].Amount = (parseFloat(json13[i].Amount) + 10).toString();
        //edit to returnValue
        //check to json[i].Type
        console.log('UPDATE TO POSO gia past month TYPE = '+ json[i].Type)
        json[i].lastUpdated =  moment(new Date()).subtract(monthDiff2 -1,'month').format('YYYY-MM'); //ayto gia na apothikeytei i swsti imerominia sto IncomesAndCostsJson
        returnValue =await this.actuallyUpdateCurrentBalance(json,returnValue,i);
        monthDiff2 = monthDiff2 - 1 ;
      }
      json[i].lastUpdated =  moment(new Date()).subtract(1,'month').format('YYYY-MM');
      json[i].shouldUpdate = true;                             
    }
    return {json:json , returnValue:returnValue};
   }
   async checkForBalanceUpdates(json,thisMonthDays,returnValue){
    for(var i=0; i< Object.keys(json).length; i++){       
      let dayOfEntry = json[i].Day;
      if(dayOfEntry == '0'){
        continue;
      }
      while(parseInt(dayOfEntry) >parseInt(thisMonthDays)){ //ayto edw an o minas den exei 31 meres 
        dayOfEntry = parseInt(dayOfEntry) -1;
        console.log('remove one')
      }
      dayOfEntry = dayOfEntry.toString().length == 1 ?'0'+dayOfEntry:dayOfEntry; //prosthiki tou 0 an einai monopsifios
      if(json[i].shouldUpdate && new Date(moment(new Date()).format('YYYY-MM')+'-'+dayOfEntry) <= new Date()){           
        console.log('THISD IS DAY OF ENTRY: '+dayOfEntry);
        json[i].lastUpdated =  moment(new Date()).format('YYYY-MM');
        json[i].shouldUpdate = false;
        console.log('UPDATE TO POSO TYPE = '+ json[i].Type)
        returnValue = await this.actuallyUpdateCurrentBalance(json,returnValue,i);
        //check to json[i].Type
        //json13[i].Amount = (parseFloat(json13[i].Amount) + 10).toString();
         //molis teliwsw refIncomesData = JSON.stringify(json);
       
      } 
      //check edw an to day exei perasei
      //an nai na dw sto json thn eggrafi, an exei idi ginei remove
      //prepei na valw sto json aythn thn eggrafi, px. AlreadyRemoved : true
      // na vlepw an exoyn perasei k mines
    }
    return {json:json , returnValue:returnValue};
   }
   /** 
   *kanei handle kai to fixedCosts kai to Income kai epistrefei to tropopoihmeno ypoloipo
   */
   async actuallyUpdateCurrentBalance(json,returnValue,i){
     //kaloume thn   async saveExpensesToStorage(){
      // afoy thesoyme to this.state.newspent = 'json[i].Amount' kai afairw kai to amount apo to return value kai this.state.selectedCategoryBtn = 4
      //meta ta kanw '0' kai 0 (den xreiazetai ginetai meta sto setState apo ekei poy exoyn klhthei)
      // this.state.newSpent = this.getStringNumberWithCorrectDecimals((json[i].Amount).toString());
      // this.state.selectedCategoryBtn = 4;
      // this.saveExpensesToStorage();
      //ALLAGI SXEDIWN , (oi 3 parapanw grames doylevoyn bebaia, to vazoyn sto swsto day), basika mpainei sto day poy anoigeis tin efarmogi, opote as min ginei etsi
      //apla tha to afairw, kai isws deixnw to history sto sygkekrimeno tab, gia na min ginetai mperdema
    if(json[i].Type == 'FixedCosts'){
      returnValue = this.getStringNumberWithCorrectDecimals((parseFloat(returnValue) - parseFloat(json[i].Amount)).toString())
    }
    if(json[i].Type == 'Incomes'){
      //add to json[i].Amount sto returnvalue
      returnValue = this.getStringNumberWithCorrectDecimals((parseFloat(returnValue) + parseFloat(json[i].Amount)).toString())
    }
    // ta apo katw einai idia kai gia Incomes kai gia FixedCosts
    var dayToSave =  moment(json[i].lastUpdated+'-'+json[i].Day).format('YYYY-MM-DD'); //to last updated einai o twrinos minas (exei ginei pio prin), opote afairw enan mina gia na paw sto proigoymeno
    var jsonEntryToSave = this.jsonifyInputFieldForSaving(json[i].Amount,json[i].Type,json[i].Description,json[i].Number,dayToSave); 
    console.log(jsonEntryToSave)
    var incomesAndCostsJson = await storageGet('IncomesAndCostsJson');
    if(incomesAndCostsJson =='' || incomesAndCostsJson == null){
      incomesAndCostsJson = '[]';
    } 
    var addComma = ',';
    if(incomesAndCostsJson == '[]'){
      addComma = '';
    }
    incomesAndCostsJson = incomesAndCostsJson.substring(0,incomesAndCostsJson.length-1) +addComma+jsonEntryToSave +']';
    await storageSet('IncomesAndCostsJson',incomesAndCostsJson);
    console.log('THIS IS INCOMES AND COSTS SAVED')
    console.log(incomesAndCostsJson)
    return returnValue;
   } 
   async fetchJsonExpenses(){
    var json = await storageGet('SpentTodayJson');
    if(json ==null ){
      json = '[]';
    }
    return JSON.parse(json);
   }
   onDateChange(passedDate,calledFromMonthChange : Boolean) {
  //  let date = moment(MomentDate).toDate();
    console.log(passedDate)
    let date = new Date(passedDate.dateString)
    let today = new Date();
    console.log(date)
    console.log(today)
    if(date<today && today.toDateString() != date.toDateString()){
     //alert("dont set date in the past pls"); 
     //edw tha deixnoyme dedomena gia past dates
     this._pastExpensesCarousel?.snapToItem(0,true,true);//an einai sto pie chart, na pigenei sto allo view tou carousel
     let _markedDates2 = {};
     _markedDates2 = this.getMarkedDates(this.state.fullDatePaydayState,moment(date).format('YYYY-MM-DD'));
     let selectedDaysData = this.getSelectedDaysExpenseData(moment(date).format('YYYY-MM-DD'));
     let _selectedDayExpensesString = moment(date).format('YYYY-MM-DD');
     this.setState({markedDates:_markedDates2,dataSourcePerDay : selectedDaysData, selectedDayExpensesString:_selectedDayExpensesString,expensesPieData:this.resetPieDataFrom(this.state.dataSourcePerDay)});
     return;
    }
  this.state.fullDatePaydayState = passedDate.dateString;
  var a = moment(passedDate.dateString);
  var b = moment(moment(new Date()).format("YYYY-MM-DD")); 
  //Difference in number of days
  console.log('dif '+a.diff(b, 'days')  ) ;
  this.state.paydayState = (a.diff(b, 'days')).toString() ;
  console.log(this.state.paydayState);
  if(!calledFromMonthChange){
  storageSet('OverflowPayDay',passedDate.day.toString());
  }


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
    console.log(refExpensesHistoryJson);
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
        let dateFrom = new Date(savedToday);
        let dateTo = new Date();
        let monthDiff = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
        //enimerwsi payday
        let paydayString = await storageGet('fullDatePayday');
        var a = moment(paydayString);
        var b = moment(moment(new Date()).format("YYYY-MM-DD"));         
        //Difference in number of days
        console.log('dif '+a.diff(b, 'days')  ) ;
        this.state.paydayState = (a.diff(b, 'days')).toString() ;
        //this.state.paydayState = (parseInt(payday) - 30*monthDiff).toString();
        //allagi edw
        console.log(paydayString)
        if(this.state.paydayState<0){
          let checkBool = moment(paydayString).add(monthDiff, 'month') < moment(new Date())
          var nextMonthStr  = moment(paydayString).add(checkBool?monthDiff+1:monthDiff, 'month').format('YYYY-MM-DD');
          var nextMonthDays = moment(nextMonthStr).daysInMonth();
          var payDayFromString = parseInt(paydayString.split('-')[2]);
          var checkForOldPayDay = await storageGet('OverflowPayDay');
          console.log(checkForOldPayDay + 'FOUNDS')
          if(checkForOldPayDay != null){ //check gia devices poy kanane update
            payDayFromString = parseInt(checkForOldPayDay);
          }
          while(payDayFromString >nextMonthDays){
            payDayFromString = payDayFromString -1;
            console.log('remove one')
          }
          //this.state.paydayState = payDayFromString;
          console.log('THIS IS IT ' +nextMonthStr.split('-')[0]+'-'+nextMonthStr.split('-')[1] + '-'+payDayFromString)//'prepei na mpei sto px sto 2022-01-31'
          var datetopass = {
            "dateString" : nextMonthStr.split('-')[0]+'-'+nextMonthStr.split('-')[1] + '-'+payDayFromString ,
            "day":payDayFromString
          }
          this.onDateChange(datetopass,true);
          await storageSet('fullDatePayday',this.state.fullDatePaydayState); //apo to onDateChange exei setaristei, to idio kai to PayDay, alla to kanw set apo katw outws i allws
          //await this.saveData();
        }
        await storageSet('PayDay',this.state.paydayState);

        
        
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
    let today = await storageGet('today');
    // let todayrly = day+month+year;
    await this.DayChanged(todayrly);
    let value1 = await storageGet('SpentMonthBeforeToday');
    let value9 = await this.fetchJsonExpenses(); // ksanapairnoyme to value9
    let value7 = await this.CalculateEuroPerDay();
    let value2 = await storageGet('PayDay'); //to theloyme pali
    let value12 = JSON.parse(await storageGet('DataSourceFixedCosts'));
    let value13 = JSON.parse(await storageGet('DataSourceIncomes'));
    // check ta DataSourceIncomes kai DataSourceFixedCosts
    var oldMonth = moment(new Date(today).valueOf()).toDate();
    var thisMonth = moment(new Date(todayrly).valueOf()).toDate();
    var thisMonthDays = moment(new Date(todayrly).valueOf()).daysInMonth();
    let monthDiff = thisMonth.getMonth() - oldMonth.getMonth() + (12 * (thisMonth.getFullYear() - oldMonth.getFullYear()));
    console.log(monthDiff);
    var json13 =value13; //incomes POINTER , epeidh einai json object
    var json12 =value12; //fixedcosts POINTER
    //anti gia to payDayFromString thelw to Day apo to DataSourceIncomes
    if (monthDiff > 0){//allakse o minas prepei na ginoyn shouldUpdate ola
      console.log('ALLAKSE O MINAS, UPDATE OLA')
      if(json13 != null){ //INCOMES
        var retObj = await this.updatePastMonthData(json13,thisMonth,value1);
        json13 = retObj.json;
        value1 = retObj.returnValue;          
        console.log(refIncomesData)
      }
      if(json12 != null){ //FIXED COSTS
        var retObj = await this.updatePastMonthData(json12,thisMonth,value1);
        json12 = retObj.json;
        value1 = retObj.returnValue;          
        console.log(refFixedCostsData)
      }
    }
    if(json13 != null){
      var retObj2 =await this.checkForBalanceUpdates(json13,thisMonthDays,value1);
      json13 = retObj2.json;
      value1 = retObj2.returnValue;
      refIncomesData = JSON.stringify(json13);
      await storageSet('DataSourceIncomes',refIncomesData)
      await storageSet('Euros',value1);
      value13 = json13;
      console.log(refIncomesData)

    }
    if(json12!=null){
      var retObj2 =await this.checkForBalanceUpdates(json12,thisMonthDays,value1);
      json12 = retObj2.json;
      value1 = retObj2.returnValue;
      refFixedCostsData = JSON.stringify(json12);
      await storageSet('DataSourceFixedCosts',refFixedCostsData)
      await storageSet('Euros',value1);
      value12 = json12;
      console.log(refFixedCostsData)
    }
    this.setState({selectedCategoryBtn:0,newSpent:'0',shouldShowFixedCosts:this.state.shouldShowFixedCosts,shouldShowIncomes:this.state.shouldShowIncomes,spentMonthState:value1, spentTodayState:'0' , dataSource:value9,moniesState:value7, paydayState:value2,euroState:this.state.euroState});

  }
  /**
   * a kai b,  einai moment objects
   * 
   * kai gyrnaei number
   */
  getDiffInDays(a,b){       
      diff = (a.diff(b, 'days')) ;    
      console.log('diffff = '+diff)
      return diff;
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
  //   //PushNotification.localNotificationSchedule(Notif());
   
     if(nextAppState=='active'){//ayta ta egrapsa egw
      console.log('App has come to the foreground!');
      PushNotification.cancelAllLocalNotifications();
      
     }
     else if (nextAppState =='background'){ //ayta ta egrapsa egw
        console.log('App has gone to background!');
        //let date = new Date();
        //date.setDate(date.getDate() + parseInt(this.state.paydayState));
        //console.log('THIS IS DAY'+ new Date(Date.now() + parseInt(this.state.paydayState)*3600 * 1000 * 24))
        if(this.state.startingEuroState != '' && this.state.euroState !='' && this.state.startingEuroState != null && this.state.euroState !=null){
          if((parseFloat(this.state.euroState))*100/(parseFloat(this.state.startingEuroState)) <= 10){
            //console.log('AHELOHELHEOHEL');
            PushNotification.localNotificationSchedule(Notif("1","","Balance is low","Your balance is lower than 10%","Be careful not to run out!",3600 * 1000 * 24,1,"day"));
          }
        }
        if(this.state.paydayState != '' && this.state.paydayState != null && this.state.paydayState!=0){          
         PushNotification.localNotificationSchedule(Notif("2","","Payday","It's your payday!","Open the app to update your balance",parseInt(this.state.paydayState)*3600 * 1000 * 24,1,"month"));  
        }
        let jsonIncomes = this.state.dataSourceIncomes;
        if(jsonIncomes!=null){
          for(var i=0; i< Object.keys(jsonIncomes).length; i++){
            let dayOfEntry = jsonIncomes[i].Day.toString().length == 1 ?'0'+jsonIncomes[i].Day:jsonIncomes[i].Day; //prosthiki tou 0 an einai monopsifios
            var diff = 0;
            if(new Date().getDate() < parseInt(jsonIncomes[i].Day)){
              diff = this.getDiffInDays(moment(moment(new Date()).format("YYYY-MM")+'-'+dayOfEntry),moment(moment(new Date()).format("YYYY-MM-DD")));
            }
            if(new Date().getDate() >= parseInt(jsonIncomes[i].Day)){
              diff = this.getDiffInDays(moment(moment(new Date()).add(1,"month").format("YYYY-MM")+'-'+dayOfEntry),moment(moment(new Date()).format("YYYY-MM-DD")));
            }          
            PushNotification.localNotificationSchedule(Notif("Incomes"+jsonIncomes[i].Number,"","Income added","Income with description: '"+ jsonIncomes[i].Description+"' added.","Amount added "+this.stringWithCorrectCurrencyPosition(jsonIncomes[i].Amount)+". Open the app to see more details",diff*3600 * 1000 * 24,1,"month"));
          }
        }
        let jsonFixedCosts = this.state.dataSourceFixedCosts;
        if(jsonFixedCosts!=null){
          for(var i=0; i< Object.keys(jsonFixedCosts).length; i++){
            let dayOfEntry = jsonFixedCosts[i].Day.toString().length == 1 ?'0'+jsonFixedCosts[i].Day:jsonFixedCosts[i].Day; //prosthiki tou 0 an einai monopsifios
            var diff = 0;
            if(new Date().getDate() < parseInt(jsonFixedCosts[i].Day)){
              diff = this.getDiffInDays(moment(moment(new Date()).format("YYYY-MM")+'-'+dayOfEntry),moment(moment(new Date()).format("YYYY-MM-DD")));
            }
            if(new Date().getDate() >= parseInt(jsonFixedCosts[i].Day)){
              diff = this.getDiffInDays(moment(moment(new Date()).add(1,"month").format("YYYY-MM")+'-'+dayOfEntry),moment(moment(new Date()).format("YYYY-MM-DD")));
            }  
            PushNotification.localNotificationSchedule(Notif("FixedCosts"+jsonFixedCosts[i].Number,"","Fixed cost paid","Fixed cost with description: '"+ jsonFixedCosts[i].Description+"' paid.","Amount paid "+this.stringWithCorrectCurrencyPosition(jsonFixedCosts[i].Amount)+". Open the app to see more details",diff*3600 * 1000 * 24,1,"month"));
          }
             
          }
          console.log(permaNotificationGoAway)
          if(!permaNotificationGoAway && parseFloat(this.getRemainingToday()) <0){
            PushNotification.localNotification(NotifPerma());
          }
       }
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') { //ayto to brika etoimo
      this.setState({hideThisAd1:false,hideThisAd2:false,hideThisAd3:false,hideThisAd4:false});

    }
    this.setState({appState: nextAppState});
  }
  createNotificationChannel(channelId : string, channelName:string ,channelDescription:string){
    PushNotification.channelExists(channelId, (exists)=>{
      if(!exists){
        PushNotification.createChannel(
          {
            channelId: channelId, // (required)
            channelName: channelName, // (required)
            channelDescription: channelDescription, // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }
    }) 
  }
  deleteNotificationChannel(channelId : string){
    PushNotification.deleteChannel(channelId);
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
              {I18n.locale.includes('de') &&
              <Image  style={{height:'35%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-DE.png')}/>}
              {I18n.locale.includes('zh') &&
              <Image  style={{height:'35%',width:'100%', resizeMode:'stretch'}} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-ZH.png')}/>}
              {!I18n.locale.includes('el') && !I18n.locale.includes('de') && !I18n.locale.includes('zh') &&
              <Image  style={{height:'35%',width:'100%', resizeMode:'stretch'}}  source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EN.png')}/>}
              <View>
              <Text style={[styles.swiperText,{paddingVertical:30,elevation:10,borderRadius:30,backgroundColor:'#FFFFFD',paddingHorizontal:20,fontSize:30,fontWeight:'bold'}]}>{I18n.t("SwiperTutorial0")}</Text>
              <Text style={{fontSize:10,alignSelf:'center', fontStyle:'italic',color:'#FFFFFD99'}}>{I18n.t("InternetConnectionRequired")}</Text>
              </View>
              </View>
            </View>
            <View style={styles.slideMain}>
              <Image  onLoad={ () => this.setState({ isImageLoaded1: true }) } style={[styles.ImageTut, { display: (this.state.isImageLoaded1 ? 'flex' : 'none') }]}
                source={{uri:'https://media.giphy.com/media/0TbyHGgC4nDz8BcVLX/giphy.gif'}} />
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
                source={{uri:'https://media.giphy.com/media/xtnUal2T6VqZjxgUs4/giphy.gif'}} />
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
                source={{uri:'https://media.giphy.com/media/ENx4dpyfDPHHuBJct2/giphy.gif'}} />
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
                source={{uri:'https://media.giphy.com/media/uTqatneIHjxK5VmfM3/giphy.gif'}}  />
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
                source={{uri:'https://media.giphy.com/media/7DWX67MjlRxVC4rZ7u/giphy.gif'}}  />
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
               source={{uri:'https://media.giphy.com/media/AME94xJYs9UWHrISjw/giphy.gif'}}   />
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
               source={{uri:'https://media.giphy.com/media/b0xLGGUX2gNvVQtCnj/giphy.gif'}}  />
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
          <TouchableOpacity onPress={()=> this._swiperRef.scrollBy(-8,true)} style={{flex:0.49,backgroundColor:'#62CCFF',borderRadius:15, height:'100%'}}><Text style={{fontSize:20, alignSelf:'center',paddingHorizontal:5}}>{I18n.t("SwiperTutorial10")}</Text></TouchableOpacity>
          }
          {this.state.swiperIndex==8 &&
          <TouchableOpacity onPress={async ()=> await this.setCardTutorial('true')} style={{flex:0.49,backgroundColor:'#62CCFF',borderRadius:15, height:'100%'}}><Text style={{fontSize:20, alignSelf:'center',paddingHorizontal:5}}>{I18n.t("SwiperTutorial9")}</Text></TouchableOpacity>
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
           {I18n.locale.includes('el') &&
           <Image  style={styles.titleImage} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-EL.png')}/>}
           {I18n.locale.includes('de') &&
           <Image  style={styles.titleImage} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-DE.png')}/>}
           {I18n.locale.includes('zh') &&
           <Image  style={styles.titleImage} source={require('./android/app/src/main/assets/playstoregraphics/FeatureGraphic-ZH.png')}/>}
           {!I18n.locale.includes('el') && !I18n.locale.includes('de') && !I18n.locale.includes('zh') &&
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
         { parseFloat(this.state.euroState) <0 &&
         <Text style={[styles.textBold,{color:'#FF2D00DD'}]}>{I18n.t('Balance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
         }
         { (parseFloat(this.state.euroState) >=0 || this.state.euroState == null)&&
         <Text style={styles.textBold}>{I18n.t('Balance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
         }   
         <Text style={styles.textFaint}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
         { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowIncomes )&&
         <Text style={styles.textFaint}>{I18n.t('BalanceAfterIncomes')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterIncomesAdded())}</Text>
         }
         { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowFixedCosts )&&
         <Text style={styles.textFaint}>{I18n.t('BalanceAfterFixedCosts')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterFixedCostsRemoved())}</Text>
         }
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
            defaultValue={this.getEuroStateWithCorrectDecimals()}
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
        { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowIncomes )&&
         <Text style={styles.modalMainViewSubInfo}>{I18n.t('BalanceAfterIncomes')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterIncomesAdded())}</Text>
         }
         { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowFixedCosts )&&
         <Text style={styles.modalMainViewSubInfo}>{I18n.t('BalanceAfterFixedCosts')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterFixedCostsRemoved())}</Text>
         }
        </View>
        {/* <View style={styles.twoViewsStartEndContainer}>
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
        } */}
        
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
            <Carousel
              ref={(c) => { this._pastExpensesCarousel = c; }}
              data={[0,1]} //index = 0 gia tta data, 1 = gia to pie
              // data={[0]} //index = 0 gia tta data, 1 = gia to pie
              renderItem={this.renderPastExpensesAndPieForCarousel}
              horizontal={true}
              sliderWidth={deviceWidth*0.7}
              itemWidth={deviceWidth*0.7}
              enableMomentum = {true}

              onBeforeSnapToItem = {(index) => {
                if(index ==0){
                  this.setState({expensesPieData:this.resetPieDataFrom(this.state.dataSourcePerDay),
                    triggerAnimationPie:false
                });
                }
                if(index ==1){
                  this.setState({expensesPieData:this.setPieDataFrom(this.state.dataSourcePerDay),
                    triggerAnimationPie:true
                     
                });
                }
              }}
            />
        {/* { this.state.dataSourcePerDay.map((item) => (
              <View style={[styles.rowContainer,{paddingHorizontal:10,justifyContent:'space-between'}]}>
              <View style={{width:'40%',alignSelf:'flex-start', flexDirection:'row'}}>
                 <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1 , textAlignVertical:'center'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
                 {item.Category ==0 && 
                      <FontAwesome
                      style={{alignSelf:'flex-end',marginBottom:2}}
                       
                      icon={parseIconFromClassName(categoryIcons[0] != null?categoryIcons[0]:'fas fa-wallet')}
                      />
                      }
                      {item.Category ==1 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[1] != null?categoryIcons[1]:'fas fa-coffee')}
                        />
                      }{item.Category ==2 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[2] != null?categoryIcons[2]:'fas fa-utensils')}
                        />
                      }{item.Category ==3 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[3] != null?categoryIcons[3]:'fas fa-shopping-cart')}
                        />
                      }
                      {item.Category ==4 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[4] != null?categoryIcons[4]:'fas fa-money-check-alt')}
                        />
                      }{item.Category ==5 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[5] != null?categoryIcons[5]:'fas fa-tshirt')}
                        />
                      }{item.Category ==6 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[6] != null?categoryIcons[6]:'fas fa-gas-pump')}
                        />
                      }{item.Category ==7 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[7] != null?categoryIcons[7]:'fas fa-bus')}
                        />
                      }
               </View>
          <View style={{width:'40%',alignSelf:'flex-end', flexDirection:'row'}}>
          <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1}]}></Text>
          <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-end'}]}>{item.Time}</Text>
               
         </View>
       </View>  
            ))} */}
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
            <Text style={styles.textBold}>{this.stringWithCorrectCurrencyPosition(this.CalculateEuroPerDayNotAsync())} {I18n.t('PerDay')}</Text>
            }
            {parseFloat(this.getRemainingToday()) <0 &&
            <Text style={[styles.textBold,{color:'#FF2D00DD'}]}>{this.stringWithCorrectCurrencyPosition(this.CalculateEuroPerDayNotAsync())} {I18n.t('PerDay')}</Text>
            }
            <Text style={styles.textFaint}>{I18n.t('SpentToday')} {this.stringWithCorrectCurrencyPosition(this.getSpentTodayStateWithCorrectDecimals())}</Text> 
            { parseFloat(this.getRemainingToday()) <0 &&
            <Text style={[styles.textFaint,{color:'#FF2D00DD'}]}>{I18n.t('AmountOver')} {this.stringWithCorrectCurrencyPosition(this.getRemainingToday().replace('-',''))}</Text>
            }
            { parseFloat(this.getRemainingToday()) >=0 &&
            <Text style={styles.textFaint}>{I18n.t('RemainingMonies')} {this.stringWithCorrectCurrencyPosition(this.getRemainingToday())}</Text>
            }
         <Modal useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.Modal} coverScreen={true} animationIn = {'fadeIn'} animationOut={'fadeOut'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.buttonModal3} 
         onModalShow={()=>{console.log('HAHA')}}>
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
        <ScrollView style={{marginHorizontal:15, paddingVertical:10,flex:1}} horizontal={true} contentContainerStyle={{justifyContent:'space-between',flex:1}}>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:0})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=0 && styles.categoryButton,this.state.selectedCategoryBtn == 0 && styles.selectedCategoryButton]}
           
                 icon={parseIconFromClassName(categoryIcons[0] != null?categoryIcons[0]:'fas fa-wallet')}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:1})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=1 && styles.categoryButton,this.state.selectedCategoryBtn == 1 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[1] != null?categoryIcons[1]:'fas fa-coffee')}
                  />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:2})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=2 && styles.categoryButton,this.state.selectedCategoryBtn == 2 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[2] != null?categoryIcons[2]:'fas fa-utensils')}
               />
           </TouchableOpacity>           
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:3})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=3 && styles.categoryButton,this.state.selectedCategoryBtn == 3 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[3] != null?categoryIcons[3]:'fas fa-shopping-cart')}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:4})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=4 && styles.categoryButton,this.state.selectedCategoryBtn == 4 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[4] != null?categoryIcons[4]:'fas fa-money-check-alt')}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:5})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=5 && styles.categoryButton,this.state.selectedCategoryBtn == 5 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[6] != null?categoryIcons[6]:'fas fa-tshirt')}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:6})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=6 && styles.categoryButton,this.state.selectedCategoryBtn == 6 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[7] != null?categoryIcons[7]:'fas fa-gas-pump')}
               />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.setState({selectedCategoryBtn:7})}>
               <FontAwesome
                  style={[this.state.selectedCategoryBtn !=7 && styles.categoryButton,this.state.selectedCategoryBtn == 7 && styles.selectedCategoryButton]}
           
                  icon={parseIconFromClassName(categoryIcons[5] != null?categoryIcons[5]:'fas fa-bus')}
               />
           </TouchableOpacity>
        </ScrollView>
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
        <Carousel
              //ref={(c) => { this._carousel = c; }}
              data={[0,1]} //index = 0 gia tta data, 1 = gia to pie
              // data={[0]} //index = 0 gia tta data, 1 = gia to pie
              renderItem={this.renderExpensesAndPieForCarousel}
              shouldCo
              horizontal={true}
              sliderWidth={deviceWidth*0.7}
              itemWidth={deviceWidth*0.7}
              enableMomentum = {true}
              onTouchStart={()=>this.setState({triggerAnimationPie:true})} //hack gia na min kolaei to modal
              
              onBeforeSnapToItem = {(index) => {
                if(index ==0){
                  this.setState({expensesPieData:this.resetPieDataFrom(this.state.dataSource),
                    triggerAnimationPie:false
                });
                }
                if(index ==1){
                  this.setState({expensesPieData:this.setPieDataFrom(this.state.dataSource),
                    triggerAnimationPie:true
                     
                });
                }
              }}
            />
                  
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
              <TouchableOpacity style={{width:'30%',flexShrink:1}} onPress={async () => await this.stopShowingPrompt()}><Text  style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>I have already rated</Text></TouchableOpacity>
              <Text style={{width:'30%'}}></Text>
              <TouchableOpacity style={{width:'20%',flexShrink:1}} onPress={() => this.setState({daysPassed:0})}><Text style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>Maybe later</Text></TouchableOpacity>
              <TouchableOpacity style={{width:'20%',flexShrink:1}} onPress={()=>this.takeUserToRate()}><Text style={{fontSize:17,color:'#6cc3c3',textAlign:'center'}}>Yes please!</Text></TouchableOpacity>


      
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
   
 async closeCoffeeShop(){
   let _isPro = await storageGet('IsPro');
   let _areAdsRemoved = await storageGet('RemovedAds');
  this.setState({openCoffeeShop:false,isPro:_isPro,areAdsRemoved : _areAdsRemoved});
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
checkInputText(text){
  let newText = '';
  let numbers = '0123456789';
  for (var i=0; i < text.length; i++) {
    if(numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i];
    }
    else {
        // your call back function
        //alert("please enter numbers only");
        if(!(newText.includes('-') || newText.includes('+'))){

         if(text[i]=='-'){
           //text[i]=='.';
           newText = newText + '-';
          
         }
         if(!newText.includes('.')){

           if(text[i]==',' || text[i]=='.'){
             //text[i]=='.';
             newText = newText + '.';
            
           }
          }
        }else if(newText.charAt(newText.length-1) == '-'){
          if(text[i] == '-'){
            newText = newText.replace('-','+')
          }
          

          
        }else{
          //allow second dot
          let char = '';
          if(newText.includes('-')){
            char = '-';
          }
          if(newText.includes('+')){
            char = '+';
          }
          if(newText.split(char)[0].includes('.')){ //to prwto exei decimal
            if(!(newText.split('.').length-1>=2)){

              if(text[i]==',' || text[i]=='.'){
                //text[i]=='.';
                newText = newText + '.';
               
              }
             }
          }else{ //den exei decimal point
            if(!(newText.split('.').length-1>=1)){

              if(text[i]==',' || text[i]=='.'){
                //text[i]=='.';
                newText = newText + '.';
               
              }
             }
          }
                       
        }
        if(!newText.includes('+')){
          if(text[i]=='+'){
            newText = newText + '+';

          }
        }                       
    }
}
if(newText=='.' || newText=='-' || newText=='+'){
 newText = '0';
}

return newText;
}
checkIfAddOrSubNeeded(text: string){
  if(text.includes('-')){
    let strArr = text.split('-');
    if(strArr[1] == ''){ //an exei kati toy styl 10- hh' 10+, to xwrize se pinaka ['10','']
      strArr[1] ='0';
    }
    if(strArr[0].split('.')[1]?.length>0)
    {
      strArr[0] = (parseFloat(strArr[0]).toFixed(2)).toString();
    }
    if(strArr[1].split('.')[1]?.length>0)
    {
      strArr[1] = (parseFloat(strArr[1]).toFixed(2)).toString();
    }
    let newNo = (parseFloat(strArr[0]) - parseFloat(strArr[1])).toString();
    if(newNo.split('.')[1]?.length>0)
    {
      newNo = (parseFloat(newNo).toFixed(2)).toString();
    }
    if(parseFloat(newNo)<0){
      Alert.alert(I18n.t("Error"),I18n.t("ResultOfSubNegative"));
      return '0';
    }
    return newNo;
  }
  if(text.includes('+')){
    let strArr = text.split('+');
    if(strArr[1] == ''){ //an exei kati toy styl 10- hh' 10+, to xwrize se pinaka ['10','']
      strArr[1] ='0';
    }
    if(strArr[0].split('.')[1]?.length>0)
    {
      strArr[0] = (parseFloat(strArr[0]).toFixed(2)).toString();
    }
    if(strArr[1].split('.')[1]?.length>0)
    {
      strArr[1] = (parseFloat(strArr[1]).toFixed(2)).toString();
    }
    let newNo = (parseFloat(strArr[0]) + parseFloat(strArr[1])).toString();
    if(newNo.split('.')[1]?.length>0)
    {
      newNo = (parseFloat(newNo).toFixed(2)).toString();
    }
    if(parseFloat(newNo)<0){
      Alert.alert(I18n.t("Error"),I18n.t("ResultOfSubNegative"));
      return '0';
    }
    return newNo;
  }
  return text;
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

  var monthViewd = month.year +'-'+(month.month.toString().length == 1 ?'0'+month.month:month.month); //ayto epeidh ta months me ena psifio einai px. 3 kai oxi 03
  if((monthViewd == moment(new Date()).format("YYYY-MM"))){ // an o minas einai o twrinos
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
handleScroll (event){
 //const positionX = event.nativeEvent.contentOffset.x;
  positionYRef = event.nativeEvent.contentOffset.y;
  //console.log(positionYRef);
};
renderPastExpensesAndPieForCarousel = ({item, index}) => {
  if(index == 0){
    return (
      this.state.dataSourcePerDay.map((item) => (
        <View style={[styles.rowContainer,{paddingHorizontal:10,justifyContent:'space-between'}]}>
        <View style={{width:'40%',alignSelf:'flex-start', flexDirection:'row'}}>
           <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1 , textAlignVertical:'center'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
           {item.Category ==0 && 
                <FontAwesome
                style={{alignSelf:'flex-end',marginBottom:2}}
                 
                icon={parseIconFromClassName(categoryIcons[0] != null?categoryIcons[0]:'fas fa-wallet')}
                />
                }
                {item.Category ==1 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[1] != null?categoryIcons[1]:'fas fa-coffee')}
                  />
                }{item.Category ==2 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[2] != null?categoryIcons[2]:'fas fa-utensils')}
                  />
                }{item.Category ==3 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[3] != null?categoryIcons[3]:'fas fa-shopping-cart')}
                  />
                }
                {item.Category ==4 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[4] != null?categoryIcons[4]:'fas fa-money-check-alt')}
                  />
                }{item.Category ==5 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[5] != null?categoryIcons[5]:'fas fa-tshirt')}
                  />
                }{item.Category ==6 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[6] != null?categoryIcons[6]:'fas fa-gas-pump')}
                  />
                }{item.Category ==7 && 
                  <FontAwesome
                  style={{alignSelf:'flex-end',marginBottom:2}}
            
                  icon={parseIconFromClassName(categoryIcons[7] != null?categoryIcons[7]:'fas fa-bus')}
                  />
                }
         </View>
    <View style={{width:'40%',alignSelf:'flex-end', flexDirection:'row'}}>
    <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1}]}></Text>
    <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-end'}]}>{item.Time}</Text>
         
   </View>
 </View>
            ))
      )
    
  }else if(index == 1){
    return (
      <View style={{marginTop:-80,marginLeft:-15}}>
      <VictoryPie
     // ref={(c) => { this._expensesPieRef = c; }}
      labelPlacement={"perpendicular"}
      labelRadius={({ innerRadius }) => innerRadius + deviceHeight/23 }
      data={this.state.expensesPieData}
      colorScale={colorPallete}
      //labels={this.state.expensesPieDataLabels}
      // animate={({ delay :0, easing: 'exp' ,duration:0})}
      animate={(this.state.triggerAnimationPie?{ delay :0, easing: 'exp', duration:1100 }:{ delay :0, easing: 'exp', duration:0 })}
      width={deviceWidth*0.8}
      innerRadius={70}
      style={{
        data: {
          opacity: ({ datum }) => datum.opacity
        },
        labels: {
          opacity: ({ datum }) => datum.opacity,
          fontSize: 13,
        },
        parent:{
          marginTop:40
        }
      }}
      ></VictoryPie>
      </View>
  );
  }
  
}
renderExpensesAndPieForCarousel = ({item, index}) => {
  if(index == 0){
    return (
       this.state.dataSource.map((item) => (     
      <View style={[styles.rowContainer,{paddingHorizontal:10,justifyContent:'space-between'}]}>
               <View style={{width:'40%',alignSelf:'flex-start', flexDirection:'row'}}>
                      <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1 , textAlignVertical:'center'}]}>{this.stringWithCorrectCurrencyPosition(item.Amount)}</Text>
                      {item.Category ==0 && 
                      <FontAwesome
                      style={{alignSelf:'flex-end',marginBottom:2}}
                       
                      icon={parseIconFromClassName(categoryIcons[0] != null?categoryIcons[0]:'fas fa-wallet')}
                      />
                      }
                      {item.Category ==1 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[1] != null?categoryIcons[1]:'fas fa-coffee')}
                        />
                      }{item.Category ==2 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[2] != null?categoryIcons[2]:'fas fa-utensils')}
                        />
                      }{item.Category ==3 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[3] != null?categoryIcons[3]:'fas fa-shopping-cart')}
                        />
                      }
                      {item.Category ==4 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[4] != null?categoryIcons[4]:'fas fa-money-check-alt')}
                        />
                      }{item.Category ==5 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[5] != null?categoryIcons[5]:'fas fa-tshirt')}
                        />
                      }{item.Category ==6 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[6] != null?categoryIcons[6]:'fas fa-gas-pump')}
                        />
                      }{item.Category ==7 && 
                        <FontAwesome
                        style={{alignSelf:'flex-end',marginBottom:2}}
                  
                        icon={parseIconFromClassName(categoryIcons[7] != null?categoryIcons[7]:'fas fa-bus')}
                        />
                      }
               </View>
               <View style={{width:'40%',alignSelf:'flex-end', flexDirection:'row'}}>
               <Text style={[styles.textFaint,{marginLeft:0,fontStyle:'italic',alignSelf:'flex-start',flex:1}]}>{item.Time}</Text>
                    <TouchableOpacity onPress={async ()=>this.deleteExpense(item)}>
                        <FontAwesome
                            style={{alignSelf:'flex-end',marginTop:3,flex:1}}
                    
                          icon={RegularIcons.trashAlt}
                        />
                    </TouchableOpacity>
              </View>
            </View>
            ))
    )
  }else if(index == 1 && this.state.triggerAnimationPie) {
    return (
      <View style={{marginTop:-80,marginLeft:-15}}>
      <VictoryPie
     // ref={(c) => { this._expensesPieRef = c; }}
      labelPlacement={"perpendicular"}
      labelRadius={({ innerRadius }) => innerRadius + deviceHeight/23 }
      data={this.state.expensesPieData}
      colorScale={colorPallete}
      //labels={this.state.expensesPieDataLabels}
      // animate={({ delay :0, easing: 'exp' ,duration:0})}
      animate={(this.state.triggerAnimationPie?{ delay :0, easing: 'exp', duration:1100 }:{ delay :0, easing: 'exp', duration:0 })}
      width={deviceWidth*0.8}
      innerRadius={70}
      style={{
        data: {
          opacity: ({ datum }) => datum.opacity
        },
        labels: {
          opacity: ({ datum }) => datum.opacity,
          fontSize: 13,
        },
        parent:{
          marginTop:40
        }
      }}
      ></VictoryPie>
      </View>
  );
  }
  
}
resetPieDataFrom(data){
  //return [{ y: 0 , opacity:0 , label:"General"}, { y: 0, opacity:0,label:"Food" }, { y: 100, opacity:0,label:"Gas" }]
  console.log(this._expensesPieRef)
  console.log(data)
  let defaultLabels =[I18n.t('DefaultCategoryName0'),I18n.t('DefaultCategoryName1'),I18n.t('DefaultCategoryName2'),I18n.t('DefaultCategoryName3'),I18n.t('DefaultCategoryName4'),I18n.t('DefaultCategoryName5'),I18n.t('DefaultCategoryName6'),I18n.t('DefaultCategoryName7')];
  let groupedData = [{Amount:0,label:categoryNames[0] != null ?categoryNames[0]:defaultLabels[0]},
                    {Amount:0,label:categoryNames[1] != null ?categoryNames[1]:defaultLabels[1]},
                    {Amount:0,label:categoryNames[2] != null ?categoryNames[2]:defaultLabels[2]},
                    {Amount:0,label:categoryNames[3] != null ?categoryNames[3]:defaultLabels[3]},
                    {Amount:0,label:categoryNames[4] != null ?categoryNames[4]:defaultLabels[4]},
                    {Amount:0,label:categoryNames[5] != null ?categoryNames[5]:defaultLabels[5]},
                    {Amount:0,label:categoryNames[6] != null ?categoryNames[6]:defaultLabels[6]},
                    {Amount:0,label:categoryNames[7] != null ?categoryNames[7]:defaultLabels[7]}

];
  // for(var i=0;i<data.length;i++){
  //   groupedData[data[i].Category].Amount += parseFloat(data[i].Amount);
  // }
  console.log(groupedData)
  let x = groupedData.map((item) => ( {y:0, label:item.Amount == 0?" ":item.label ,  opacity:0}  ))
  x[x.length-1].y = 100;
  return x;
}
setPieDataFrom(data){
  //console.log(object)
  let defaultLabels =[I18n.t('DefaultCategoryName0'),I18n.t('DefaultCategoryName1'),I18n.t('DefaultCategoryName2'),I18n.t('DefaultCategoryName3'),I18n.t('DefaultCategoryName4'),I18n.t('DefaultCategoryName5'),I18n.t('DefaultCategoryName6'),I18n.t('DefaultCategoryName7')];
  let groupedData = [{Amount:0,label:categoryNames[0] != null ?categoryNames[0]:defaultLabels[0]},
                    {Amount:0,label:categoryNames[1] != null ?categoryNames[1]:defaultLabels[1]},
                    {Amount:0,label:categoryNames[2] != null ?categoryNames[2]:defaultLabels[2]},
                    {Amount:0,label:categoryNames[3] != null ?categoryNames[3]:defaultLabels[3]},
                    {Amount:0,label:categoryNames[4] != null ?categoryNames[4]:defaultLabels[4]},
                    {Amount:0,label:categoryNames[5] != null ?categoryNames[5]:defaultLabels[5]},
                    {Amount:0,label:categoryNames[6] != null ?categoryNames[6]:defaultLabels[6]},
                    {Amount:0,label:categoryNames[7] != null ?categoryNames[7]:defaultLabels[7]}

];
  for(var i=0;i<data.length;i++){
    groupedData[data[i].Category].Amount += parseFloat(data[i].Amount);
  }
  let totalAmount = 0;
  for(var i=0;i<groupedData.length;i++){
     totalAmount+= parseFloat(groupedData[i].Amount);
  }
  let x = groupedData.map((item) => ( {y:item.Amount, label:item.Amount == 0?" ":item.label+"\n"+(item.Amount*100/totalAmount).toFixed(0)+"%",  opacity:1}  ))
  return x;
}
   settingsMenuContent = () => {
     
    return (
      <View style={{flex:1}}>
      <View style={styles.drawerContainer}>
      <View style={styles.drawerMainView}>        
        <Text style={{fontWeight:'600',fontSize:20,color:'#3d3d3d',height:'10%',alignSelf:'center',textAlignVertical:'bottom'}}>{I18n.t("AppName")}</Text>
        <Text style={{fontWeight:'300',fontSize:15,color:'#8d8d8d',alignSelf:'center',textAlignVertical:'bottom',alignSelf:'center'}}>{I18n.t("AppSubName")}</Text>
        <View style={styles.footerLine}/>
        <ScrollView ref={ref => {this._drawerScrollRef = ref}} onScroll={(e) => this.handleScroll(e)}  scrollEventThrottle={16} onTouchStart={e=> {this.touchY = e.nativeEvent.pageY
        this.startTime = e.nativeEvent.timestamp}}
        
        onTouchMove={e => {
                  if (this.touchY - e.nativeEvent.pageY > 20 || this.touchY - e.nativeEvent.pageY < -20){
                    //console.log('Swiped up MOVE')
                    //console.log(this._drawerScrollRef)
                    this._drawerScrollRef.scrollTo({ x: 0, y: positionYRef+(0.1*(this.touchY - e.nativeEvent.pageY)) , animated: false })
                  }
                  
                    
                }}
                onTouchEnd={e => {
                  
                  
                  //console.log(e.nativeEvent.timestamp - this.startTime);
                  //console.log(this.touchYend);
                  if ((this.touchY - e.nativeEvent.pageY > 100 ||  this.touchY - e.nativeEvent.pageY < -100) && (e.nativeEvent.timestamp - this.startTime)<130){
                    console.log('Swiped up END')
                    //console.log(this.touchY - e.nativeEvent.pageY)
                    this._drawerScrollRef.scrollTo({ x: 0, y: positionYRef+((this.touchY - e.nativeEvent.pageY)*2) , animated: true })
                  }
                    //ΤTODO 
                    //NA DW AN EXEI GRIGORO SWIPE, KAI NA TOY KANW KI ALLO SCROLL

                    
                }}>
          <View >
          <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <ProBanner  isPro={this.state.isPro}></ProBanner>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.handHoldingUsd}/>
        <TouchableOpacity  onPress={()=>this.openIncomesView()} >
            <Text style={styles.drawerButtonText}>{I18n.t("IncomesHeader")}</Text>
          </TouchableOpacity>
          <Modal  onBackdropPress={async ()=> await this.closeIncomesView()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openIncomesView}> 
          <KeyboardAvoidingView
          behavior='position'
          enabled>
          <View style={[styles.billingWindowStyle,{justifyContent:'space-around'}]}>
            <FontAwesome style={[styles.iconStyle,{position:'absolute',right:26}]} icon={SolidIcons.handHoldingUsd}/>
            <Text style={styles.sideWindowTextBold}>{I18n.t("IncomesHeader")}</Text>
            <Text style={styles.sideWindowTextFaint}>{I18n.t('SetYourIncomes')}</Text>                  
            {this.state.euroState == '' || this.state.euroState == null &&
              <Text style={styles.modalMainViewSubHeader}>{I18n.t('SetBalanceFirst')}</Text>        
            }
            {this.state.dataSourceIncomes!=null && this.state.dataSourceIncomes.length !=0 && this.state.euroState != '' && this.state.euroState != null &&
                <ScrollView style={styles.scrollViewManagerStyle}>                  
                { this.state.dataSourceIncomes.map((item) => (
                <View>
                <View style={styles.viewManagerStyle}>
                <View style={styles.rowContainerManager}>                  
                  {/* <View>
                  <Button onPress={()=>this.setState({showDatePicker:item.Number})} title="Show time picker!" />
                  </View>
                  {(this.state.showDatePicker == item.Number) && (
                    <DateTimePicker
                      value={this._datePickerValues[item.Number]!=undefined ? this._datePickerValues[item.Number]:new Date()}
                      mode='date'
                      is24Hour={true}
                      display='default'
                      onChange={(event, selectedDate) => this.datePickedIncomesView(event,selectedDate,item.Number)}
                    />
                  )} */}
                  <Text numberOfLines={1} style={styles.dayTextLabel}>{I18n.t('EveryLabel')}</Text>
                  <Picker
                    style = {styles.dayPicker}                 
                    selectedValue={this.state.incomesDateValues[item.Number]!=undefined ? this.state.incomesDateValues[item.Number]:item.Day}
                    onValueChange={(itemValue, itemIndex) => this.datePickedIncomesView(itemIndex,item.Number)
                    }>
                    <Picker.Item style ={styles.dayPickerItem}  label="..." value={0} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,1)).format('Do')} value={1} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,2)).format('Do')} value={2} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,3)).format('Do')} value={3} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,4)).format('Do')} value={4} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,5)).format('Do')} value={5} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,6)).format('Do')} value={6} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,7)).format('Do')} value={7} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,8)).format('Do')} value={8} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,9)).format('Do')} value={9} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,10)).format('Do')} value={10} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,11)).format('Do')} value={11} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,12)).format('Do')} value={12} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,13)).format('Do')} value={13} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,14)).format('Do')} value={14} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,15)).format('Do')} value={15} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,16)).format('Do')} value={16} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,17)).format('Do')} value={17} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,18)).format('Do')} value={18} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,19)).format('Do')} value={19} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,20)).format('Do')} value={20} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,21)).format('Do')} value={21} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,22)).format('Do')} value={22} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,23)).format('Do')} value={23} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,24)).format('Do')} value={24} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,25)).format('Do')} value={25} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,26)).format('Do')} value={26} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,27)).format('Do')} value={27} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,28)).format('Do')} value={28} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,29)).format('Do')} value={29} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,30)).format('Do')} value={30} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,31)).format('Do')} value={31} />
                  </Picker>
                </View>
                <View style={styles.rowContainerManager}>                  
                  <Text numberOfLines={1} style={styles.dayTextLabel}>{I18n.t('RecieveLabel')}</Text>
                  <View style={[styles.inputRowContainer,{marginLeft:30}]}>
                    <View style={styles.iconContainer}>
                    <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
                    </View>
                    <View style={[styles.inputContainer,{width:'60%'}]}>
                    <TextInput 
                        style={styles.input}
                        keyboardType='numeric'
                        defaultValue={item.Amount}
                        maxLength={10}  //setting limit of input
                        onChangeText={(text)=> this.onChangeGenericIncomes(text,item.Number)}
                        onEndEditing={()=>this.onEndEditGenericIncomes(item.Number)}
                        value={this.state.incomesValues[item.Number]}


                    />
                    </View>                              
                  </View>
                </View>
                  <View style={[styles.rowContainer,{paddingVertical:0,paddingHorizontal:20}]}>
                    <View style={styles.descriptionInputContainer} 
                    >

                    <TextInput
                      style={styles.descriptionInput}
                      maxLength={30}
                      defaultValue={item.Description}
                      ref={ref => {this._textInputRefs[item.Number] = ref}} 
                      onChangeText={(text)=> this.onChangeGenericIncomesDescription(text)}
                      onEndEditing={()=>this.onEndEditGenericIncomesDescription(item.Number)}
                      placeholder={I18n.t('DefaultDescription')}
                      
                    />
                    </View>
                    <TouchableOpacity onPress={()=>this._textInputRefs[item.Number].focus()}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.deleteIncomesField(item.Number)}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.trash}></FontAwesome>
                    </TouchableOpacity>
                  </View>  
                  </View>
                  <Text></Text>
                  </View>               
                         
                ))
                }
                </ScrollView>
              }
              <View style={styles.rowContainer}>
              <View  style={styles.inputInfoColContainer}>
              
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('CurrentBalance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
              }
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
              }
              { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowIncomes )&&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('BalanceAfterIncomes')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterIncomesAdded())}</Text>
              }           
              </View>
              { this.state.euroState != null && this.state.euroState != '' &&
              <TouchableOpacity onPress={async ()=>await this.createEmptyIncomesField()}>           
              <FontAwesome style={{textAlign:'auto',paddingHorizontal:5,fontSize:35,color:'#000001'}} icon={SolidIcons.plusCircle}></FontAwesome>
              </TouchableOpacity>
              }
              </View>        
          </View>
          </KeyboardAvoidingView>
        </Modal>
        
        </View>
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <ProBanner isPro={this.state.isPro}></ProBanner>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.fileInvoiceDollar}/>
        <TouchableOpacity  onPress={async ()=> await this.openFixedCostsView()} >
            <Text style={styles.drawerButtonText}>{I18n.t("FixedCostsHeader")}</Text>
          </TouchableOpacity> 
          <Modal  onBackdropPress={async ()=> await this.closeFixedCostsView()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openFixedCostsView}> 
          <KeyboardAvoidingView
          behavior='position'
          enabled>
          <View style={[styles.billingWindowStyle,{justifyContent:'space-around'}]}>
            <FontAwesome style={[styles.iconStyle,{position:'absolute',right:26}]} icon={SolidIcons.fileInvoiceDollar}/>
            <Text style={styles.sideWindowTextBold}>{I18n.t("FixedCostsHeader")}</Text>
            <Text style={styles.sideWindowTextFaint}>{I18n.t('SetYourFixedCosts')}</Text>                  
            {this.state.euroState == '' || this.state.euroState == null &&
              <Text style={styles.modalMainViewSubHeader}>{I18n.t('SetBalanceFirst')}</Text>        
            }
            {this.state.dataSourceFixedCosts!=null && this.state.dataSourceFixedCosts.length !=0 && this.state.euroState != '' && this.state.euroState != null &&
                <ScrollView style={styles.scrollViewManagerStyle}>                  
                { this.state.dataSourceFixedCosts.map((item) => (
                <View>
                <View style={styles.viewManagerStyle}>
                <View style={styles.rowContainerManager}>                  
                  {/* <View>
                  <Button onPress={()=>this.setState({showDatePicker:item.Number})} title="Show time picker!" />
                  </View>
                  {(this.state.showDatePicker == item.Number) && (
                    <DateTimePicker
                      value={this._datePickerValues[item.Number]!=undefined ? this._datePickerValues[item.Number]:new Date()}
                      mode='date'
                      is24Hour={true}
                      display='default'
                      onChange={(event, selectedDate) => this.datePickedFixedCostsView(event,selectedDate,item.Number)}
                    />
                  )} */}
                  <Text numberOfLines={1} style={styles.dayTextLabel}>{I18n.t('EveryLabel')}</Text>
                  <Picker
                    style = {styles.dayPicker}
                                   
                    selectedValue={this.state.fixedCostsDateValues[item.Number]!=undefined ? this.state.fixedCostsDateValues[item.Number]:item.Day}
                    onValueChange={(itemValue, itemIndex) => this.datePickedFixedCostsView(itemIndex,item.Number)
                    }>
                    <Picker.Item style ={styles.dayPickerItem}  label="..." value={0} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,1)).format('Do')} value={1} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,2)).format('Do')} value={2} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,3)).format('Do')} value={3} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,4)).format('Do')} value={4} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,5)).format('Do')} value={5} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,6)).format('Do')} value={6} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,7)).format('Do')} value={7} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,8)).format('Do')} value={8} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,9)).format('Do')} value={9} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,10)).format('Do')} value={10} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,11)).format('Do')} value={11} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,12)).format('Do')} value={12} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,13)).format('Do')} value={13} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,14)).format('Do')} value={14} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,15)).format('Do')} value={15} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,16)).format('Do')} value={16} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,17)).format('Do')} value={17} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,18)).format('Do')} value={18} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,19)).format('Do')} value={19} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,20)).format('Do')} value={20} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,21)).format('Do')} value={21} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,22)).format('Do')} value={22} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,23)).format('Do')} value={23} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,24)).format('Do')} value={24} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,25)).format('Do')} value={25} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,26)).format('Do')} value={26} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,27)).format('Do')} value={27} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,28)).format('Do')} value={28} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,29)).format('Do')} value={29} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,30)).format('Do')} value={30} />
                    <Picker.Item style ={styles.dayPickerItem} label={moment(new Date(1970,0,31)).format('Do')} value={31} />
                  </Picker>
                </View>
                <View style={styles.rowContainerManager}>                  
                  <Text numberOfLines={1} style={styles.dayTextLabel}>{I18n.t('PayLabel')}</Text>
                  <View style={[styles.inputRowContainer,{marginLeft:30}]}>
                    <View style={styles.iconContainer}>
                    <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
                    </View>
                    <View style={[styles.inputContainer,{width:'60%'}]}>
                    <TextInput 
                        style={styles.input}
                        keyboardType='numeric'
                        defaultValue={item.Amount}
                        maxLength={10}  //setting limit of input
                        onChangeText={(text)=> this.onChangeGenericFixedCosts(text,item.Number)}
                        onEndEditing={()=>this.onEndEditGenericFixedCosts(item.Number)}
                        value={this.state.fixedCostsValues[item.Number]}


                    />
                    </View>                              
                  </View>
                </View>
                  <View style={[styles.rowContainer,{paddingVertical:0,paddingHorizontal:20}]}>
                    <View style={styles.descriptionInputContainer} 
                    >

                    <TextInput
                      style={styles.descriptionInput}
                      maxLength={30}
                      defaultValue={item.Description}
                      ref={ref => {this._textInputRefs[item.Number] = ref}} 
                      onChangeText={(text)=> this.onChangeGenericFixedCostsDescription(text)}
                      onEndEditing={()=>this.onEndEditGenericFixedCostsDescription(item.Number)}
                      placeholder={I18n.t('DefaultDescription')}
                      
                    />
                    </View>
                    <TouchableOpacity onPress={()=>this._textInputRefs[item.Number].focus()}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.deleteFixedCostsField(item.Number)}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.trash}></FontAwesome>
                    </TouchableOpacity>
                  </View>  
                  </View>
                  <Text></Text>
                  </View>               
                         
                ))
                }
                </ScrollView>
              }
              <View style={styles.rowContainer}>
              <View  style={styles.inputInfoColContainer}>            
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('CurrentBalance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
              }
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
              }
              { (parseFloat(this.state.euroState) >=0 && this.state.shouldShowFixedCosts )&&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('BalanceAfterFixedCosts')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateAfterFixedCostsRemoved())}</Text>
              }
              </View>
              { this.state.euroState != null && this.state.euroState != '' &&
              <TouchableOpacity onPress={async ()=>await this.createEmptyFixedCostsField()}>
              <FontAwesome style={{textAlign:'auto',paddingHorizontal:5,fontSize:35,color:'#000001'}} icon={SolidIcons.plusCircle}></FontAwesome>
              </TouchableOpacity>
              }
              </View>        
          </View>
          </KeyboardAvoidingView>
        </Modal>
        
        </View>
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <ProBanner isPro={this.state.isPro}></ProBanner>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.piggyBank}/>
        <TouchableOpacity  onPress={async ()=> await this.openSavingsView()} >
            <Text style={styles.drawerButtonText}>{I18n.t("SavingsHeader")}</Text>
          </TouchableOpacity>        
          <Modal  onBackdropPress={async ()=> await this.closeSavingsView()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openSavingsView}> 
          <KeyboardAvoidingView
          behavior='position'
          enabled>
            <View style={[styles.billingWindowStyle,{justifyContent:'space-around'}]}>
            <FontAwesome style={[styles.iconStyle,{position:'absolute',right:20}]} icon={SolidIcons.piggyBank}/>
            <Text style={styles.sideWindowTextBold}>{I18n.t("SavingsHeader")}</Text>
            <Text style={styles.sideWindowTextFaint}>{I18n.t('SetYourSavingsBalances')}</Text>
              {this.state.euroState == '' || this.state.euroState == null &&
              <Text style={styles.modalMainViewSubHeader}>{I18n.t('SetBalanceFirst')}</Text>        
              }
              
              {this.state.dataSourceSavings!=null && this.state.dataSourceSavings.length !=0 && this.state.euroState != '' && this.state.euroState != null &&
                <ScrollView style={styles.scrollViewManagerStyle}>
                    {/* <Text>timestamp</Text>
                    <Text>amount</Text>
                    <Text>delete button</Text>     */}  
                    {/* <FlatList style={styles.ExpensesList}
                      data={this.state.dataSource}
                      renderItem={this.renderExpensesJsonList}
                    /> */}
                    
                { this.state.dataSourceSavings.map((item) => (
                  <View>
                  <View style={styles.viewManagerStyle}>
                  <Text style={[styles.modalMainViewSubHeader,{marginTop:5}]}>{I18n.t('SavingsAmount')}</Text>        
                  
                  <View style={styles.inputRowContainer}>
                  <View style={styles.iconContainer}>
                  <FontAwesome style={styles.inputIcon} icon={this.correctFontAwesomeCurrencyIcon()}/>
                  </View>
                  <View style={styles.inputContainer}>
                  <TextInput 
                      style={styles.input}
                      keyboardType='numeric'
                      // onChangeText={(text)=> this.onChanged1Savings(text)}
                      defaultValue={item.Amount}
                     //value={this.state.savingsState}
                      //onTouchStart={()=>this.startEdit1Savings()}
                      maxLength={10}  //setting limit of input
                     // onEndEditing={()=>this.endEdit1Savings()}
                      // onTouchStart={()=>this.startEdit1()}
                      onChangeText={(text)=> this.onChangeGenericSavings(text,item.Number)}
                      onEndEditing={()=>this.onEndEditGenericSavings(item.Number)}
                      value={this.state.savingsValues[item.Number]}


                  />
                  </View>                              
                  </View>
                  <View style={[styles.rowContainer,{paddingVertical:0,paddingHorizontal:20}]}>
                    <View style={styles.descriptionInputContainer} 
                    //pointerEvents={setPointerEventsOfDesc}
                    >

                    <TextInput
                      style={styles.descriptionInput}
                      maxLength={30}
                      defaultValue={item.Description}
                     // onFocus={()=>this.setTouchOfDescriptionInput(true)}                     
                      ref={ref => {this._textInputRefs[item.Number] = ref}} 
                      onChangeText={(text)=> this.onChangeGenericSavingsDescription(text)}
                      onEndEditing={()=>this.onEndEditGenericSavingsDescription(item.Number)}
                      placeholder={I18n.t('DefaultDescription')}
                      
                    />
                    </View>
                    <TouchableOpacity onPress={()=>this._textInputRefs[item.Number].focus()}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.edit}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.deleteSavingsField(item.Number)}>
                    <FontAwesome style={styles.editIcon} icon={SolidIcons.trash}></FontAwesome>
                    </TouchableOpacity>
                  </View>  
                  </View>
                  <Text></Text>
                  </View>
                
                ))}
                </ScrollView>
              }
              <View style={styles.rowContainer}>
              <View  style={styles.inputInfoColContainer}>
              {/* {(this.state.euroState!='' && this.state.euroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('ConfiguredBalance')} {this.stringWithCorrectCurrencyPosition(this.getAdditionOfTwoFloats(parseFloat(this.state.euroState),(parseFloat(this.state.savingsState)-this.getNewSavingsAmountFloat())))}</Text>
              } */}
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('CurrentBalance')} {this.stringWithCorrectCurrencyPosition(this.getEuroStateWithCorrectDecimals())}</Text>
              }
              {(this.state.startingEuroState!='' && this.state.startingEuroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('StartingBalance')} {this.stringWithCorrectCurrencyPosition(this.getStartingEuroStateWithCorrectDecimals())}</Text>
              }
              {(this.state.euroState!='' && this.state.euroState!=null)  &&
              <Text style={styles.modalMainViewSubInfo}>{I18n.t('SavingsBalance')} {this.stringWithCorrectCurrencyPosition(this.getNewSavingsAmountFloat())}</Text>
              }
              </View>
              { this.state.euroState != null && this.state.euroState != '' &&
              <TouchableOpacity onPress={async ()=>await this.createEmptySavingsField()}>
              <FontAwesome style={{textAlign:'auto',paddingHorizontal:5,fontSize:35,color:'#000001'}} icon={SolidIcons.plusCircle}></FontAwesome>
              </TouchableOpacity>
              }
              </View>
                  
          </View>
          </KeyboardAvoidingView>
        </Modal>
        
        </View>
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
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <ProBanner isPro={this.state.isPro}></ProBanner>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.database}/>
        <TouchableOpacity  onPress={()=>this.setState({openCategoriesSelect:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("ChangeCategories")}</Text>
          </TouchableOpacity>
          <Modal  onBackdropPress={async ()=> await this.refreshCategoryIcons()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openCategoriesSelect}> 
            <View style={styles.billingWindowStyle}>
          <CategoriesSelect categoryNameChangeCallback={(i,categoryName)=>this.changeNameOfCategory(i,categoryName)} callback={()=>this.buyProVersionPrompt()} isPro={this.state.isPro} changeCategories={this.changeCategories} categoryIcon0={categoryIcons[0]} categoryIcon1={categoryIcons[1]}categoryIcon2={categoryIcons[2]}categoryIcon3={categoryIcons[3]}categoryIcon4={categoryIcons[4]}categoryIcon5={categoryIcons[5]}categoryIcon6={categoryIcons[6]}categoryIcon7={categoryIcons[7]} 
          categoryName0={categoryNames[0]} categoryName1={categoryNames[1]}categoryName2={categoryNames[2]}categoryName3={categoryNames[3]}categoryName4={categoryNames[4]}categoryName5={categoryNames[5]}categoryName6={categoryNames[6]}categoryName7={categoryNames[7]}
          />
          <Modal onBackdropPress={(async ()=> await this.refreshCategoryIconsWithoutClosing())} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openChangeNameOfCategory}> 
          <View style={[styles.billingWindowStyle]}>
            <Text style={[styles.textBold,{marginLeft:0,alignSelf:'center',fontStyle:'italic'}]}>{I18n.t('ChangeNameOfCategoryTitle')} {this.state.changeCategoryNameNo}</Text>
            <Text></Text>
            <View style={[styles.inputRowContainer , {borderColor:'#8d8d8d88',borderWidth:1,width:'90%',borderRadius:10}]}>
            <TextInput 
            placeholder={this.state.changeCategoryName}
            onChangeText={(text)=>this.onChangeNameOfCategory(text)}
            onEndEditing={async ()=> await this.setNameOfCategory()}
            ></TextInput>
            </View>
            <Text></Text>
          </View>
          </Modal>
          </View>
        </Modal>
        </View>
        { false && //hidden for now
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <ProBanner isPro={this.state.isPro}></ProBanner>
         <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.commentDots}/>
        <TouchableOpacity  onPress={()=>this.setState({openVoiceCommandsView:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("VoiceCommandsHeader")}</Text>
          </TouchableOpacity>
          <Modal  onBackdropPress={()=>this.setState({openVoiceCommandsView:false})} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openVoiceCommandsView}> 
            <View style={styles.billingWindowStyle}>
            <Text>Coming soon</Text>      
          </View>
        </Modal>
        </View>
        }
        <View style={styles.footerLine}/>
        <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.donate}/>
       <TouchableOpacity  onPress={()=>this.setState({openCoffeeShop:true})} >
            <Text style={styles.drawerButtonText}>{I18n.t("OpenCoffeeShop")}</Text>
          </TouchableOpacity>
       <Modal  onBackdropPress={()=>this.closeCoffeeShop()} useNativeDriverForBackdrop={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationOutTiming={200} animationInTiming={200} style={styles.coffeeShopModal}  animationIn = {'slideInUp'} animationOut={'slideOutDown'}  transparent ={true} statusBarTranslucent={true} isVisible={this.state.openCoffeeShop}>
            <View style={[styles.billingWindowStyle]}>
          <Billing/>
          </View>
      </Modal>
      </View>
      { this.state.areAdsRemoved != 'true' &&
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
      }
      <View style={styles.footerLine}/>

      <View style={[styles.twoViewsStartEndContainer,{padding:15}]}>
        <FontAwesome
       style={{alignSelf:'center',marginTop:3,textAlignVertical:'center'}} icon={SolidIcons.chalkboardTeacher}/>
       <TouchableOpacity  onPress={async ()=>await this.setCardTutorial('false')} >
            <Text style={styles.drawerButtonText}>{I18n.t("ReviewTutorial")}</Text>
          </TouchableOpacity>
      </View>
      
      
      <View style={[styles.footerLine]}/>
      <View style={{height:100}}></View>
      </View>
      </ScrollView>

     </View>
      
      <View style={styles.drawerExitView}>
      <TouchableOpacity style={{flex:1}} onPress={()=>this.openSettings(false)} >
            
      </TouchableOpacity>
      </View>
      </View>

      </View>
    );
  };
  changeNameOfCategory(i,categoryName){
    console.log(categoryName)
    this.setState({openChangeNameOfCategory:true,changeCategoryNameNo:(parseInt(i)+1),changeCategoryName:categoryName})
  }
  onChangeNameOfCategory(text){
    console.log(text)
    this.setState({changedCategoryName:text})
  }
  async setNameOfCategory(){
    if(this.state.changedCategoryName!=undefined){
      if(this.state.changedCategoryName=='' || this.state.changedCategoryName==null){
        console.log('NO CHANGE')
      }else{
      let isPro = await storageGet("IsPro");
      if( isPro == 'true'){
        await storageSet('categoryName'+(this.state.changeCategoryNameNo-1),this.state.changedCategoryName)
      }
     this.setState({changedCategoryName:this.state.changedCategoryName})
    }
    }
  }
  async refreshCategoryIconsWithoutClosing(){
    let isPro = await storageGet("IsPro");
    if( isPro != 'true'){
      this.buyProVersionPrompt();
    }else{
      await this.refreshCategoriesIconsAndNames();
    }
    this.setState({openChangeNameOfCategory:false});
  }
  async refreshCategoriesIconsAndNames(){
    categoryIcons[0] = await storageGet('categoryIcon0');
    categoryNames[0] = await storageGet('categoryName0');
    categoryIcons[1] = await storageGet('categoryIcon1');
    categoryNames[1] = await storageGet('categoryName1');
    categoryIcons[2] = await storageGet('categoryIcon2');
    categoryNames[2] = await storageGet('categoryName2');
    categoryIcons[3] = await storageGet('categoryIcon3');
    categoryNames[3] = await storageGet('categoryName3');
    categoryIcons[4] = await storageGet('categoryIcon4');
    categoryNames[4] = await storageGet('categoryName4');
    categoryIcons[5] = await storageGet('categoryIcon5');
    categoryNames[5] = await storageGet('categoryName5');
    categoryIcons[6] = await storageGet('categoryIcon6');
    categoryNames[6] = await storageGet('categoryName6');
    categoryIcons[7] = await storageGet('categoryIcon7');
    categoryNames[7] = await storageGet('categoryName7');
  }
  freeUserMessage(msg){
    Alert.alert(
      I18n.t("FreeUserTrialTitle"),
      I18n.t("FreeUserTrialMessage"),
      [       
        {
          text: "OK",
          onPress: async () =>{
            //min to ksanadeikseis
            console.log(msg)
            await storageSet(msg,'true')
          }
          
        },       
      ]
    );

  }
  buyProVersionPrompt(){
    Alert.alert(
      I18n.t("ProVersionOnlyTitle"),
      I18n.t("ProVersionOnlyMessage"),
      [
         // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: I18n.t("No"),
          onPress: () =>{
            
          }
          
        },
        // The "Yes" button
        {
          text: I18n.t("Yes"),
          onPress:  () => {
            this.setState({openCoffeeShop:true})
          },
        },
       
      ]
    );
    // this.setState({openCategoriesSelect:false})

  }
  //to dataSourceSavings exei to jsondata, opws to refExpenseHistoryJson
  //to refSavingsData exei to dataSourceSavings, tha xreiastei an theloyme na kanoyme cancel
  //to _textInputRefs exei ta refs twn inputs, gia na kanoyme ref[arithmos].focus()
  //to savingsValues exei ta values se array, (antistoixo toy textInputRefs) , gia na mporoyme na kanoyme elegxo OnChangeText kai onEndEdit
  //to dataSourceSavings fortwnei mia fora sto init, prepei na to kanoyme storageSet sto closeSavingsView , kai setState
  //otan anoigei me openSavingsView, to refSavingsData pairnei oti prepei na parei apo to dataSourceSavings
  //to _textInputRefs that parei thn swsth timh otan ftiaxnetai (ref={ref => {this._textInputRefs[item.Number] = ref}})
  //todo: to savingsValues[] logika thelei arxikopoihsh , mporei kai oxi epeidh tha kanw storageSet to  dataSourceSavings sto closeSavingsView 99% den xreiazetai
  //todo: sto end edit toy textInput kai toy posoy kai toy description , tha kanw update to refSavingsData , gia na to xrisimopoihsw meta sto closeSavingsView
  //todo: sto closeSavingsView tha ginetai o ypologismos tou savingsState
   async openSavingsView(){
    refEuroState = this.state.euroState;
    refSavingsState = this.state.savingsState;
      if(this.state.dataSourceSavings == null || this.state.dataSourceSavings == ''){
        refSavingsData = '[]'
      }else{
        refSavingsData = JSON.stringify(this.state.dataSourceSavings);
      }
    
    this.setState({openSavingsView:true})
    let isPro = await storageGet("IsPro");
    let hasSeen = await storageGet("hasSeenSavings");
    if(isPro != 'true' && hasSeen != 'true'){
      await this.freeUserMessage('hasSeenSavings');
    }
  }
  async closeSavingsView(){
    this._textInputRefs = [];

    //let isPro = await storageGet("IsPro");
    // if(isPro !='true'){
    if(false){
      this.state.euroState =refEuroState;
      this.state.savingsState = refSavingsState;
      this.setState({euroState:this.state.euroState,savingsState:this.state.savingsState,openSavingsView:false,dataSourceSavings:'',savingsValues:[]});
      this.buyProVersionPrompt();
    }else{
      //setState to dataSourceSavings , oti theloyme to exoyme sto refSavingsData      
      var json = JSON.parse(refSavingsData);
      let indx = 0;
      let newAmount = 0;
      for(var i=0; i< Object.keys(json).length; i++){
          if(json[i].isEdited ){
            console.log("found "+ i)
            console.log() //me thn seira ta pairnoyme opote to indx einai swsto
            // amountToAddOrSub += parseFloat(this._savingsValuesChangeAmount[indx]);
            // console.log(this._savingsValuesChangeAmount[indx])
            json[i].isEdited = false;
            indx+=1;
            //newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
          }
         // newAmount += parseFloat(json[i].Amount);
          json[i].isEdited = false;


      }
      //this.showAlertSavings(newAmount);
      this._savingsValuesChangeAmount = [];
      this.state.savingsValues =[];
      console.log(refSavingsState)
      this.state.dataSourceSavings = json;
      await storageSet("DataSourceSavings", JSON.stringify(json));
     // await storageSet("Savings", ''); //debug
      this.setState({openSavingsView:false,dataSourceSavings:this.state.dataSourceSavings,savingsValues:this.state.savingsValues })
    }
  }
  async createEmptySavingsField(){    
    let isPro = await storageGet("IsPro");
    var count = Object.keys(JSON.parse(refSavingsData)).length;
    if(count > 0 && isPro != 'true'){
      this.buyProVersionPrompt();
      return;
    }
    var addComma = ',';
    if(refSavingsData =='[]'){
      addComma='';
    }
    var newEntry = this.jsonifyInputSavingsField(0,'Savings','',count,true); 
    refSavingsData = refSavingsData.substring(0,refSavingsData.length-1)+addComma+newEntry+']';
    console.log(refSavingsData);
    //await storageSet('SpentTodayJson',spentTodayJson); //ayto ginetai sto DataSourceSavings, an ginei confirm
    this.setState({dataSourceSavings:JSON.parse(refSavingsData)});
  }
  deleteSavingsField(no){
    var json = JSON.parse(refSavingsData);
    //otan kanei delete na vlepw pio number einai , kai ola ta epomena na ta kanw -1
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number == no ){
        json.splice(i,1);
        console.log(json)
        break;
      } 
    }
    let newAmount = 0;
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number > no){
        json[i].Number = (parseInt(json[i].Number - 1)).toString();      
      }
      newAmount += parseFloat(json[i].Amount);
    }
    this.showAlertSavings(newAmount);
    refSavingsData = JSON.stringify(json);     
    this._textInputRefs = [];
    this._savingsValuesChangeAmount = [];
    this.state.savingsValues =[];
    this.state.dataSourceSavings = json;
    this.setState({dataSourceSavings:json,savingsValues:this.state.savingsValues});
  }
  onChangeGenericSavings(text,no){
    let newText = this.checkInputText(text);
    this.state.savingsValues[no] = newText;
    // var json = JSON.parse(refSavingsData);
    // this._savingsValuesChangeAmount[no] = (parseFloat(json[no].Amount) - parseFloat(newText)).toString();
    // console.log( this._savingsValuesChangeAmount[no])
    this.setState({savingsValues: this.state.savingsValues });

   }
   onEndEditGenericSavings(no){
    if(this.state.savingsValues[no]){
      this.state.savingsValues[no] = this.checkIfAddOrSubNeeded(this.state.savingsValues[no]); //ayto to kanw gia na fainetai to swsto value sto UI
      this.setState({savingsValues: this.state.savingsValues });
      var json : JSON = JSON.parse(refSavingsData);
      json[no].isEdited = true;
      json[no].Amount = this.state.savingsValues[no] ;
      refSavingsData = JSON.stringify(json);
      console.log(refSavingsData);
      let newAmount = 0;
      for(var i=0; i< Object.keys(json).length; i++){     
        newAmount += parseFloat(json[i].Amount);
      }
      this.showAlertSavings(newAmount);
      }
      if(json!=undefined){
      this.setState({dataSourceSavings:json})
      }

  }
  
   onChangeGenericSavingsDescription(text){
    this._descRef = text;
    console.log('MPAINEI EDW')

   }
   onEndEditGenericSavingsDescription(no){
    var json = JSON.parse(refSavingsData);
    if(this._descRef!=null){
      if(this._descRef!=json[no].Description ){
        json[no].isEdited = true;
        json[no].Description = this._descRef;
        refSavingsData = JSON.stringify(json);
        console.log(refSavingsData);
        this._descRef = null;
      }
    //this.setTouchOfDescriptionInput(false);

    }
      
    
  }
  showAlertSavings(newAmount){
    if(this.state.savingsState==null || this.state.savingsState ==''){
      this.state.savingsState = '0';
    }
    let AlertStringToShow ='';
    let newEuroState = '';
    let diff  = parseFloat(this.state.savingsState) - parseFloat(newAmount);
        if(this.state.euroState =="" || this.state.euroState == null){
          newEuroState = '0';
        }else{    
          newEuroState = (parseFloat(this.state.euroState) + (diff)).toString();     
        }
        if((diff)>0){
          //added
          AlertStringToShow =  I18n.t("AddAmount") +' '+ this.stringWithCorrectCurrencyPosition(diff)+' .\n'+ I18n.t("NewBalanceAmount") +' '+this.stringWithCorrectCurrencyPosition(newEuroState)+ ' .\n'+I18n.t("AreYouSure") ;
        }else{
          //subbed
          AlertStringToShow =  I18n.t("SubtractAmount") +' '+ this.stringWithCorrectCurrencyPosition(Math.abs(diff))+' .\n'+ I18n.t("NewBalanceAmount") +' '+this.stringWithCorrectCurrencyPosition(newEuroState)+ ' .\n'+I18n.t("AreYouSure") ;
        }
    //this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
    //prepi na kanw save edw gia na min ksanaafairesei to neo yparxon poso
    this.state.savingsState = (parseFloat(newAmount)).toString();
    if(this.state.savingsState.split('.')[1]?.length>0)
    {
    this.state.savingsState = (parseFloat(this.state.savingsState).toFixed(2)).toString();
    }
    if(diff!=0){
    Alert.alert(
      I18n.t("UpdateCurrentBalanceQuestion"),
      AlertStringToShow,
      [
         // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: I18n.t("No"),
          onPress: async () =>{
            
            this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
            //checkIfSavingsEdited = this.state.savingsState;
            await this.saveData();
          }
          
        },
        // The "Yes" button
        {
          text: I18n.t("Yes"),
          onPress: async () => {           
            if(this.state.euroState =="" || this.state.euroState == null){

            }else{
              
            this.state.euroState  = (parseFloat(this.state.euroState) + (diff)).toString();
              
            }
          this.setState({ savingsState: this.state.savingsState ,euroState: this.state.euroState  });
          //checkIfSavingsEdited = this.state.savingsState;
          await this.saveData();
          
          return;
          },
        },
       
      ]
    );
    }
  }
  getNewSavingsAmountFloat(){
    try{
      var json = JSON.parse(refSavingsData);    
     // console.log(json);
      let newAmount = 0;
        for(var i=0; i< Object.keys(json).length; i++){        
            newAmount += parseFloat(json[i].Amount);
        }
        var index = newAmount.toString().indexOf('.');
        if (index >= 0) {
          return (parseFloat(newAmount).toFixed(2)).toString();
        } else {
          return newAmount;
        }
    }
    catch{
      //console.log('caught getNewSavingsAmountFlot')
      //console.log(': Line ' + console.trace())
      return this.state.savingsState;
    }
    
  }
  
  setTouchOfDescriptionInput(shouldEdit){
    console.log('HELLOOOOOO')
    switch(shouldEdit){
      case true:
        setPointerEventsOfDesc = 'box-none'
        break;
      case false:
        setPointerEventsOfDesc = 'none'
        break;
    }
  }
  async openIncomesView(){
    refEuroState = this.state.euroState;
      if(this.state.dataSourceIncomes == null || this.state.dataSourceIncomes == ''){
        refIncomesData = '[]'
      }else{
        refIncomesData = JSON.stringify(this.state.dataSourceIncomes);
      }
    
    this.setState({openIncomesView:true})
    let isPro = await storageGet("IsPro");
    let hasSeen = await storageGet("hasSeenIncomes");
    if(isPro != 'true' && hasSeen != 'true'){
      await this.freeUserMessage('hasSeenIncomes');
    }
  }
  async closeIncomesView(){
    this._textInputRefs = [];
    
    //let isPro = await storageGet("IsPro");
    // if(isPro !='true'){
    if(false){
      this.state.euroState =refEuroState;
      this.setState({euroState:this.state.euroState,openIncomesView:false,dataSourceIncomes:''});
      this.buyProVersionPrompt();
    }else{
      //setState to dataSourceSavings , oti theloyme to exoyme sto refSavingsData      
      var json = JSON.parse(refIncomesData);
      // let indx = 0;
      // let newAmount = 0;
      // for(var i=0; i< Object.keys(json).length; i++){
      //     if(json[i].isEdited ){
      //       console.log("found "+ i)
      //       console.log() //me thn seira ta pairnoyme opote to indx einai swsto
      //       // amountToAddOrSub += parseFloat(this._savingsValuesChangeAmount[indx]);
      //       // console.log(this._savingsValuesChangeAmount[indx])
      //       json[i].isEdited = false;
      //       indx+=1;
      //       //newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
      //     }
      //     newAmount += parseFloat(json[i].Amount);
      //     json[i].isEdited = false;


      // }
      let channelsNo = await storageGet("IncomeNotificationChannels")
      for(var i=parseInt(channelsNo); i> Object.keys(json).length; i--){ //gia na svisei peritta
        this.deleteNotificationChannel("Incomes"+(i-1).toString()); 
      }
      for(var i=0; i< Object.keys(json).length; i++){ //gia na ftiaksei kai alla an xreiazetai
        this.createNotificationChannel("Incomes"+json[i].Number,"Incomes Channel "+json[i].Number,""); //an yparxei , its ok
      }
      await storageSet("IncomeNotificationChannels",(Object.keys(json).length).toString())
      console.log(refIncomesData);
      this.state.incomesValues =[];
      this.state.incomesDateValues = [];
      //this.showAlertSavings(newAmount);
      this.state.dataSourceIncomes = json;
      await storageSet("DataSourceIncomes", JSON.stringify(json));
     // await storageSet("Savings", ''); //debug
      this.setState({openIncomesView:false,dataSourceIncomes:this.state.dataSourceIncomes,incomesValues:this.state.incomesValues,incomesDateValues:this.state.incomesDateValues})
    }
  }
  async createEmptyIncomesField(){    
    let isPro = await storageGet("IsPro");
    var count = Object.keys(JSON.parse(refIncomesData)).length;
    if(count > 0 && isPro != 'true'){
      this.buyProVersionPrompt();
      return;
    }
    var addComma = ',';
    if(refIncomesData =='[]'){
      addComma='';
    }    
    var newEntry = this.jsonifyInputIncomesField(0,'Incomes','',count,0,false,moment(new Date()).format('YYYY-MM')); 
    refIncomesData = refIncomesData.substring(0,refIncomesData.length-1)+addComma+newEntry+']';
    console.log(refIncomesData);
    //await storageSet('SpentTodayJson',spentTodayJson); //ayto ginetai sto DataSourceSavings, an ginei confirm
    this.setState({shouldShowIncomes:true,dataSourceIncomes:JSON.parse(refIncomesData)}); //,showDatePicker:-1
    console.log(refIncomesData)
  }
  deleteIncomesField(no){
    var json = JSON.parse(refIncomesData);
    //otan kanei delete na vlepw pio number einai , kai ola ta epomena na ta kanw -1
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number == no ){
        json.splice(i,1);
        console.log(json)
        break;
      } 
    }
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number > no){
        json[i].Number = (parseInt(json[i].Number - 1)).toString();
      
      }
    }
    refIncomesData = JSON.stringify(json);
    this.state.shouldShowIncomes = !(Object.keys(json).length ==0);
    
    this._textInputRefs = [];
    
    //this._savingsValuesChangeAmount = [];
    this.state.incomesValues =[];
    this.state.incomesDateValues = [];
    this.state.dataSourceIncomes = json;
    this.setState({shouldShowIncomes:this.state.shouldShowIncomes,dataSourceIncomes:json,incomesValues:this.state.incomesValues,incomesDateValues:this.state.incomesDateValues});
  }
  onChangeGenericIncomes(text,no){
    let newText = this.checkInputText(text);
    this.state.incomesValues[no] = newText;
    // var json = JSON.parse(refSavingsData);
    // this._savingsValuesChangeAmount[no] = (parseFloat(json[no].Amount) - parseFloat(newText)).toString();
    // console.log( this._savingsValuesChangeAmount[no])
    this.setState({incomesValues: this.state.incomesValues });

   }
   onEndEditGenericIncomes(no){
    if(this.state.incomesValues[no]){
      this.state.incomesValues[no] = this.checkIfAddOrSubNeeded(this.state.incomesValues[no]); //ayto to kanw gia na fainetai to swsto value sto UI
      this.setState({incomesValues: this.state.incomesValues });
      var json : JSON = JSON.parse(refIncomesData);
      //json[no].isEdited = true;
      json[no].Amount = this.state.incomesValues[no] ;
      
      refIncomesData = JSON.stringify(json);
      console.log(refIncomesData);
      // for(var i=0; i< Object.keys(json).length; i++){
      //   if(json[i].Number == no){
      //     console.log("found "+ i)
      //     //newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
      //   }
      // }
    }
    if(json!=undefined){
    this.setState({dataSourceIncomes:json})
    }

  }
  
   onChangeGenericIncomesDescription(text){
    this._descRef = text;
    console.log('MPAINEI EDW')

   }
   onEndEditGenericIncomesDescription(no){
    var json = JSON.parse(refIncomesData);
    if(this._descRef!=null){
      if(this._descRef!=json[no].Description ){
        //json[no].isEdited = true;
        json[no].Description = this._descRef;
        refIncomesData = JSON.stringify(json);
        console.log(refIncomesData);
        this._descRef = null;
      }
    //this.setTouchOfDescriptionInput(false);

    }
      
    
  }
  datePickedIncomesView(selectedDayIndex,itemNumber){
    console.log(selectedDayIndex)
    console.log(itemNumber)
    this.state.incomesDateValues[itemNumber] = selectedDayIndex;
    this.setState({incomesDateValues: this.state.incomesDateValues });

    var json = JSON.parse(refIncomesData);
    //json[itemNumber].isEdited = true;
    json[itemNumber].Day = selectedDayIndex;
    console.log('THIS IDS NE WEDATE ' + selectedDayIndex)
    if(new Date().getDate() >= parseInt(selectedDayIndex)){ //exei perasei h mera poy exei kanei select
      json[itemNumber].shouldUpdate = false;
      json[itemNumber].lastUpdated =  moment(new Date()).format('YYYY-MM');
    }else{
      json[itemNumber].shouldUpdate = true;
      json[itemNumber].lastUpdated =  moment(new Date()).subtract(1, 'month').format('YYYY-MM');

    }
    refIncomesData = JSON.stringify(json);
    console.log(refIncomesData);
    this.setState({dataSourceIncomes:json})

  }



 
  async openFixedCostsView(){
    refEuroState = this.state.euroState;
      if(this.state.dataSourceFixedCosts == null || this.state.dataSourceFixedCosts == ''){
        refFixedCostsData = '[]'
      }else{
        refFixedCostsData = JSON.stringify(this.state.dataSourceFixedCosts);
      }
   
    this.setState({openFixedCostsView:true})
    let isPro = await storageGet("IsPro");
    let hasSeen = await storageGet("hasSeenFixedCosts");
    if(isPro != 'true' && hasSeen != 'true'){
      await this.freeUserMessage('hasSeenFixedCosts');
    }
  }
  async closeFixedCostsView(){
    this._textInputRefs = [];
    
    //let isPro = await storageGet("IsPro");
    // if(isPro !='true'){
    if(false){
      this.state.euroState =refEuroState;
      this.setState({euroState:this.state.euroState,openFixedCostsView:false,dataSourceFixedCosts:''});
      this.buyProVersionPrompt();
    }else{
      //setState to dataSourceSavings , oti theloyme to exoyme sto refSavingsData      
      var json = JSON.parse(refFixedCostsData);
      // let indx = 0;
      // let newAmount = 0;
      // for(var i=0; i< Object.keys(json).length; i++){
      //     if(json[i].isEdited ){
      //       console.log("found "+ i)
      //       console.log() //me thn seira ta pairnoyme opote to indx einai swsto
      //       // amountToAddOrSub += parseFloat(this._savingsValuesChangeAmount[indx]);
      //       // console.log(this._savingsValuesChangeAmount[indx])
      //       json[i].isEdited = false;
      //       indx+=1;
      //       //newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
      //     }
      //     newAmount += parseFloat(json[i].Amount);
      //     json[i].isEdited = false;


      // }
      let channelsNo = await storageGet("FixedCostsNotificationChannels")
      for(var i=parseInt(channelsNo); i> Object.keys(json).length; i--){ //gia na svisei peritta
        this.deleteNotificationChannel("FixedCosts"+(i-1).toString()); 
      }
      for(var i=0; i< Object.keys(json).length; i++){ //gia na ftiaksei kai alla an xreiazetai
        this.createNotificationChannel("FixedCosts"+json[i].Number,"Fixed Costs Channel "+json[i].Number,""); //an yparxei , its ok
      }
      await storageSet("FixedCostsNotificationChannels",(Object.keys(json).length).toString())
      console.log(refFixedCostsData);
      this.state.fixedCostsValues =[];
      this.state.fixedCostsDateValues = [];
      //this.showAlertSavings(newAmount);
      this.state.dataSourceFixedCosts = json;
      await storageSet("DataSourceFixedCosts", JSON.stringify(json));
     // await storageSet("Savings", ''); //debug
      this.setState({openFixedCostsView:false,dataSourceFixedCosts:this.state.dataSourceFixedCosts,fixedCostsValues:this.state.fixedCostsValues,fixedCostsDateValues:this.state.fixedCostsDateValues})
    }
  }
  async createEmptyFixedCostsField(){    
    let isPro = await storageGet("IsPro");
    var count = Object.keys(JSON.parse(refFixedCostsData)).length;
    if(count > 0 && isPro != 'true'){
      this.buyProVersionPrompt();
      return;
    }
    var addComma = ',';
    if(refFixedCostsData =='[]'){
      addComma='';
    }
    var newEntry = this.jsonifyInputFixedCostsField(0,'FixedCosts','',count,0,false,moment(new Date()).format('YYYY-MM')); 
    refFixedCostsData = refFixedCostsData.substring(0,refFixedCostsData.length-1)+addComma+newEntry+']';
    console.log(refFixedCostsData);
    //await storageSet('SpentTodayJson',spentTodayJson); //ayto ginetai sto DataSourceSavings, an ginei confirm
    this.setState({shouldShowFixedCosts:true,dataSourceFixedCosts:JSON.parse(refFixedCostsData)}); //,showDatePicker:-1
    console.log(refFixedCostsData)
  }
  deleteFixedCostsField(no){
    var json = JSON.parse(refFixedCostsData);
    //otan kanei delete na vlepw pio number einai , kai ola ta epomena na ta kanw -1
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number == no ){
        json.splice(i,1);
        console.log(json)
        break;
      } 
    }
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].Number > no){
        json[i].Number = (parseInt(json[i].Number - 1)).toString();
      
      }
    }
    refFixedCostsData = JSON.stringify(json);
    this.state.shouldShowFixedCosts = !(Object.keys(json).length ==0);


    this._textInputRefs = [];
    
    //this._savingsValuesChangeAmount = [];
    this.state.fixedCostsValues =[];
    this.state.fixedCostsDateValues = [];
    this.state.dataSourceFixedCosts = json;
    this.setState({shouldShowFixedCosts:this.state.shouldShowFixedCosts,dataSourceFixedCosts:json,fixedCostsValues:this.state.fixedCostsValues,fixedCostsDateValues:this.state.fixedCostsDateValues});
  }
  onChangeGenericFixedCosts(text,no){
    let newText = this.checkInputText(text);
    this.state.fixedCostsValues[no] = newText;
    // var json = JSON.parse(refSavingsData);
    // this._savingsValuesChangeAmount[no] = (parseFloat(json[no].Amount) - parseFloat(newText)).toString();
    // console.log( this._savingsValuesChangeAmount[no])
    this.setState({fixedCostsValues: this.state.fixedCostsValues });

   }
   onEndEditGenericFixedCosts(no){
    if(this.state.fixedCostsValues[no]){
      this.state.fixedCostsValues[no] = this.checkIfAddOrSubNeeded(this.state.fixedCostsValues[no]); //ayto to kanw gia na fainetai to swsto value sto UI
      this.setState({fixedCostsValues: this.state.fixedCostsValues });
      var json : JSON = JSON.parse(refFixedCostsData);
      //json[no].isEdited = true;
      json[no].Amount = this.state.fixedCostsValues[no] ;
      
      refFixedCostsData = JSON.stringify(json);
      console.log(refFixedCostsData);
      // for(var i=0; i< Object.keys(json).length; i++){
      //   if(json[i].Number == no){
      //     console.log("found "+ i)
      //     //newJson+= this.jsonifySpentToday(this.state.dataSource[i].Amount,this.state.dataSource[i].Time,this.state.dataSource[i].Category) +','
      //   }
      // }
    }
    if(json!=undefined){
    this.setState({dataSourceFixedCosts:json})
    }
  }
  
   onChangeGenericFixedCostsDescription(text){
    this._descRef = text;
    console.log('MPAINEI EDW')

   }
   onEndEditGenericFixedCostsDescription(no){
    var json = JSON.parse(refFixedCostsData);
    if(this._descRef!=null){
      if(this._descRef!=json[no].Description ){
       // json[no].isEdited = true;
        json[no].Description = this._descRef;
        refFixedCostsData = JSON.stringify(json);
        console.log(refFixedCostsData);
        this._descRef = null;
      }
    //this.setTouchOfDescriptionInput(false);

    }
      
    
  }
  datePickedFixedCostsView(selectedDayIndex,itemNumber){
    console.log(selectedDayIndex)
    console.log(itemNumber)
    this.state.fixedCostsDateValues[itemNumber] = selectedDayIndex;
    this.setState({fixedCostsDateValues: this.state.fixedCostsDateValues });

    var json = JSON.parse(refFixedCostsData);
    //json[itemNumber].isEdited = true;
    json[itemNumber].Day = selectedDayIndex;
    if(new Date().getDate() >= parseInt(selectedDayIndex)){ //exei perasei h mera poy exei kanei select
      json[itemNumber].shouldUpdate = false;
      json[itemNumber].lastUpdated =  moment(new Date()).format('YYYY-MM');
    }else{
      json[itemNumber].shouldUpdate = true;
      json[itemNumber].lastUpdated =  moment(new Date()).subtract(1, 'month').format('YYYY-MM');

    }    
    //json[itemNumber].isEdited = true;
    refFixedCostsData = JSON.stringify(json);
    console.log(refFixedCostsData);
    this.setState({dataSourceFixedCosts:json})



  }

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
  changeCategories = async ()=>{
    // await storageSet('Currency',currency);
    // refCurrency=currency;
    this.setState({openCategoriesSelect:false})
  }
  async refreshCategoryIcons(){
    await this.refreshCategoriesIconsAndNames();
    this.setState({openCategoriesSelect:false});
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
      return currencyInfo[0].Symbol + "" +stringToReturn;
    }else if (currencyInfo[0].Position == "last"){
      return stringToReturn + "" + currencyInfo[0].Symbol;
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
    }else if (currencyInfo[0].currencyCode == "CNY"){
      return SolidIcons.yenSign;
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
   
    
    //edw mporw na allaksw thn eggrafi sto refSavingsData

   
   onChanged1Savings(text){
     
    let newText = this.checkInputText(text);
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
  endEdit1Savings(savings){ 
    
    if (this.state.savingsState == "" || this.state.savingsState == null){
      this.state.savingsState = "0";
    }
    let AlertStringToShow ='';

    if(this.state.savingsState != savings){ // exei kanei ontws edittu
    //this.state.savingsState = subtract
    this.state.savingsState = this.checkIfAddOrSubNeeded(this.state.savingsState);
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
    let newText = this.checkInputText(text);
     this.state.euroState = newText;
     this.setState({isEditingEuroState:true, euroState: newText });
    //  await storageSet('Euros',newText);
    //  this.SetSharedStorage();
   }
   endEdit1(){
    console.log('END EDIT1')
    isEditingText1 =false;
    if(this.state.euroState!= '' && this.state.euroState != null){
      this.state.euroState = this.checkIfAddOrSubNeeded(this.state.euroState);
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
    let newText = this.checkInputText(text);
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
    this.state.newSpent= this.checkIfAddOrSubNeeded(this.state.newSpent);
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
      this.setState({spentPastMonth:this.state.spentPastMonth,markedDates:_markedDates,buttonModal2:bool,closeModal2:!bool,dataSourcePerDay:null,triggerAnimationPie:false});
      refFullPayDay = this.state.fullDatePaydayState;
      refPayDay = this.state.paydayState;
      break;
      case 3:
      this.state.buttonModal3 = bool;
      this.state.closeModal3 = !bool;
      this.state.selectedCategoryBtn = 0;
      if( this.state.dataSource!=null && this.state.dataSource.length !=0 && true){
        this.setState({buttonModal3:bool,closeModal3:!bool,selectedCategoryButton:0,expensesPieData:this.resetPieDataFrom(this.state.dataSource),triggerAnimationPie:false})
      }else{
        this.setState({buttonModal3:bool,closeModal3:!bool,selectedCategoryButton:0});
      }
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
  jsonifyInputSavingsField(amount,type,description,number,isEdited){
    return '{"Amount":"'+amount+'", "Type":"'+type+'", "Description":"'+description+'","Number":"'+number+'","isEdited":'+isEdited+'}';
  }
  jsonifyInputIncomesField(amount,type,description,number,dayNum,shouldUpdate,lastUpdated){
    return '{"Amount":"'+amount+'", "Type":"'+type+'", "Description":"'+description+'","Number":"'+number+'","Day":'+dayNum+',"shouldUpdate":'+shouldUpdate+',"lastUpdated":"'+lastUpdated+'"}';
  }
  jsonifyInputFixedCostsField(amount,type,description,number,dayNum,shouldUpdate,lastUpdated){
    return '{"Amount":"'+amount+'", "Type":"'+type+'", "Description":"'+description+'","Number":"'+number+'","Day":'+dayNum+',"shouldUpdate":'+shouldUpdate+',"lastUpdated":"'+lastUpdated+'"}';
  }
  jsonifyInputFieldForSaving(amount,type,description,number,lastUpdated){
    return '{"Amount":"'+amount+'", "Type":"'+type+'", "Description":"'+description+'","Number":"'+number+'","lastUpdated":"'+lastUpdated+'"}';
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
  
  getAdditionOfTwoFloats(float1,float2){
    //console.log('FLOAT 1 :'+float1)
    //console.log('FLOAT 2 :'+float2)
    if(!float1){
     //console.log('FLOAT1 UNDEFINED! SETTING TO 0')
      float1= 0;
    }
    if(!float2){
      //console.log('FLOAT2 UNDEFINED! SETTING TO 0')
      float2= 0;
    }
  
    let res = (float1 + float2).toString();
    var index = res.indexOf('.');
    if (index >= 0) {
      return res.toFixed(2).toString();
    } else {
      return res;
    }
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
 getJsonAmountsToBeRemovedOrAdded(json){
  let jsonAmountsToBeRemovedOrAdded = 0;
  if(json!=undefined){
    for(var i=0; i< Object.keys(json).length; i++){
      if(json[i].shouldUpdate){ //poso pou tha afairethei
        jsonAmountsToBeRemovedOrAdded += parseFloat(json[i].Amount);
      }
    }
  }
  return jsonAmountsToBeRemovedOrAdded;
 }
 getEuroStateAfterFixedCostsRemoved(){
  let fixedCostsToBeRemoved = this.getJsonAmountsToBeRemovedOrAdded((this.state.dataSourceFixedCosts));
  let euroRef = (parseFloat(this.state.euroState) - fixedCostsToBeRemoved).toString();
  var index = euroRef.indexOf('.');
   if (index >= 0) {
     return (parseFloat(euroRef).toFixed(2)).toString();
   } else {
     return euroRef;
   }
 }
 getEuroStateAfterIncomesAdded(){
  let incomesToBeAdded = this.getJsonAmountsToBeRemovedOrAdded((this.state.dataSourceIncomes));
  let euroRef = (parseFloat(this.state.euroState) + incomesToBeAdded).toString();
  var index = euroRef.indexOf('.');
   if (index >= 0) {
     return (parseFloat(euroRef).toFixed(2)).toString();
   } else {
     return euroRef;
   }
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
 /**
 * CARE: Must call with convert float to string (eg. 2.125.toString())
 */
  getStringNumberWithCorrectDecimals(str){
    var index = str.indexOf('.');
    if (index >= 0) {
      return (parseFloat(str).toFixed(2)).toString();
    } else {
      return str;
    }
  }

getLocalisedFullDateString(dateString){
  console.log('WTF LOLCALE ' +moment.locale())
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
   if(languageCode == 'zh')//special case
   {
    languageCode = 'zh-cn';
   }
   
   moment.locale(languageCode); //prepei na kaneis import kai to 'moment/locale/de px.'
   return moment(date).format('LL')
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
    //console.log('THIS IS REAL DAYS LEFT'+remainingDays)
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
 /**
 * DONT CALL IF STATES ARE NOT SET
 */
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
      const value4 = await storageGet("DataSourceFixedCosts");

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
      let fixedCostsToBeRemoved = this.getJsonAmountsToBeRemovedOrAdded(JSON.parse(value4));
      let moneyPerDay = ((parseFloat(value1) - fixedCostsToBeRemoved + parseFloat(value3))/remainingDays).toFixed(2);
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
     let fixedCostsToBeRemoved = this.getJsonAmountsToBeRemovedOrAdded((this.state.dataSourceFixedCosts));
     let moneyPerDay = ((parseFloat(value1) - fixedCostsToBeRemoved + parseFloat(value3))/remainingDays).toFixed(2);
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
 //PushNotification.cancelAllLocalNotifications()

 
 
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
   marginTop:20,
   justifyContent:'center'

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
    paddingHorizontal:2

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
  },sideWindowTextBold:{
    fontSize:22,
    textAlignVertical:'center',
    color:'#000001',
    marginLeft:15
  },
  sideWindowTextFaint:{
    marginLeft:15,
    fontSize:13,
    textAlignVertical:'center',
    color:'#b3b3b3',
    fontStyle:'italic'
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
  fontSize:24,
  alignSelf:'flex-end',
  marginRight:10

},confirmBtnText:{
  fontSize:24,
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
 
},descriptionInput:{
  fontSize:11,
  textAlignVertical:'center',
  paddingVertical:0,paddingHorizontal:20,
  fontStyle:'italic',color:'gray'
},editIcon:{
  // borderRadius:10,
  textAlignVertical:'center',
  fontSize:17,
  marginLeft:-15
},inputContainer:{
  borderWidth: 0.7,
  height:'80%',
  width:'80%',
  borderColor:'#D3D3D3',
  borderTopRightRadius:10,
  borderBottomRightRadius:10,
},descriptionInputContainer:{
  borderWidth: 0.7,
  height:'80%',
  width:'80%',
  borderColor:'#D3D3D3',
  borderRadius:10
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
},dayPicker:{
  width:'50%',
  marginLeft:30
  
},dayPickerItem:{
  
},dayTextLabel:{
  fontSize:16,
  textAlignVertical:'center',
  color:'#000001',
  width:'35%',
  fontWeight:'400',
  paddingHorizontal:5
},scrollViewManagerStyle:{
  maxHeight:'70%',width:'98%',paddingHorizontal:25,paddingTop:10
},viewManagerStyle:{
  borderColor:'#8d8d8d55',borderWidth:1,borderRadius:10
},rowContainerManager:{
  flexDirection:'row',justifyContent:'flex-start'
}

});

 export default withIAPContext(App);