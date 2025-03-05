import React from 'react';
import ClaySm from "components/ClaySizeCategory/ClaySm";
import PaletListSmPrettier from "./paletListSmPrettier";

const PaletListSm = ({ category, data, onClickHandle }) => {
  return (
    <div>
      <div className='sm-title fw-500'>{category}</div>
      <div className='colors d-flex'>
        {
          data.map((item, index) => (
            <ClaySm key={index} src={item.src} name={item.name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListSmPrettier />
      </div>
    </div>
  );
}

export default  PaletListSm;