import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import statusAction from '../../redux/status/actions';
import featureAction from '../../redux/feature/actions';
import {parseDataByCategory, parseDataByObjectKey} from "utils/common";
import Menu from "./Menu";

import './PalletColours.css';

import PaletListMd from "../PaletListCategory/PaletListMd";

function PalletColours() {
  /*api integration start*/
  const dispatch = useDispatch();
  const userColours = useSelector((state) => state.Feature.userColours);
  const paletNames = Object.keys(userColours);
  const coloursOnCanvas = useSelector((state) => state.Feature.coloursOnCanvas);
  /*api integration end*/

  useEffect(()=>{
    if(paletNames.length === 1){
      setSelectedPalet(paletNames[0]);
    }
  }, [paletNames]);

  const [selectedPalet, setSelectedPalet] = useState("");

  const handleSelectedPaletChange = (event) => {
    setSelectedPalet(event.target.value);
  }

  const addColourOnCanvas = (data) => {
    if(coloursOnCanvas.length < 4) {
/*      dispatch(statusAction.addClayOnCanvas(data));*/
      dispatch(featureAction.addColourOnCanvas(data));
    }
  }

  return (
    <div className='acp-toolbar-pallet-color-container'>
      <Menu/>

      <div style={{paddingBottom: '10px'}}>
        <select className='acp-pallet-select' onChange={handleSelectedPaletChange} value={selectedPalet}>
          {
            paletNames.map(key => (
              <option key={key} value={key}>{key}</option>
            ))
          }
        </select>
      </div>

      <div className='acp-colours m-top'>
        {
          selectedPalet &&
          Object.entries(parseDataByObjectKey(userColours[selectedPalet], 'product_name')).map(([key, data], index) => (
            <PaletListMd key={index} category={key} data={data} onClickHandle={addColourOnCanvas} />
          ))
        }
      </div>
    </div>
  );
}

export default PalletColours;