import React from 'react';

import './ClayLg.css';

const ClayLg = ({ src, name }) => {
  // background
  const normalBackgroundStyle = {
    backgroundImage: `url("${src}")`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className='container-lg'
    >
      <div className='clay' style={ normalBackgroundStyle }>
      </div>
      <div className='name'>
        { name }
      </div>
    </div>
  );
}

export default ClayLg;