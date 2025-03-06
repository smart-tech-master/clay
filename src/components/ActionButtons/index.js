import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../redux/status/actions";
import featureAction from "../../redux/feature/actions";

import './ActionButtons.css';
import visibilityOn from '../../assets/images/visible-on.svg';
import visibilityOff from '../../assets/images/visible-off.svg';
import settings from '../../assets/images/settings.svg';
import remove from '../../assets/images/remove.svg';

function ActionButtons({data, id, name, src, removeItem}) {
  const dispatch = useDispatch();

  const updateVisibility = () => {
    dispatch(featureAction.updateVisibilityOnCanvas(id));
  }

  const updatedColourDefine = () => {
    dispatch(featureAction.updatedColourDataDefine({status: false,from:id, to:id, order: 0}));
  }

  const isOpenCanvasItemConfigModal = () => {
    updatedColourDefine(id);

    dispatch(
      featureAction.isOpenCanvasItemConfigModal()
    );
  };

  const isOpenConfirmModal = () => {
    removeItem(id);
    dispatch(
      featureAction.isOpenConfirmModal()
    );
  }

  return (
    <div className='action-buttons d-flex' >
      <div className='visibility' onClick={()=> { updateVisibility() }}>
        <img src={ data.visible ? visibilityOn : visibilityOff } alt='visibility' />
      </div>
      <div className='settings' onClick={isOpenCanvasItemConfigModal}>
        <img src={settings} alt='settings' />
      </div>
      <div className='remove'>
        <img src={remove} alt='remove' onClick={isOpenConfirmModal}/>
      </div>
    </div>
  );
}

export default ActionButtons;