import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusActions from "../../../redux/status/actions";
import featureActions from "../../../redux/feature/actions";
import { truncateToTwoDecimals } from "utils/common";

import ActionButtons from "../../ActionButtons";


const ClaysOnCanvas = ({category, data}) => {
  /*api integration start*/
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  const dispatch = useDispatch();
  const coloursOnCanvas = useSelector((state) => state.Feature.coloursOnCanvas);
  const priceData = useSelector((state) => state.Feature.priceData);
  const [size, setSize] = useState({});
  const [price, setPrice] = useState({});

  useEffect(() => {
    const initSize = priceData.reduce((acc, item) => {
      //console.log('item.name', item.name);
      acc[item.id_product_attribute] = item.m2;
      return acc;
    }, {});
    setSize(initSize);

    const initPrice = coloursOnCanvas.reduce((acc, item) => {
      acc[item.id_product_attribute] = truncateToTwoDecimals(item.price / item.m2);
      return acc;
    }, {});
    setPrice(initPrice);
  }, [data]);

  /*api integration end*/

  const removeItem = (id) => {
    dispatch(statusActions.confirmModalActionDefine({
      type: featureActions.REMOVE_COLOUR_0N_CANVAS,
      payload: id,
    }));
  }

/*  useEffect(() => {
    dispatch(featureActions.updateSize({size, price}));
  }, [size]);*/


  const handleInputChange = (id, value) => {

      setSize(prevSize => {
        const newSize = { ...prevSize, [id]: value };
        dispatch(featureActions.updateSize({ size: newSize, price }));
        return newSize;
      });

  };

/*  console.log('size, price', size, price);*/

  return (
    <>
      <div className='sm-title'>{category}</div>
      {
        data.map((item, index) => (
          <div key={index} className='oncanvas-grid-row d-flex jc-space-between'>
            <div className='oncanvas-grid-clay'>
              <img src={baseUrl+item.color_image} alt='color'/>
            </div>
            <div>
              <input
                type='number'
                value={size[item.id_product_attribute]}
                onChange={(e) =>
                  {
                    console.log("e.target.value", e.target.value);
                    if(e.target.value === 0 || e.target.value ===undefined || e.target.value === null || e.target.value ==='') {
                      return;
                    }else{
                      handleInputChange(item.id_product_attribute, e.target.value)
                    }
                  }
                }
              />
            </div>
            <div>€{truncateToTwoDecimals(size[item.id_product_attribute] * price[item.id_product_attribute])}</div>
            <ActionButtons data={item} id={item.id_product_attribute} name={item.color_name} src={baseUrl+item.color_image} removeItem={removeItem}/>
          </div>
        ))
      }
    </>
  );
};

export default ClaysOnCanvas;