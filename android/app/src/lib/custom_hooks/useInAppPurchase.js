import { useEffect, useState } from "react"
import { Alert, Platform } from "react-native"
import { getPurchaseHistory, requestPurchase, useIAP } from "react-native-iap"
import AsyncStorage  from '@react-native-community/async-storage';

import {
  STORAGE_KEYS,
  storeBooleanData,
  getBooleanData,
} from "../functions/asyncStorage"
const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS
// Play store item Ids
const itemSKUs = Platform.select({
  android: ["espresso_for_dev", "double_espresso_for_dev","remove_all_ads"],
})
const useInAppPurchase = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false)
  const [connectionErrorMsg, setConnectionErrorMsg] = useState("")
  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
    
  } = useIAP()
   // Get data after initial render
  //  useEffect(() => {
  //   getBooleanData(IS_FULL_APP_PURCHASED).then(data => {
  //     setIsFullAppPurchased(data)
  //   })
  // }, [])
   // Get products from play store.
   useEffect(() => {
    if (connected) {
      getProducts(itemSKUs)
      console.log("Getting products...")
      //clearHistory();
     
    }
    console.log(products)
  }, [connected, getProducts])
  // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        const receipt = purchase.transactionReceipt
        console.log("RECEIPT: ", receipt)

        if (receipt) {
          // Give full app access
          //setAndStoreFullAppPurchase(true)
          //EDW GRAFW POSOUS KAFEDES EXEI PAREI
          console.log('YOO')
          try {
            // if(JSON.parse(receipt).productId == 'remove_all_ads'){ //kanonika finish to transaction gia to remove ads, afou meta checkaroume to history
            //    //no need to finish transaction
            // }
              const ackResult = await finishTransaction(purchase,true)
            console.log("ackResult: ", ackResult)
            if(ackResult.code == "OK"){
              // console.log('accept '+JSON.parse(receipt).productId)
              // if (JSON.parse(receipt).productId == 'remove_all_ads'){
                
              // }
              setAndStoreFullAppPurchase(true);
                await storageSet('RemovedAds','true');
                console.log('REMOVED ADS')

            }
            
            
          } catch (ackErr) {
            // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
            console.log("ackError: ", ackErr)            
          }
        }
      }
    }
    checkCurrentPurchase(currentPurchase)
  }, [currentPurchase, finishTransaction])
  // If user reinstalls app, then they can press purchase btn (SettingsScreen) to get full app without paying again.
  // useEffect(() => {
  //   if (currentPurchaseError) {
  //     if (
  //       currentPurchaseError.code === "E_ALREADY_OWNED" &&
  //       !isFullAppPurchased
  //     ) {
  //       setAndStoreFullAppPurchase(true)
  //     }
  //   }
  // }, [currentPurchaseError])

  const clearHistory = async () =>{
    const x = await getPurchaseHistory();
    console.log(x)
    console.log('HELLO')
    x.forEach(element => {
      finishTransaction(element,true)
    });
  }
  const removeAds = async () => {
    
    // Reset error msg
    if (connectionErrorMsg !== "") setConnectionErrorMsg("")
    if (!connected) {
      setConnectionErrorMsg("Please check your internet connection")
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (products?.length > 0) {
      
      requestPurchase(itemSKUs[2])
      console.log("Purchasing products... REMOVE ADSS")
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log("No products. Now trying to get some...")
      try {
        await getProducts(itemSKUs)
        requestPurchase(itemSKUs[2])
        console.log("Got products, now purchasing REMOVE ADSS")
      } catch (error) {
        setConnectionErrorMsg("Please check your internet connection")
        console.log("Everything failed. Error: ", error)
      }
    }
  }
  const removeAdsCheck = async () => {
    const x = await getPurchaseHistory();
      console.log(x);
      let isPurchased = false;
      // x.forEach(element => {
      //   if (element.productId == "remove_all_ads"){
      //     isPurchased = true;
      // }     
     // });

      if (x.length >0){
          isPurchased = true;
      }
      
      if(isPurchased){
        console.log('dont buy')
        await storageSet('RemovedAds','true');
        setAndStoreFullAppPurchase(true)
        
      }else{
        console.log('buy')
        await removeAds();
      }
  }
  
  const buySmallCoffee = async () => {
    
    // Reset error msg
    if (connectionErrorMsg !== "") setConnectionErrorMsg("")
    if (!connected) {
      setConnectionErrorMsg("Please check your internet connection")
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (products?.length > 0) {
      requestPurchase(itemSKUs[0])
      console.log("Purchasing products... SMALL")
      

    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log("No products. Now trying to get some...")
      try {
        await getProducts(itemSKUs)
        requestPurchase(itemSKUs[0])
        console.log("Got products, now purchasing...SMALL")
      } catch (error) {
        setConnectionErrorMsg("Please check your internet connection")
        console.log("Everything failed. Error: ", error)
      }
    }
  }
  const buyBigCoffee = async () => {
    // Reset error msg
    if (connectionErrorMsg !== "") setConnectionErrorMsg("")
    if (!connected) {
      setConnectionErrorMsg("Please check your internet connection")
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (products?.length > 0) {
      requestPurchase(itemSKUs[1])
      console.log("Purchasing products...BIG")
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log("No products. Now trying to get some...")
      try {
        await getProducts(itemSKUs)
        requestPurchase(itemSKUs[1])
        console.log("Got products, now purchasing...")
      } catch (error) {
        setConnectionErrorMsg("Please check your internet connection")
        console.log("Everything failed. Error: ", error)
      }
    }
  }
  const setAndStoreFullAppPurchase = boolean => {
    setIsFullAppPurchased(boolean)
    storeBooleanData(IS_FULL_APP_PURCHASED, boolean)
  }
//GIA TO ASYNC STORAGE
  const storageSet = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("StorageSetResult: "+key +' ' +value);
    } catch(error) {
      console.log(error);
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
  return {
    isFullAppPurchased,
    connectionErrorMsg,
    buySmallCoffee: buySmallCoffee,
    buyBigCoffee: buyBigCoffee,
    removeAdsCheck: removeAdsCheck


  }
}
export default useInAppPurchase