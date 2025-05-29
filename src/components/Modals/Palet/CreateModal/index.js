import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import statusAction from '../../../../redux/status/actions';
import featureAction from '../../../../redux/feature/actions';
import { parseDataByCategory, parseDataByObjectKey } from "utils/common";

import PaletListSm from "components/PaletListCategory/PaletListSm";
import PaletListRm from "components/PaletListCategory/PaletListRm";

import 'components/Modals/TemplateModal/TemplateModal.css';

import { useTranslation } from "react-i18next";

Modal.setAppElement('#root');

function CreatePaletModal() {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const mdClose = process.env.PUBLIC_URL + assetsPath + 'images/md-close.svg';
  
  // start of backend integration
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Feature.isOpenCreatePaletModal);
  const isOpenCreatePaletModal = () => {
    dispatch(statusAction.isOpenCreatePaletModal());
  }

  const colours = useSelector(state => state.Feature.colours);
  const parsedColoursDataByProductName = parseDataByObjectKey(colours, 'product_name');

  const [userColoursData, setUserColoursData] = React.useState({
    userPaletName: 'my palet',
    userColours: []
  });


  const addUserColour = (data) => {
    const exist = userColoursData.userColours.some(item => item.id_product_attribute === data.id_product_attribute);
    if(exist) return;

    setUserColoursData({
      ...userColoursData,
      userColours: [...userColoursData.userColours, data]
    });
  };

  const removeUserColour = (data) => {
    const removedData= userColoursData.userColours.filter(item => item.id_product_attribute !== data.id_product_attribute);

    setUserColoursData({
      ...userColoursData,
      userColours: [...removedData]
    });
  };

  const createUserColours = () => {
    dispatch(featureAction.createUserColours({[userColoursData.userPaletName]: userColoursData.userColours}));
    isOpenCreatePaletModal();

    setObject();
  }

  const handleUserPaletNameChange = (event) => {
    setUserColoursData({
      ...userColoursData,
      userPaletName: event.target.value
    });
  };


  const userData = useSelector(state => state.Feature);
  const setObject = () => {
    const cloneUserData = {
      ...userData,
      userColours: {[userColoursData.userPaletName]: userColoursData.userColours},
      isOpenCreatePaletModal:false
    };
    if (cloneUserData.isLoggedIn && cloneUserData.customerId) {
      dispatch({type: featureAction.SET_OBJECTS_REQUEST, payload: cloneUserData});
    }else{
      localStorage.setItem("userData", JSON.stringify(cloneUserData));
      /*      const userData = JSON.parse(localStorage.getItem("userData"));*/
    }
  }
  // end of backend ingration

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
        <div className='tm-header' >
          <div className='tm-header-title'>{t('PALLET CONFIG')}</div>
          <div className='tm-header-close' onClick={isOpenCreatePaletModal}>
            <img src={mdClose} alt='close' />
          </div>
        </div>
        <div className='tm-body'>

          <div className='tm-body-palet-list'>
            {
              Object.entries(parsedColoursDataByProductName).map( ([key, data], index ) => (
                <PaletListSm key={index} category={key} data={data} onClickHandle={ addUserColour } />
              ))
            }
          </div>

          <div className='tm-body-setting-bar'>
            <div className='xs-title'>{t('PALLET NAME')}</div>
            <div className='settings-select-container'>
              <input
                type="text"
                value={userColoursData.userPaletName}
                onChange={handleUserPaletNameChange}
              />
            </div>
            <div className='xs-title'>{t('IN YOUR PALLET')}</div>

            <div className='setting-colours m-top'>
              {
                Object.entries(parseDataByObjectKey(userColoursData.userColours, 'product_name')).map( ([key, data], index ) => (
                  <PaletListRm key={index} category={key} data={data} onClickHandle={ removeUserColour } />
                ))
              }
            </div>

            <div className='tm-setting-buttons'>
              <div></div>
              <div className='save-button' onClick={createUserColours}>
                {t('Create')}
              </div>
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default CreatePaletModal;
