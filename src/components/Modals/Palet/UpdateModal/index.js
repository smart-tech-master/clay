import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import statusAction from '../../../../redux/status/actions';
import {parseDataByObjectKey} from "utils/common";

import PaletListSm from "components/PaletListCategory/PaletListSm";
import PaletListRm from "components/PaletListCategory/PaletListRm";

import 'components/Modals/TemplateModal/TemplateModal.css';
import featureAction from "../../../../redux/feature/actions";
import { getFilteredArray } from 'utils/common';

import { useTranslation } from "react-i18next";

Modal.setAppElement('#root');

function UpdatePaletModal() {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const mdClose = process.env.PUBLIC_URL + assetsPath + 'images/md-close.svg';

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Feature.isOpenUpdatePaletModal);
  const isOpenUpdatePaletModal = () => {
    setUserColoursData(userColours);
    dispatch(statusAction.isOpenUpdatePaletModal());
  }

  const isLoggedIn = useSelector(state => state.Feature.isLoggedIn);
  const customerId = useSelector(state => state.Feature.customerId);
  const allColours = useSelector(state => state.Feature.colours);
  const [colours, setColours] = React.useState([]);
  const parsedColoursDataByProductName = parseDataByObjectKey(colours, 'product_name');

  //const colours = parseDataByObjectKey(useSelector(state => state.Feature.colours), 'product_name');
  const userColours = useSelector((state) => state.Feature.userColours);
  const paletNames = Object.keys(userColours);
  const [userColoursData, setUserColoursData] = useState({});
  const [selectedPalet, setSelectedPalet] = useState("");

  useEffect(() => {
    if(paletNames[0] != "" && userColours[paletNames[0]]) {
      const fileredColours = getFilteredArray(allColours, userColours[paletNames[0]]);
      setColours([...fileredColours]);
    }
  }, [allColours]);

  useEffect(() => {
    const fileredColours = getFilteredArray(allColours, userColoursData[selectedPalet]);
    setColours([...fileredColours]);
  }, [selectedPalet, userColoursData]);

  useEffect(()=>{
    setUserColoursData(userColours);
    setSelectedPalet(paletNames[0])
  }, [userColours]);

  const handleSelectedPaletChange = (event) => {
    setSelectedPalet(event.target.value);
  }

  const addColour = (data) => {
    let cloneUserColoursData = {...userColoursData};
    if(cloneUserColoursData[selectedPalet].some(item => item.id_product_attribute === data.id_product_attribute)) { return; }
    cloneUserColoursData[selectedPalet] = [...cloneUserColoursData[selectedPalet], data];
    setUserColoursData(cloneUserColoursData);
  }

  const removeColour = (data) => {
    let cloneUserColoursData = {...userColoursData};
    cloneUserColoursData[selectedPalet] = cloneUserColoursData[selectedPalet].filter(item => item.id_product_attribute !== data.id_product_attribute);
    setUserColoursData(cloneUserColoursData);
  }

  const saveUserColours = () => {
    dispatch(featureAction.saveUserColours(userColoursData));
    isOpenUpdatePaletModal();
    setObject(userColoursData, "update");
  }

  const removeUserColours = () => {
    const cloneUserColoursData = {...userColoursData};
    delete cloneUserColoursData[selectedPalet];
    dispatch(featureAction.saveUserColours(cloneUserColoursData));
    isOpenUpdatePaletModal();
    setObject(cloneUserColoursData, "delete");
  }

  const userData = useSelector(state => state.Feature);
  const setObject = (colorData, type="update") => {
    const cloneUserData = {
      ...userData,
      userColours: {...colorData},
      isOpenUpdatePaletModal:false
    };
    if (isLoggedIn == 1) {
      //dispatch({type: featureAction.SET_OBJECTS_REQUEST, payload: cloneUserData});
      if(type==="update") {
        dispatch(featureAction.setPallet({type, customerId, updatedPallet:{[selectedPalet]: userColoursData[selectedPalet]}}));
      }else{
        dispatch(featureAction.setPallet({type, customerId, deletedPallet:selectedPalet}));
      }
    }else{
      localStorage.setItem("userData", JSON.stringify(cloneUserData));
      if(type==="update") {
        dispatch({
          type: featureAction.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "success",
            message: "Pallet is saved successfully"
          },
        })
      }else{
        dispatch({
          type: featureAction.OPEN_TOAST,
          payload: {
            isOpen: true,
            status: "success",
            message: "Pallet is deleted successfully"
          },
        })
      } 
      /*      const userData = JSON.parse(localStorage.getItem("userData"));*/
    }
  }

  const { t, i18n } = useTranslation();

  return (
    <div className='confirm-modal'>
      <Modal
        isOpen={isOpen}
        // onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            width: '74%',
            height: '684px',
            margin: 'auto',
            borderRadius: '0', // No border radius
            padding: '0'
          }
        }}
      >
        <div className='acp-tm-header' >
          <div className='acp-tm-header-title'>{t('PALLET CONFIG')}</div>
          <div className='acp-tm-header-close' onClick={isOpenUpdatePaletModal}>
            <img src={mdClose} alt='close' />
          </div>
        </div>
        <div className='acp-tm-body'>

          <div className='acp-tm-body-palet-list'>
            {
              Object.entries(parsedColoursDataByProductName).map( ([key, data], index ) => (
                <PaletListSm key={index} category={key} data={data} onClickHandle={ addColour } />
              ))
            }
          </div>

          <div className='acp-tm-body-setting-bar'>
            <div className='acp-xs-title'>{t('PALLET NAME')}</div>
            <div className='acp-settings-select-container'>
              <select className='acp-pallet-select' onChange={handleSelectedPaletChange} value={selectedPalet}>
                {
                  paletNames.map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))
                }
              </select>
            </div>
            <div className='acp-xs-title'>{t('IN YOUR PALLET')}</div>

            <div className='acp-setting-colours m-top'>
              {
                selectedPalet &&
                Object.entries(parseDataByObjectKey(userColoursData[selectedPalet], 'product_name')).map(([key, data], index) => (
                  <PaletListRm key={index} category={key} data={data} onClickHandle={ removeColour } />
                ))
              }
            </div>

            <div className='acp-tm-setting-buttons'>
              <div className='acp-delete-button' onClick={removeUserColours}>
                <svg className="acp-delete-icon" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.15717 13.0831C2.78745 13.0831 2.47169 12.9523 2.20988 12.6906C1.94822 12.4288 1.81738 12.113 1.81738 11.7433V1.99978H0.817383V0.916445H4.40072V0.0126953H8.40072V0.916445H11.984V1.99978H10.984V11.7344C10.984 12.1196 10.8545 12.4408 10.5955 12.6977C10.3365 12.9546 10.0194 13.0831 9.64426 13.0831H3.15717ZM9.90072 1.99978H2.90072V11.7433C2.90072 11.8182 2.92474 11.8796 2.9728 11.9277C3.02085 11.9758 3.08231 11.9998 3.15717 11.9998H9.64426C9.70843 11.9998 9.76718 11.973 9.82051 11.9196C9.87398 11.8662 9.90072 11.8075 9.90072 11.7433V1.99978ZM4.73738 10.4998H5.82051V3.49978H4.73738V10.4998ZM6.98092 10.4998H8.06405V3.49978H6.98092V10.4998Z" fill="#BF0000"/>
                </svg>{t('Delete pallet')}
              </div>
              <div className='acp-save-button' onClick={saveUserColours}>
                {t('Save')}
              </div>
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default UpdatePaletModal;
