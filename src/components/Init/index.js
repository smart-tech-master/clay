import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import featureActions from "../../redux/feature/actions";

const Init = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [language, setLanguage] = useState(0);

  useEffect(() => {
    const inputIds = ["visualizer_customer_is_logged", "visualizer_customer_id", "visualizer_language"];
    const inputElements = inputIds.map(id => document.getElementById(id)).filter(Boolean);
    if (!inputElements.length) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "value") {
          // console.log( `Input ${mutation.target.id} changed to:`, mutation.target.value);
          if(mutation.target.id === "visualizer_customer_is_logged"){
            setIsLoggedIn(mutation.target.value);
          }

          if(mutation.target.id === "visualizer_customer_id"){
            setCustomerId(mutation.target.value);
          }

          if(mutation.target.id === "visualizer_language"){
            setLanguage(mutation.target.value);
          }
        }
      });
    });

    inputElements.forEach((inputElement) =>
      observer.observe(inputElement, { attributes: true, attributeFilter: ["value"] })
    );

    return () => {
      observer.disconnect();
    };

  }, []);

  useEffect(() => {
    dispatch(featureActions.setUserInfo({isLoggedIn, customerId}));
    //console.log( `customerId changed to:`, customerId);
  }, [isLoggedIn, customerId]);

  // useEffect(() => {
  //   console.log( `language changed to:`, language);
  //   if(language === "0"){
  //     dispatch(featureActions.setLanguage('en'));
  //   }else{
  //     dispatch(featureActions.setLanguage('lt'));
  //   }
  // }, [language]);

  useEffect(() => {
    const _sLoggedIn = document.getElementById("visualizer_customer_is_logged")?.value;
    const _customerId = document.getElementById('visualizer_customer_id')?.value;
    setIsLoggedIn(_sLoggedIn);
    setCustomerId(_customerId);

    const assetsPath = document.getElementById('root')?.getAttribute('data-assetsurl');
    dispatch(featureActions.setAssetsPath(assetsPath));
  }, []);

  useEffect(() => {
    const language = document.getElementById('root')?.getAttribute('data-locale');
    if(language === "en"){
      dispatch(featureActions.setLanguage('en'));
    }else{
      dispatch(featureActions.setLanguage('lt'));
    }
    dispatch(featureActions.setLanguage(language));
  }, []);

  // colours init
  // useEffect(() => {
  //   dispatch(featureActions.getColoursRequest())
  // }, []);

  // default pallet init
  useEffect(() => {
    dispatch(featureActions.getDefaultPallet())
  }, []);

  return(<></>)
}

export default Init;