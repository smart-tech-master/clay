import React, { useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import html2pdf from "html2pdf.js";

import {parseDataByCategory, parseDataByObjectKey} from "../../utils/common";
import statusAction from "../../redux/status/actions";
import featureAction from "../../redux/feature/actions";

import "./OnCanvas.css";
import Title from "../Title";
import TotalPrice from "./TotalPrice";

import image1 from '../../assets/images/clays/1_B.png';
import downloadPdf from '../../assets/images/download-pdf.svg';

import ClaysOnCanvas from "./ClaysOnCanvas";

import {languageData} from "data/languageData";

function OnCanvas() {
  /*api integration start*/
  const dispatch = useDispatch();
  const generatePDF = () => {
    dispatch(statusAction.dowloadPdf());
    setTimeout(() => {
      dispatch(statusAction.dowloadPdf()); // Second call after 1 second
    }, 1000); // Delay in milliseconds (1000ms = 1s)
  }

  const coloursOnCanvas = parseDataByObjectKey(useSelector(state => state.Feature.coloursOnCanvas), 'product_name');
  /*api integration end*/

  const userData = useSelector(state => state.Feature);
  const addToCart = () => {
    if (userData.isLoggedIn && userData.customerId) {
      const priceData = [...userData.priceData].map(item => {
        return {
          id_product_attribute: item.id_product_attribute,
          qty: item.m2,
        }
      });
      dispatch({type: featureAction.ADD_PRODUCTS_REQUEST, payload: priceData});
    }else{
      localStorage.setItem("productsData", JSON.stringify(userData.priceData));
      /*      const userData = JSON.parse(localStorage.getItem("priceData"));*/
    }
  }

  const language = useSelector(state => state.Feature.language);

  return (
    <div className="oncanvas-grid-container m-top">

      <Title title={languageData[language]['ON CANVAS']}/>

      <div className='oncanvas-grid'>

        <div className='header d-flex'>
          <div>{languageData[language]['Colour']}</div>
          <div>M<sup>2</sup></div>
          <div>{languageData[language]['Total']}</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <div className='oncanvas-grid-body'>
          {
            Object.entries(coloursOnCanvas).map(([key, data], index) => (
              <ClaysOnCanvas key={index} category={key} data={data}/>
            ))
          }
        </div>

      </div>

      <div className='checkout jc-space-between'>
        <TotalPrice />
        <div className='d-flex'>
          <div className='download-pdf' onClick={generatePDF}>
            <img src={downloadPdf} alt='color'/>
          </div>
          <div className='add-to-cart' onClick={addToCart}>{languageData[language]['Add to cart']}</div>
        </div>
      </div>
    </div>
  );
}

export default OnCanvas;