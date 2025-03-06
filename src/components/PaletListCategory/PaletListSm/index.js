import React from 'react';
import { useSelector } from 'react-redux';

import ClaySm from "components/ClaySizeCategory/ClaySm";
import PaletListSmPrettier from "./paletListSmPrettier";

const PaletListSm = ({ category, data, onClickHandle }) => {
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  return (
    <div>
      <div className='sm-title fw-500'>{category}</div>
      <div className='colors d-flex'>
        {
          data.map((item, index) => (
            <ClaySm key={index} id={item.id_product_attribute} src={baseUrl+item.color_image} name={item.color_name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListSmPrettier />
      </div>
    </div>
  );
}

export default  PaletListSm;