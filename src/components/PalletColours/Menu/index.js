import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../../redux/status/actions";
import featureActions from "../../../redux/feature/actions";
import {languageData} from "data/languageData";

import './Menu.css';
import settingsButton from '../../../assets/images/settings-lg.svg';
import createButton from '../../../assets/images/create.svg';
import Title from "../../Title";

function Menu() {
  const dispatch = useDispatch();

  const createPallet = () => {
    dispatch(featureActions.isOpenCreatePaletModal());
  };

  const updatePallet = () => {
    dispatch(featureActions.isOpenUpdatePaletModal());
  };

  const language = useSelector(state => state.Feature.language);

  return (
    <div className='d-flex space-between normal-font-style p-bottom'>
      <Title title={languageData[language]['PALLET COLOURS']} />
      <div className="d-flex">
        <div className="button settings-lg" onClick={updatePallet}>
          <img src={settingsButton} alt='button' />
        </div>
        <div className="button" onClick={createPallet}>
          <img src={createButton} alt='button' />
        </div>
      </div>
    </div>
  );
}

export default Menu;