import React from 'react';

import './Alert.css';
import info from '../../assets/images/info.svg';

import {useSelector} from "react-redux";

function Alert({ text }) {
  const isLoggedIn = useSelector(state => state.Feature.isLoggedIn);

  return isLoggedIn === 0 ? (
    <div className='alert m-top' >
      <img src={info} alt='info' />
      <span>{ text }</span>
    </div>
  ) : '';
}

export default Alert;