import React, { useState } from 'react';
import {useSelector} from "react-redux";
import './ClaySm.css';

const ClaySm = ({ src, name, onClickHandle }) => {
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
    height: '33px',
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

  // hovered name font
  const normalNameStyle = {
    fontSize: '10px',
  }
  const hoveredNameStyle = {
    fontSize: '12px',
  }

  const smallNameStyle = {
    fontSize: '7px',
  }
  const hoveredSmallNameStyle = {
    fontSize: '8px',
  }

  return (
    <div
      className='acp-clay-container-sm'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='acp-clay' style={ isHovered ? hoveredBackgroundStyle : normalBackgroundStyle } onClick={onClickHandle}>
        <img
          src={ Add }
          alt='info'
          style={ isHovered ? showAddButtonStyle : hideAddButtonStyle }
        />
      </div>
      <div className='acp-name' style={ isHovered ? (name.length > 5 ? hoveredSmallNameStyle : hoveredNameStyle) : (name.length > 5 ? smallNameStyle : normalNameStyle) }>
        { name }
      </div>
    </div>
  );
}

export default ClaySm;