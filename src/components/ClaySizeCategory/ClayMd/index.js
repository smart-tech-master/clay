import React, { useState } from 'react';
import {useSelector} from "react-redux";
import './ClayMd.css';

const ClayMd = ({ src, name, onClickHandle }) => {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const Add = process.env.PUBLIC_URL + assetsPath + 'images/add.svg';

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

  // button style
  const showAddButtonStyle = {
    display : 'inline-block'
  }

  const hideAddButtonStyle = {
    display : 'none'
  }

  return (
    <div
      className='acp-clay-container-md'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className='acp-clay'
        style={ isHovered ? hoveredBackgroundStyle : normalBackgroundStyle }
        onClick={onClickHandle}
      >
        <img src={ Add } alt='info' style={ isHovered ? showAddButtonStyle : hideAddButtonStyle }/>
      </div>
      <div className={name.length > 4 ? 'acp-small-name' : 'acp-name'}>
        { name }
      </div>
    </div>
  );
}

export default ClayMd;