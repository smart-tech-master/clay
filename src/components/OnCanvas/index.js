import React, { useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import html2pdf from "html2pdf.js";

import {parseDataByCategory} from "../../utils/common";
import statusAction from "../../redux/status/actions";

import "./OnCanvas.css";
import Title from "../Title";

import image1 from '../../assets/images/clays/1_B.png';
import downloadPdf from '../../assets/images/download-pdf.svg';

import ClaysOnCanvas from "./ClaysOnCanvas";


function OnCanvas() {
  const dispatch = useDispatch();
  // pdf generate test
  const contentRef = useRef();
  const generatePDF = () => {
    dispatch(statusAction.dowloadPdf()); // First call immediately

    setTimeout(() => {
      dispatch(statusAction.dowloadPdf()); // Second call after 1 second
    }, 1000); // Delay in milliseconds (1000ms = 1s)
  };

  const claysOnCanvas = parseDataByCategory(useSelector(state => state.Status.claysDataOnCanvas));

  return (
    <div className="oncanvas-grid-container m-top" ref={contentRef}>

      <Title title='ON CANVAS' />

      <div className='oncanvas-grid'>

        <div className='header d-flex'>
          <div>Colour</div>
          <div>M<sup>2</sup></div>
          <div>Total</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <div className='oncanvas-grid-body'>
          {
            Object.entries(claysOnCanvas).map( ([key, data], index ) => (
              <ClaysOnCanvas key={index} category={key} data={data} />
            ))
          }
        </div>

      </div>

      <div className='checkout jc-space-between'>
        <Title title='TOTAL: €489.66' />
        <div className='d-flex'>
          <div className='download-pdf' onClick={generatePDF}>
            <img src={downloadPdf} alt='color' />
          </div>
          <div className='add-to-cart'>Add to cart</div>
        </div>
      </div>
    </div>
  );
}

export default OnCanvas;