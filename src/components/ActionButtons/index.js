import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../redux/status/actions";

import './ActionButtons.css';
import visibilityOn from '../../assets/images/visible-on.svg';
import visibilityOff from '../../assets/images/visible-off.svg';
import settings from '../../assets/images/settings.svg';
import remove from '../../assets/images/remove.svg';

function ActionButtons({data, name, src, removeItem}) {
  const dispatch = useDispatch();

  const updateVisibility = () => {
    dispatch(statusAction.updateVisibilityOnCanvas(name))
  }

  const UpdatedClayDataDefine = () => {
    dispatch(
      statusAction.updatedClayDataDefine({status: false,from:name, to:name, order: 1})
    )
  }

  const isOpenCanvasItemConfigModal = () => {
    UpdatedClayDataDefine();

    dispatch(
      statusAction.isOpenCanvasItemConfigModal()
    );
  };

  const isOpenConfirmModal = () => {
    removeItem(name);
    dispatch(
      statusAction.isOpenConfirmModal()
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