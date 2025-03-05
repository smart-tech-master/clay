import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import statusActions from "../../../redux/status/actions";

import ActionButtons from "../../ActionButtons";


const ClaysOnCanvas = ({category, data}) => {
  const dispatch = useDispatch();

  const removeItem = (name) => {
    dispatch(statusActions.confirmModalActionDefine({
      type: statusActions.REMOVE_CALY_ON_CANVAS,
      payload: name,
    }));
  }

  console.log('data.length', data.length)

  const priceData = useSelector((state) => state.Status.priceDataOfClaysOnCanvas);
  const [size, setSize] = useState({});
  const [price, setPrice] = useState({});

  useEffect(() => {
    const initSize = priceData.reduce((acc, item) => {
      console.log('item.name', item.name);
      acc[item.name] = item.size;
      return acc;
    }, {});
    setSize(initSize);

    const initPrice = priceData.reduce((acc, item) => {
      acc[item.name] = item.price;
      return acc;
    }, {});
    setPrice(initPrice);
  }, [data]);

  useEffect(() => {
    dispatch(statusActions.updateSizeOnCanvas(size))
  }, [size]);


  const handleInputChange = (name, value) => {
    setSize({
      ...size,
      [name]: value
    })
  };

  console.log('size, price', size, price);

  return (
    <>
      <div className='sm-title'>{category}</div>
      {
        data.map((item, index) => (
          <div key={index} className='oncanvas-grid-row d-flex jc-space-between'>
            <div className='oncanvas-grid-clay'>
              <img src={item.src} alt='color'/>
            </div>
            <div>
              <input
                type='number'
                value={size[item.name]}
                onChange={(e) =>
                  handleInputChange(item.name, e.target.value)
                }
              />
            </div>
            <div>€{size[item.name] * price[item.name]}</div>
            <ActionButtons data={item} name={item.name} src={item.src} removeItem={removeItem}/>
          </div>
        ))
      }
    </>
  );
}

export default ClaysOnCanvas;