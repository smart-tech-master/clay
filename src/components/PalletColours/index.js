import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import statusAction from '../../redux/status/actions';
import { parseDataByCategory } from "utils/common";
import Menu from "./Menu";

import './PalletColours.css';

import PaletListMd from "../PaletListCategory/PaletListMd";

function PalletColours() {
  const dispatch = useDispatch();
  const userPaletData = useSelector((state) => state.Status.userPaletData);
  const paletNames = Object.keys(userPaletData);
  const claysOnCanvas = useSelector((state) => state.Status.claysDataOnCanvas);

  useEffect(()=>{
    if(paletNames.length === 1){
      setSelectedPalet(paletNames[0]);
    }
  }, [paletNames]);

  const [selectedPalet, setSelectedPalet] = useState("");

  const handleSelectedPaletChange = (event) => {
    setSelectedPalet(event.target.value);
  }

  const addClayOnCanvas = (data) => {
    if(claysOnCanvas.length < 4) {
      dispatch(statusAction.addClayOnCanvas(data));
    }
  }

  return (
    <div className='toolbar-pallet-color-container m-bottom'>
      <Menu/>

      <div style={{paddingBottom: '10px'}}>
        <select className='pallet-select' onChange={handleSelectedPaletChange} value={selectedPalet}>
          {
            paletNames.map(key => (
              <option key={key} value={key}>{key}</option>
            ))
          }
        </select>
      </div>

      <div className='colours m-top'>
        {
          selectedPalet &&
          Object.entries(parseDataByCategory(userPaletData[selectedPalet])).map(([key, data], index) => (
            <PaletListMd key={index} category={key} data={data} onClickHandle={addClayOnCanvas} />
          ))
        }
      </div>
    </div>
  );
}

export default PalletColours;