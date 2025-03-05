import React from 'react';
import ClayMd from "components/ClaySizeCategory/ClayMd";
import PaletListMdPrettier from "./paletListMdPrettier";

const PaletListMd = ({ category, data, onClickHandle }) => {
  return (
    <div>
      <div className='sm-title fw-500'>{category}</div>
      <div className='clays d-flex'>
        {
          data.map((item, index) => (
            <ClayMd key={index} src={item.src} name={item.name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListMdPrettier />
      </div>
    </div>
  );
}

export default  PaletListMd;