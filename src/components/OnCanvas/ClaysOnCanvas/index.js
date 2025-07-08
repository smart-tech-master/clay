import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusActions from "../../../redux/status/actions";
import featureActions from "../../../redux/feature/actions";
import { truncateToTwoDecimals } from "utils/common";
import { getQuery, postQuery } from 'utils/api';

import ActionButtons from "../../ActionButtons";


const ClaysOnCanvas = ({category, data}) => {
  // get price
  const rootElement = document.getElementById('root');
  const calculatepriceEndPoint = rootElement?.getAttribute('data-calculateprice') || '';

  const getCalculatedData = async (id, size) => {
    // response data format
    // {
    //   ...
    //   data: {
    //     price: price value
    //   } 
    // }

    try {
      // const response = await postQuery(
      //   calculatepriceEndPoint,
      //   {
      //     action: 'calculateprice',
      //     payload: {
      //       id, // id_product_attribute
      //       size
      //     }
      //   }
      // );

      const response = await getQuery(
        'https://clay.powdev.lt/module/revisualizer/cart?ajax=1&action=calculateprice'
      );
  
      const price = response?.data?.price;
  
      // If price is undefined/null/NaN, fallback to 0
      return typeof price === 'number' && !isNaN(price) ? price : 0;
  
    } catch (error) {
      console.error('Error in getCalculatedData:', error);
      return 0;
    }
  }

  /*api integration start*/
  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  const dispatch = useDispatch();
  const coloursOnCanvas = useSelector((state) => state.Feature.coloursOnCanvas);
  const priceData = useSelector((state) => state.Feature.priceData);
  const [size, setSize] = useState({});
  const [price, setPrice] = useState({});

  // useEffect(() => {

  //   const init = async () => {
  //     // Initialize size (sync)
  //     const initSize = priceData.reduce((acc, item) => {
  //       acc[item.id_product_attribute] = item.m2;
  //       return acc;
  //     }, {});
  //     setSize(initSize);
  
  //     // Initialize price (async)
  //     const priceEntries = await Promise.all(
  //       coloursOnCanvas.map(async (item) => {
  //         const price = await getCalculatedData(item.id_product_attribute, item.m2);
  //         return [item.id_product_attribute, price];
  //       })
  //     );
  
  //     const initPrice = Object.fromEntries(priceEntries);
  //     setPrice(initPrice);
  //   };
  
  //   if (data.length > 0) {
  //     init();
  //   }
  // }, [data]);

  useEffect(() => {
   // const timeout = setTimeout(() => {
      const init = async () => {
        // Initialize size (sync)
        const initSize = priceData.reduce((acc, item) => {
          acc[item.id_product_attribute] = item.m2;
          return acc;
        }, {});
        setSize(initSize);
    
        // Initialize price (async)
        const priceEntries = await Promise.all(
          coloursOnCanvas.map(async (item) => {
            const price = await getCalculatedData(item.id_product_attribute, item.m2);
            return [item.id_product_attribute, price];
          })
        );
    
        const initPrice = Object.fromEntries(priceEntries);
        setPrice(initPrice);
      };
    
      if (data.length > 0) {
        init();
      }
    //}, 200);
  
    //return () => clearTimeout(timeout);
  }, []);

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


  const handleInputChange = async (id, value) => {
      // setSize(prevSize => {
      //   const newSize = { ...prevSize, [id]: value };
      //   dispatch(featureActions.updateSize({ size: newSize, price }));
      //   return newSize;
      // });

      const newSize = { ...size, [id]: value };
      setSize(newSize);
    
      const _price = await getCalculatedData(id, value);
      const newPrice = { ...price, [id]: _price };
      setPrice(newPrice);
    
      dispatch(featureActions.updateSize({ size: newSize, price: newPrice }));
  };

/*  console.log('size, price', size, price);*/

  return (
    <>
      <div className='acp-sm-title'>{category}</div>
      {
        data.map((item, index) => (
          <div key={index} className='acp-oncanvas-grid-row acp-d-flex acp-jc-space-between'>
            <div className='acp-oncanvas-grid-clay'>
              <img src={baseUrl+item.color_image} alt='color'/>
            </div>
            <div>
              <input
                className='acp-input'
                type='number'
                value={size[item.id_product_attribute]}
                onChange={(e) =>
                  {
                    //console.log("e.target.value", e.target.value);
                    if(e.target.value === 0 || e.target.value ===undefined || e.target.value === null || e.target.value ==='') {
                      return;
                    }else{
                      handleInputChange(item.id_product_attribute, e.target.value)
                    }
                  }
                }
              />
            </div>
            <div className='acp-unit-price'>
              €{truncateToTwoDecimals(price[item.id_product_attribute])}  
            </div>
            <ActionButtons data={item} id={item.id_product_attribute} name={item.color_name} src={baseUrl+item.color_image} removeItem={removeItem}/>
          </div>
        ))
      }
    </>
  );
};

export default ClaysOnCanvas;