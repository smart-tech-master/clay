import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import {useDispatch, useSelector} from "react-redux";

import './Canvas.css';
import statusAction from "../../redux/status/actions";
import Logo from "assets/images/Logo.png"
import settings from "../../assets/images/settings.svg";
import remove from "../../assets/images/remove.svg";
import {compareArraysByName} from "../../utils/common";
import statusActions from "../../redux/status/actions";

const Canvas = () => {
  const rectsOptions = [
    { left: 750, top: 70, width: 200, height: 0 },
    { left: 100, top: 300, width: 200, height: 200 },
    { left: 400, top: 200, width: 200, height: 200 },
    { left: 700, top: 300, width: 200, height: 200 },
  ];

  const dispatch = useDispatch();
  const removeItem = (name) => {
    dispatch(statusActions.confirmModalActionDefine({
      type: statusActions.REMOVE_CALY_ON_CANVAS,
      payload: name,
    }));
    dispatch(
      statusAction.isOpenConfirmModal()
    );
  }
  const UpdatedClayDataDefine = (name) => {
    dispatch(
      statusAction.updatedClayDataDefine({status: false,from:name, to:name, order: 1})
    )
  }
  const isOpenCanvasItemConfigModal = (name) => {
    UpdatedClayDataDefine(name);

    dispatch(
      statusAction.isOpenCanvasItemConfigModal()
    );
  };

  const [rects, setRects] = useState([]);
  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);
  const updatedClayData = useSelector(state => state.Status.updatedClayData);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  /*  'name': {
      top: 0,
        left: 0,
        width: 0,
        height: 0,
        labelTop:0,
        labelLeft:0,
        html: null
    }*/
  const htmlRefs = useRef({});
  const metaInfo = useRef({})

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
      backgroundColor: '#f0f0f0', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance

    return () => {
      canvas.dispose(); // Dispose the canvas to prevent memory leaks
    };
  }, []);

  useEffect(() => {
    if(updatedClayData.status) {
      try {
        dispatch(statusAction.updatedClayData());
        dispatch(statusAction.updateStatusOfUpdatedClayData(false));
      } catch (error) {
        console.error('change background error:', error.message);
      }
    }
  }, [updatedClayData]);

  useEffect(() => {
    const compareResult = compareArraysByName(claysOnCanvas, rects);
    if(compareResult.onlyInArray1.length > 0) {
      setRects(prevState => [...prevState, compareResult.onlyInArray1[0]]);
    }

    if (compareResult.onlyInArray2.length > 0) {
      setRects(prevState => {
        return prevState.filter(r => r.name !== compareResult.onlyInArray2[0].name)
      });
    }

    if (compareResult.onlyInArray1.length === compareResult.onlyInArray2.length && compareResult.commonItems.length > 0) {
      setRects([...claysOnCanvas]);
      console.log('visible update');
    }

  }, [claysOnCanvas]);

  useEffect(() => {
    for(let i = 0; i < rects.length; i++) {
      if(!metaInfo.current.hasOwnProperty(rects[i].name)) {
        if(i === 0) {
          metaInfo.current[rects[i].name] = {
            top: rectsOptions[i].top,
            left: rectsOptions[i].left,
            width: rectsOptions[i].width,
            height: rectsOptions[i].height
          }
        }else{
          metaInfo.current[rects[i].name] = {
            top: rectsOptions[i].top,
            left: rectsOptions[i].left,
            width: rectsOptions[i].width,
            height: rectsOptions[i].height
          }
        }
      }
    }

    repaintCanvas();
  }, [rects]);

  const repaintCanvas = () => {
    const canvas = canvasInstance;
    if(canvas) {
      canvas.clear();
      console.log('rects', rects);
      console.log('meta info', metaInfo);
      for(let i = 0; i < rects.length; i++) {

        let rect = new fabric.Rect({
          name: rects[i].name,
          top: metaInfo.current[rects[i].name].top,
          left: metaInfo.current[rects[i].name].left,
          width: rects[i].visible ? metaInfo.current[rects[i].name].width : 0,
          height: rects[i].visible ? metaInfo.current[rects[i].name].height : 0,
          backgroundImageSrc: rects[i].src
        });

        fabric.Image.fromURL(rects[i].src, (img) => {
          const pattern = new fabric.Pattern({
            source: img.getElement(),
            repeat: 'no-repeat', // You can change this to 'repeat' or 'repeat-x' if needed
          });
          rect.set({ fill: pattern });
          canvas.add(rect);
        });

        canvas.on('object:moving', (e) => {
          console.log('object:moving', metaInfo);
          metaInfo.current[e.target.name].top = e.target.top;
          metaInfo.current[e.target.name].left = e.target.left;
          metaInfo.current[e.target.name].labelTop = e.target.top;
          metaInfo.current[e.target.name].labelLeft = e.target.left;

          htmlRefs.current[e.target.name].style.top = metaInfo.current[e.target.name].top + 'px';
          htmlRefs.current[e.target.name].style.left = metaInfo.current[e.target.name].left + 'px';
        });

        canvas.on('object:scaling', (e) => {
          metaInfo.current[e.target.name].top = e.target.top;
          metaInfo.current[e.target.name].left = e.target.left;
          metaInfo.current[e.target.name].labelTop = e.target.top;
          metaInfo.current[e.target.name].labelLeft = e.target.left;

          htmlRefs.current[e.target.name].style.width = e.target.width * e.target.scaleX + 'px';
          htmlRefs.current[e.target.name].style.top = metaInfo.current[e.target.name].top + 'px';
          htmlRefs.current[e.target.name].style.left = metaInfo.current[e.target.name].left + 'px';
        })

      }

      // background image setting
      if(rects.length !== 0 ){
        fabric.Image.fromURL(rects[0].src, (img) => {
          img.set({
            left: 0,  // Position the image
            top: 0,   // Position the image
            scaleX: canvas.width / img.width,  // Scale to fit the canvas width
            scaleY: canvas.height / img.height, // Scale to fit the canvas height
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }

      canvas.renderAll();
    }
  }



  return (
    <div className='canvas-container'>
      <canvas ref={canvasRef} id="clayCanvas"></canvas>
      {
        rects.map((rect, index) => {
            console.log('metaInfo and rect in component', metaInfo);
            console.log('rect name', rect.name);
            console.log('top of metaInfo and rect in component', metaInfo.current[rect.name]);

            return <div
              id={rect.name}
              key={index}
              ref={(el) => (htmlRefs.current[rect.name] = el)}
              style={{
                position: 'absolute',
                top: `${ metaInfo.current[rect.name] ? metaInfo.current[rect.name].top : rectsOptions[index].top }px`,
                left: `${ metaInfo.current[rect.name] ? metaInfo.current[rect.name].left : rectsOptions[index].left }px`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
                height: '24px',
                width: '200px',
              }}
            >
              <div></div>
              <div
                key={index}
                style={{
                  width: '140px',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '500',
                  marginTop: "-70px",
                }}
              >
                <div>{rect.name}</div>
                <img
                  src={settings}
                  alt={'setting'}
                  style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}}
                  onClick={()=>isOpenCanvasItemConfigModal(rect.name)}
                />
                <img
                  src={remove}
                  alt={'remove'}
                  style={{cursor: 'pointer'}}
                  onClick={() => removeItem(rect.name) }
                />
              </div>

            </div>
          }
        )
      }
    </div>
  );
};

export default Canvas;
