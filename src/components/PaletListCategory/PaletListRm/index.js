import React from 'react';
import RemoveClay from "components/ClaySizeCategory/RemoveClay";
import PaletListRmPrettier from "./paletListRmPrettier";

const PaletListRm = ( { category, data, onClickHandle } ) => {
  return (
    <div>
      <div className='sm-title fw-500'>{ category }</div>
      <div className='colors d-flex'>
        {
          data.map((item, index) => (
            <RemoveClay key={index} src={item.src} name={item.name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListRmPrettier />
      </div>
    </div>
  );
}

export default PaletListRm