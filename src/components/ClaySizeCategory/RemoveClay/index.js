import React, { useState } from 'react';
import {useSelector} from "react-redux";
import './RemoveClay.css';

const RemoveClay = ({ src, name, onClickHandle }) => {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const removeClay = process.env.PUBLIC_URL + assetsPath + 'images/remove-clay.png';

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
      className='acp-remove-container'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='acp-clay' style={ isHovered ? hoveredBackgroundStyle : normalBackgroundStyle }>
        <img
          src={ removeClay }
          alt='info'
          style={ isHovered ? hoveredAddButtonStyle : normalAddButtonStyle }
          onClick={onClickHandle}
        />
      </div>
      <div className='acp-name'>
        { name }
      </div>
    </div>
  );
}

export default RemoveClay;