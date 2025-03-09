import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import featureActions from './redux/feature/actions';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './containers/Canvas';
import ToolBar from "./containers/ToolBar";
import Modals from "./components/Modals";

import { useTranslation } from "react-i18next";
import statusAction from "./redux/status/actions";

function App({ isLoggedIn, customerId }) {
/*  console.log('isLoggedIn', isLoggedIn);
  console.log('customerId', customerId);*/

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(featureActions.getColoursRequest());

    // getting logged in user info
    const scripts = document.querySelectorAll("script");
    let scriptContent = "";
    scripts.forEach(script => {
      if (script.textContent.includes("visualizer_customer_is_logged")) {
        scriptContent = script.textContent;
      }
    });
    const isLoggedInMatch = scriptContent.match(/let visualizer_customer_is_logged = "(.*?)"/);
    const customerIdMatch = scriptContent.match(/let visualizer_customer_id = "(.*?)"/);
    const visualizer_customer_is_logged = isLoggedInMatch ? isLoggedInMatch[1] : undefined;
    const visualizer_customer_id = customerIdMatch ? customerIdMatch[1] : undefined;
    if(visualizer_customer_is_logged !== undefined && visualizer_customer_id !== undefined) {
      if(visualizer_customer_is_logged && visualizer_customer_id) {
        dispatch(featureActions.setUserInfo({isLoggedIn:visualizer_customer_is_logged, customerId:visualizer_customer_id}))
      }
    }

    // getting language info

    if(document.getElementById("language-selector-label")){
      let labelText = document.getElementById("language-selector-label").innerText.trim();
      if(labelText === 'English') {
        dispatch(featureActions.setLanguage('en'));
      }else{
        dispatch(featureActions.setLanguage('lt'));
      }
    }
  });

  const { t, i18n } = useTranslation();

  return (
    <div className="row App">
      <div className="col-12 col-md-8">
        <Canvas />
      </div>
      <div className="col-12 col-md-4 h-100">
        <ToolBar />
      </div>
      <Modals />
    </div>
  );
}

export default App;
