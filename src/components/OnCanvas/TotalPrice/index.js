import React from 'react';
import {useSelector} from "react-redux";
import { truncateToTwoDecimals } from "utils/common";

import Title from "../../Title";

import {languageData} from "data/languageData";

const TotalPrice = () => {
  const totalPrice = (useSelector(state => state.Feature.priceData)).reduce((sum, item) => sum + item.price, 0);

  const language = useSelector(state => state.Feature.language);
  return(
    <>
      <Title title={`${languageData[language]['TOTAL']}: €${truncateToTwoDecimals(totalPrice)}`}/>
    </>
  )
}

export default  TotalPrice;