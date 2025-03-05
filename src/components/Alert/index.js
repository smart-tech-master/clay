import React from 'react';

import './Alert.css';
import info from '../../assets/images/info.svg';

function Alert({ text }) {
  return (
    <div className='alert m-top' >
      <img src={info} alt='info' />
      <span>{ text }</span>
    </div>
  );
}

export default Alert;