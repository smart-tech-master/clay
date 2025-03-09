import React from 'react';
import {useSelector} from "react-redux";
import { truncateToTwoDecimals } from "utils/common";
import { useTranslation } from "react-i18next";

const Table = () => {
  const totalPrice = (useSelector(state => state.Feature.priceData)).reduce((sum, item) => sum + item.price, 0);
  const priceData = useSelector(state => state.Feature.priceData);

  const { t, i18n } = useTranslation();
  return(
    <>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>{t('Colour')}</th>
              <th>M²</th>
              <th>{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
          {
            priceData.map(item => {
              return (
                <tr>
                  <td>{item.color_name}</td>
                  <td>{item.m2}</td>
                  <td>€{truncateToTwoDecimals(item.price)}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <div className='total-price'>
        <div>{t('Total')}:</div>
        <div>€{truncateToTwoDecimals(totalPrice)}</div>
      </div>
    </>
  )
}

export default Table;