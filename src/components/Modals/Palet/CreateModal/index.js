import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import statusAction from '../../../../redux/status/actions';
import { parseDataByCategory, parseDataByObjectKey } from "utils/common";

import PaletListSm from "components/PaletListCategory/PaletListSm";
import PaletListRm from "components/PaletListCategory/PaletListRm";

import 'components/Modals/TemplateModal/TemplateModal.css';
import mdClose from 'assets/images/md-close.svg';

Modal.setAppElement('#root');

function CreatePaletModal() {
  // start of backend integration
  const colours = useSelector(state => state.Feature.colours);
  const parsedColoursDataByProductName = parseDataByObjectKey(colours, 'product_name');
  console.log('parsedColoursDataByProductName', parsedColoursDataByProductName);

  const isOpen = useSelector((state) => state.Feature.isOpenCreatePaletModal);


  // end of backend ingration
  const [userPalet, setUserPalet] = React.useState({
    userPaletName: 'my palet',
    userPaletData: []
  });

  const dispatch = useDispatch();

/*  const isOpen = useSelector((state) => state.Status.isOpenCreatePaletModal);*/
  const isOpenCreatePaletModal = () => {
    dispatch(statusAction.isOpenCreatePaletModal());
  }

  const parsedPaletData = parseDataByCategory(
    useSelector((state) => state.Status.paletData)
  );

  const parsedUserPaletData = parseDataByCategory(userPalet.userPaletData);

  const handleUserPaletNameChange = (event) => {
    setUserPalet({
      ...userPalet,
      userPaletName: event.target.value
    });
  };

  const addUserPaletData = (data) => {
    const exist = userPalet.userPaletData.some(item => item.name === data.name);
    if(exist) return;

    setUserPalet({
      ...userPalet,
      userPaletData: [...userPalet.userPaletData, data]
    });
  };

  const removeUserPaletData = (data) => {
    const removedData= userPalet.userPaletData.filter(item => item.name !== data.name);

    setUserPalet({
      ...userPalet,
      userPaletData: [...removedData]
    });
  };

  const createUserPalet = () => {
    dispatch(statusAction.createUserPalet({ [userPalet.userPaletName]: userPalet.userPaletData }));
    isOpenCreatePaletModal();
  }

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
          <div className='tm-header-title'>PALET CONFIG</div>
          <div className='tm-header-close' onClick={isOpenCreatePaletModal}>
            <img src={mdClose} alt='close' />
          </div>
        </div>
        <div className='tm-body'>

          <div className='tm-body-palet-list'>
            {
              Object.entries(parsedPaletData).map( ([key, data], index ) => (
                <PaletListSm key={index} category={key} data={data} onClickHandle={ addUserPaletData } />
              ))
            }
          </div>

          <div className='tm-body-setting-bar'>
            <div className='xs-title'>PALLET NAME</div>
            <div className='settings-select-container'>
              <input
                type="text"
                value={userPalet.userPaletName}
                onChange={handleUserPaletNameChange}
              />
            </div>
            <div className='xs-title'>IN YOUR PALLET</div>

            <div className='setting-colours m-top'>
              {
                Object.entries(parsedColoursDataByProductName).map( ([key, data], index ) => (
                  <PaletListRm key={index} category={key} data={data} onClickHandle={ removeUserPaletData } />
                ))
              }
            </div>

            <div className='tm-setting-buttons'>
              <div></div>
              {/*              <div className='delete-button'>
                <svg className="delete-icon" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.15717 13.0831C2.78745 13.0831 2.47169 12.9523 2.20988 12.6906C1.94822 12.4288 1.81738 12.113 1.81738 11.7433V1.99978H0.817383V0.916445H4.40072V0.0126953H8.40072V0.916445H11.984V1.99978H10.984V11.7344C10.984 12.1196 10.8545 12.4408 10.5955 12.6977C10.3365 12.9546 10.0194 13.0831 9.64426 13.0831H3.15717ZM9.90072 1.99978H2.90072V11.7433C2.90072 11.8182 2.92474 11.8796 2.9728 11.9277C3.02085 11.9758 3.08231 11.9998 3.15717 11.9998H9.64426C9.70843 11.9998 9.76718 11.973 9.82051 11.9196C9.87398 11.8662 9.90072 11.8075 9.90072 11.7433V1.99978ZM4.73738 10.4998H5.82051V3.49978H4.73738V10.4998ZM6.98092 10.4998H8.06405V3.49978H6.98092V10.4998Z" fill="#BF0000"/>
                </svg>Delete pallet
              </div>*/}
              <div className='save-button' onClick={createUserPalet}>
                Create
              </div>
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default CreatePaletModal;
