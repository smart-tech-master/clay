import React from 'react';

import './Alert.css';

import {useSelector} from "react-redux";

function Alert({ text }) {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const info = process.env.PUBLIC_URL + assetsPath + 'images/info.svg';
  // console.log("info url", info);
  // console.log("assetsPath url", assetsPath);

  const isLoggedIn = useSelector(state => state.Feature.isLoggedIn);

  return isLoggedIn === 0 ? (
    <div className='acp-alert' >
      <img src={info} alt='info' />
      <span>{ text }</span>
    </div>
  ) : '';
}

export default Alert;