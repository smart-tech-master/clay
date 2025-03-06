import React from 'react';
import RemoveClay from "components/ClaySizeCategory/RemoveClay";
import PaletListRmPrettier from "./paletListRmPrettier";
import {useSelector} from "react-redux";

const PaletListRm = ( { category, data, onClickHandle } ) => {
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  console.log('category', category);
  console.log('data', data)
  return (
    <div>
      <div className='sm-title fw-500'>{ category }</div>
      <div className='colors d-flex'>
        {
          data.map((item, index) => (
            <RemoveClay key={index} id={item.id_product_attribute} src={baseUrl+item.color_image} name={item.color_name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListRmPrettier />
      </div>
    </div>
  );
}

export default PaletListRm