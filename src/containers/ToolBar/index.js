import React from 'react';
import {useSelector} from "react-redux";

import './ToolBar.css';

import Title from "../../components/Title";
import Alert from "../../components/Alert";
import Room from "../../components/Room";
import PalletColours from "../../components/PalletColours";
import OnCanvas from "../../components/OnCanvas";

import {languageData} from "../../data/languageData";


const ToolBar = () => {
  const language = useSelector(state => state.Feature.language);
  return (
    <div className="Toolbar min-vh-100">
      <div style={{height:'20vh'}}>
        <Title title={languageData[language]['CONFIG']} />
        <Alert text='Log in to save your objects and pallets.' />
        <Room />
      </div>
      <div style={{height:'30vh'}}>
        <PalletColours />
      </div>
      <div style={{height:'50vh'}}>
        <OnCanvas />
      </div>
    </div>
  )
}

export default ToolBar;