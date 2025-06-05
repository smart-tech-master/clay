import React from 'react';
import {useSelector} from "react-redux";
import './ToolBar.css';

import Title from "../../components/Title";
import Alert from "../../components/Alert";
import Room from "../../components/Room";
import PalletColours from "../../components/PalletColours";
import OnCanvas from "../../components/OnCanvas";

import { useTranslation } from "react-i18next";

const ToolBar = () => {
  const { t } = useTranslation();

  const isLoggedIn = useSelector(state => state.Feature.isLoggedIn);

  return (
    <div className="acp-Toolbar acp-min-vh-100">
      <div style={{height:'20vh'}}>
        <Title title={t("CONFIG")} />
        {
          isLoggedIn == 1 ? (<br />) : (<Alert text={t("Log in to save your objects and pallets.")} />)
        }
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