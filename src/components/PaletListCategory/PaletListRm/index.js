import React from 'react';
import RemoveClay from "components/ClaySizeCategory/RemoveClay";
import PaletListRmPrettier from "./paletListRmPrettier";
import {useSelector} from "react-redux";

const PaletListRm = ( { category, data, onClickHandle } ) => {
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  return (
    <div>
      <div className='acp-sm-title acp-fw-500'>{ category }</div>
      <div className='acp-colors acp-d-flex'>
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