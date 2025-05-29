import React from 'react';
import {useSelector} from "react-redux";
import ClayMd from "components/ClaySizeCategory/ClayMd";
import PaletListMdPrettier from "./paletListMdPrettier";

const PaletListMd = ({ category, data, onClickHandle }) => {
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  return (
    <div>
      <div className='acp-sm-title acp-fw-500'>{category}</div>
      <div className='acp-clays acp-d-flex'>
        {
          data.map((item, index) => (
            <ClayMd key={index} id={item.id_product_attribute} src={baseUrl+item.color_image} name={item.color_name} onClickHandle={() => onClickHandle(item) }/>
          ))
        }
        <PaletListMdPrettier />
      </div>
    </div>
  );
}

export default  PaletListMd;