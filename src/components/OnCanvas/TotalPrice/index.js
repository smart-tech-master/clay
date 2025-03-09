import React from 'react';
import {useSelector} from "react-redux";
import { truncateToTwoDecimals } from "utils/common";

import Title from "../../Title";

import { useTranslation } from "react-i18next";

const TotalPrice = () => {
  const totalPrice = (useSelector(state => state.Feature.priceData)).reduce((sum, item) => sum + item.price, 0);

  const { t, i18n } = useTranslation();
  return(
    <>
      <Title title={`${t('TOTAL')}: €${truncateToTwoDecimals(totalPrice)}`}/>
    </>
  )
}

export default  TotalPrice;