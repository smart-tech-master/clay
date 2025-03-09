import React from 'react';
import {useSelector} from "react-redux";
import { truncateToTwoDecimals } from "utils/common";
import {languageData} from "data/languageData";

const Table = () => {
  const totalPrice = (useSelector(state => state.Feature.priceData)).reduce((sum, item) => sum + item.price, 0);
  const priceData = useSelector(state => state.Feature.priceData);
  const language = useSelector(state => state.Feature.language);

  return(
    <>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>{languageData[language]['Colour']}</th>
              <th>M²</th>
              <th>{languageData[language]['Total']}</th>
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
        <div>{languageData[language]['Total']}:</div>
        <div>€{truncateToTwoDecimals(totalPrice)}</div>
      </div>
    </>
  )
}

export default Table;