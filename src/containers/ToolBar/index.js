import React from 'react';

import './ToolBar.css';

import Title from "../../components/Title";
import Alert from "../../components/Alert";
import Room from "../../components/Room";
import PalletColours from "../../components/PalletColours";
import OnCanvas from "../../components/OnCanvas";


const ToolBar = () => {
  return (
    <div className="Toolbar min-vh-100">
      <div style={{height:'20vh'}}>
        <Title title='CONFIG' />
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