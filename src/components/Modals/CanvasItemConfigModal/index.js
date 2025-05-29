import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import featureAction from "../../../redux/feature/actions";

import './CanvasItemConfigModal.css';

import Title from "../../Title";
import ClayLg from "../../ClaySizeCategory/ClayLg";
import {parseDataByObjectKey} from "../../../utils/common";
import PaletListMd from "../../PaletListCategory/PaletListMd";

import { useTranslation } from "react-i18next";

Modal.setAppElement('#root');

function IsOpenCanvasItemConfig() {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const mdClose = process.env.PUBLIC_URL + assetsPath + 'images/md-close.svg';
  const noSelectedResize = process.env.PUBLIC_URL + assetsPath + 'images/settings/no-selected-resize.png';
  const noSelectedBackground = process.env.PUBLIC_URL + assetsPath + 'images/settings/no-selected-background.png';
  const noSelected1 = process.env.PUBLIC_URL + assetsPath + 'images/settings/no-selected-1.png';
  const noSelected2 = process.env.PUBLIC_URL + assetsPath + 'images/settings/no-selected-2.png';
  const noSelected3 = process.env.PUBLIC_URL + assetsPath + 'images/settings/no-selected-3.png';
  const selectedResize = process.env.PUBLIC_URL + assetsPath + 'images/settings/selected-resize.png';
  const selectedBackground = process.env.PUBLIC_URL + assetsPath + 'images/settings/selected-background.png';
  const selected1 = process.env.PUBLIC_URL + assetsPath + 'images/settings/selected-1.png';
  const selected2 = process.env.PUBLIC_URL + assetsPath + 'images/settings/selected-2.png';
  const selected3 = process.env.PUBLIC_URL + assetsPath + 'images/settings/selected-3.png';


  /*api integration start*/
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Feature.isOpenCanvasItemConfigModal);
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);

  const userColours = useSelector((state) => state.Feature.userColours);
  const paletNames = Object.keys(userColours);
  const updatedColour = useSelector((state) => state.Feature.updatedColour);

  const [selectedPalet, setSelectedPalet] = useState("");
  useEffect(() => {
    if (paletNames.length === 1) {
      setSelectedPalet(paletNames[0]);
    }
  }, [paletNames]);


  const handleSelectedPaletChange = (event) => {
    setSelectedPalet(event.target.value);
  }

  const isOpenCanvasItemConfigModal = () => {
    dispatch(featureAction.isOpenCanvasItemConfigModal());
  };

  const updateTo = (item) => {
    dispatch(featureAction.updateTo(item));
  }

  const updateStatus = () => {
    dispatch(featureAction.updateStatusOfUpdateColour(true));
    isOpenCanvasItemConfigModal();
  }

  // layer select
  const imagePairs = [
    /*{ id: 'resize', selected: selectedResize, noSelected: noSelectedResize },*/
    {id: 'resize', selected: noSelectedResize, noSelected: noSelectedResize, order: 4},
    {id: 'background', selected: selectedBackground, noSelected: noSelectedBackground, order: 0},
    {id: 'image1', selected: selected1, noSelected: noSelected1, order: 1},
    {id: 'image2', selected: selected2, noSelected: noSelected2, order: 2},
    {id: 'image3', selected: selected3, noSelected: noSelected3, order: 3}
  ];

  const [activeImage, setActiveImage] = useState(null);

  const coloursOnCanvas = useSelector((state) => state.Feature.coloursOnCanvas);
  const handleClick = (id) => {
    const selectedItem = imagePairs.filter(image => image.id === id)[0];
    if (selectedItem.order < coloursOnCanvas.length) {
      setActiveImage(id);
      dispatch(featureAction.updateOrder(selectedItem.order));
    }
  };

  const colourIds = coloursOnCanvas.map(colour => colour.id_product_attribute);
//const filteredUserPaletData =  userPaletData.filter(item => clayNames.some(clayName =>  clayName === item.name));

  useEffect(() => {
    setActiveImage(null);
  }, [isOpen]);

  const deleteColour = () => {
    dispatch(featureAction.removeColourOnCanvas(updatedColour.from.id_product_attribute));
    dispatch(featureAction.isOpenCanvasItemConfigModal());
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
            width: '627px',
            height: '611px',
            margin: 'auto',
            borderRadius: '0', // No border radius
            padding: '0'
          }
        }}
      >
        <div className='cicm-header'>
          <div className='cicm-header-title'>{t('CANVAS ITEM CONFIG')}</div>
          <div className='cicm-header-close' onClick={isOpenCanvasItemConfigModal}>
            <img src={mdClose} alt='close'/>
          </div>
        </div>
        <div className='cicm-body'>
          <div className='cicm-colour'>
            <div className='cicm-current-color'>
              <Title title='CURRENT COLOUR'/>
              <ClayLg src={baseUrl + updatedColour.to.color_image} name={updatedColour.to.color_name}/>
            </div>
            <div className='cicm-change-out-color'>
              <Title title={t('CHANGE OUT COLOUR')}/>
              <div style={{paddingBottom: "17px"}}>
                <select className='pallet-select'
                        onChange={handleSelectedPaletChange} value={selectedPalet}
                >
                  {
                    paletNames.map((key, index) => (
                      <option key={index} value={key}>{key}</option>
                    ))
                  }
                </select>
              </div>
              <div className='cicm-colours-list m-top'>
                {
                  selectedPalet &&
                  Object.entries(parseDataByObjectKey(userColours[selectedPalet], 'product_name')).map(([key, data], index) => {
                    let filteredData = data.filter((item) => !(colourIds.some(id => id === item.id_product_attribute)));
                    return <PaletListMd key={index} category={key} data={filteredData} onClickHandle={updateTo}/>
                  })
                }
              </div>
            </div>
          </div>
          <div className='cicm-layout'>
            <Title title={t('LAYOUT')}/>
            <div className='cicm-layout-settings'>
              {
                imagePairs.map(({id, selected, noSelected}, index) => (
                  <div key={index}>
                    <img
                      key={id}
                      src={activeImage === id ? selected : noSelected}
                      alt={id}
                      onClick={() => handleClick(id)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='cicm-footer'>
          <div className='delete-button' onClick={deleteColour}>
            <svg className="delete-icon" width="12" height="14" viewBox="0 0 12 14" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.15717 13.0831C2.78745 13.0831 2.47169 12.9523 2.20988 12.6906C1.94822 12.4288 1.81738 12.113 1.81738 11.7433V1.99978H0.817383V0.916445H4.40072V0.0126953H8.40072V0.916445H11.984V1.99978H10.984V11.7344C10.984 12.1196 10.8545 12.4408 10.5955 12.6977C10.3365 12.9546 10.0194 13.0831 9.64426 13.0831H3.15717ZM9.90072 1.99978H2.90072V11.7433C2.90072 11.8182 2.92474 11.8796 2.9728 11.9277C3.02085 11.9758 3.08231 11.9998 3.15717 11.9998H9.64426C9.70843 11.9998 9.76718 11.973 9.82051 11.9196C9.87398 11.8662 9.90072 11.8075 9.90072 11.7433V1.99978ZM4.73738 10.4998H5.82051V3.49978H4.73738V10.4998ZM6.98092 10.4998H8.06405V3.49978H6.98092V10.4998Z"
                fill="#BF0000"/>
            </svg>
            {t('Delete canvas')}
          </div>
          <div>
            <div className='cicm-footer-no' onClick={updateStatus}>{t('Save')}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default IsOpenCanvasItemConfig;
