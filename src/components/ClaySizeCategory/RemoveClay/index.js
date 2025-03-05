import React, { useState } from 'react';

import './RemoveClay.css';
import removeClay from '../../../assets/images/remove-clay.png';

const RemoveClay = ({ src, name, onClickHandle }) => {
  const [isHovered, setIsHovered] = useState(false);

  // background
  const normalBackgroundStyle = {
    backgroundImage: `url("${src}")`,
    backgroundRepeat: 'no-repeat',
  };

  const hoveredBackgroundStyle = {
    background: `linear-gradient(rgba(128, 128, 128, 0.5), rgba(128, 128, 128, 0.5)),
                url(${src})`,
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply'
  };

  // removeButton
  const normalAddButtonStyle = {
    display : 'none',
  }

  const hoveredAddButtonStyle = {
    display : 'inline-block',
  }

  return (
    <div
      className='remove-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='clay' style={ isHovered ? hoveredBackgroundStyle : normalBackgroundStyle }>
        <img
          src={ removeClay }
          alt='info'
          style={ isHovered ? hoveredAddButtonStyle : normalAddButtonStyle }
          onClick={onClickHandle}
        />
      </div>
      <div className='name'>
        { name }
      </div>
    </div>
  );
}

export default RemoveClay;