import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../redux/status/actions";
import featureAction from "../../redux/feature/actions";

import './ActionButtons.css';

function ActionButtons({data, id, name, src, removeItem}) {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const visibilityOn = process.env.PUBLIC_URL + assetsPath + 'images/visible-on.svg';
  const visibilityOff = process.env.PUBLIC_URL + assetsPath + 'images/visible-off.svg';
  const settings = process.env.PUBLIC_URL + assetsPath + 'images/settings.svg';
  const remove = process.env.PUBLIC_URL + assetsPath + 'images/remove.svg';

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
    <div className='acp-action-buttons acp-d-flex' >
      <div className='acp-visibility' onClick={()=> { updateVisibility() }}>
        <img src={ data.visible ? visibilityOn : visibilityOff } alt='visibility' />
      </div>
      <div className='acp-settings' onClick={isOpenCanvasItemConfigModal}>
        <img src={settings} alt='settings' />
      </div>
      <div className='acp-remove'>
        <img src={remove} alt='remove' onClick={isOpenConfirmModal}/>
      </div>
    </div>
  );
}

export default ActionButtons;