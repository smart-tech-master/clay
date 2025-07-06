import React, {useEffect, useState} from 'react';
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

    if (userData.isLoggedIn == 1) {
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

  // get object
  const _isLoggedIn = useSelector((state) => state.Feature.isLoggedIn);
  const _objects = useSelector(state => state.Feature.userObjects);

  const _objectId = useSelector(state => state.Feature.selectedObjectId);
  const _objectName = useSelector(state => state.Feature.selectedObjectName);
  const _coloursOnCanvas = useSelector(state => state.Feature.coloursOnCanvas);
  const _priceData = useSelector(state => state.Feature.priceData);

  const dispatch = useDispatch();

  const setObject = () => {
    if (userData.isLoggedIn == 1) {
      const _payload = {
        objectId: _objectId,
        objectName: _objectName,
        object: {
          objectName: _objectName,
          userColours: _coloursOnCanvas,
          priceData: _priceData
        }
      }
      dispatch({type: featureAction.SET_OBJECTS_REQUEST, payload: _payload});
    }else{
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch({
        type: featureAction.OPEN_TOAST,
        payload: {
          isOpen: true,
          status: "success",
          message: "Object is saved successfully"
        },
      });
/*      const userData = JSON.parse(localStorage.getItem("userData"));*/
    }
  }

  const { t, i18n } = useTranslation();



  useEffect(() => {
    //if(_isLoggedIn == 1){}
    if(_isLoggedIn == 1){
      console.log('_objects', _objects);
    }
  }, [_isLoggedIn]);

  const [selectedObjectId, setSelectedObjectId] = useState(0);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setSelectedObjectId(selectedId);
    console.log('Selected object ID:', selectedId);
    dispatch(featureActions.selectObject(selectedId));
  };

  useEffect(() => {
    //if(_isLoggedIn == 1){}
    if(_objects.length > 0){
      console.log('_objects.length', _objects.length)
      dispatch(featureActions.selectObject(_objects[0].objectId));
      // dispatch(featureActions.selectObject(_objects[1].objectId));
    }
  }, []);

  return (
    <div className='acp-room acp-d-flex acp-space-between m-top acp-normal-font-style acp-p-bottom'>
      <div>{t('Rooms')}</div>
      <div className="acp-room-select-button-container acp-d-flex">
        <div className='acp-room-select-container'>
          <select className="acp-room-select" onChange={handleChange} value={selectedObjectId}>
            {
              _objects.length > 0 ? (
                _objects.map((item) => (
                  <option key={item.objectId} value={item.objectId}>
                    {item.objectName}
                  </option>
                ))
              ) : (
                <option key={0} value={0}>
                  {t('Bedroom')}
                </option>
              )
            }
          </select>
        </div>
        <div className="acp-button" onClick={setObject}>
          <img src={saveButton} alt='button' />
        </div>
      </div>
    </div>
  );
}

export default Room;