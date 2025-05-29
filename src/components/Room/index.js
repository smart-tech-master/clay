import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import featureAction from "../../redux/feature/actions";
import { useTranslation } from "react-i18next";

import './Room.css';
import featureActions from "../../redux/feature/actions";



function Room() {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const saveButton = process.env.PUBLIC_URL + assetsPath + 'images/save-button.svg';

  const userData = useSelector(state => state.Feature);
  const language = useSelector(state => state.Feature.language);

  useEffect(() => {
    dispatch(featureActions.getColoursRequest());

    if (userData.isLoggedIn && userData.customerId) {
      dispatch({type: featureAction.GET_OBJECTS_REQUEST});
    }else{
      if(localStorage.getItem("userData")){
        const userDataInLocalStroage = JSON.parse(localStorage.getItem("userData"));
        dispatch(featureAction.initUserData(userDataInLocalStroage));

        // force reload the canvas
        if(userDataInLocalStroage.coloursOnCanvas.length > 0) {
          const firstColour = userDataInLocalStroage.coloursOnCanvas[0];
          dispatch(featureAction.updatedColourDataDefine({
            order: 0,
            from: firstColour.id_product_attribute,
            to: firstColour.id_product_attribute
          }));

          setTimeout(function() {
            dispatch(featureAction.updateStatusOfUpdateColour(true));
          }, 500);
        }
      }
    }
  }, []);


  const dispatch = useDispatch();

  const setObject = () => {
    if (userData.isLoggedIn && userData.customerId) {
      dispatch({type: featureAction.SET_OBJECTS_REQUEST, payload: userData});
    }else{
      localStorage.setItem("userData", JSON.stringify(userData));
/*      const userData = JSON.parse(localStorage.getItem("userData"));*/
    }
  }

  const { t, i18n } = useTranslation();

  return (
    <div className='room d-flex space-between m-top m-bottom normal-font-style p-bottom'>
      <div>{t('Rooms')}</div>
      <div className="room-select-button-container d-flex">
        <div className='room-select-container'>
          <select className='room-select'>
            <option>{t('Bedroom')}</option>
          </select>
        </div>
        <div className="button" onClick={setObject}>
          <img src={saveButton} alt='button' />
        </div>
      </div>
    </div>
  );
}

export default Room;