import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../../redux/status/actions";
import featureActions from "../../../redux/feature/actions";
import { useTranslation } from "react-i18next";

import './Menu.css';
import Title from "../../Title";

function Menu() {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const settingsButton = process.env.PUBLIC_URL + assetsPath + 'images/settings-lg.svg';
  const createButton = process.env.PUBLIC_URL + assetsPath + 'images/create.svg';

  const dispatch = useDispatch();

  const createPallet = () => {
    dispatch(featureActions.isOpenCreatePaletModal());
  };

  const updatePallet = () => {
    dispatch(featureActions.isOpenUpdatePaletModal());
  };

  const { t, i18n } = useTranslation();

  return (
    <div className='acp-d-flex acp-space-between acp-normal-font-style acp-p-bottom'>
      <Title title={t('PALLET COLOURS')} />
      <div className="acp-d-flex">
        <div className="acp-button acp-settings-lg" onClick={updatePallet}>
          <img src={settingsButton} alt='button' />
        </div>
        <div className="acp-button" onClick={createPallet}>
          <img src={createButton} alt='button' />
        </div>
      </div>
    </div>
  );
}

export default Menu;