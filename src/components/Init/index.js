import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import featureActions from "../../redux/feature/actions";

const Init = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const inputIds = ["visualizer_customer_is_logged", "visualizer_customer_id", "visualizer_language"];
    const inputElements = inputIds.map(id => document.getElementById(id)).filter(Boolean);
    if (!inputElements.length) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "value") {
          console.log( `Input ${mutation.target.id} changed to:`, mutation.target.value);
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

  useEffect(() => {
    //console.log( `language changed to:`, language);
/*    if(language === 'english'){
      dispatch(featureActions.setLanguage('en'));
    }else{
      dispatch(featureActions.setLanguage('lt'));
    }*/
  }, [language]);

  return(<></>)
}

export default Init;