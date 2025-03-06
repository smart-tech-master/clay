import React from 'react';
import {useSelector} from "react-redux";
import { truncateToTwoDecimals } from "utils/common";

import Title from "../../Title";

const TotalPrice = () => {
  const totalPrice = (useSelector(state => state.Feature.priceData)).reduce((sum, item) => sum + item.price, 0);

  return(
    <>
      <Title title={`TOTAL: €${truncateToTwoDecimals(totalPrice)}`}/>
    </>
  )
}

export default  TotalPrice;