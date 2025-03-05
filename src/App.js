import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import featureActions from './redux/feature/actions';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './containers/Canvas';
import ToolBar from "./containers/ToolBar";
import Modals from "./components/Modals";

function App() {
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(featureActions.getColoursRequest());
  });

  return (
    <div className="row App">
      <div className="col-12 col-md-8">
        <Canvas />
      </div>
      <div className="col-12 col-md-4 h-100">
        <ToolBar />
      </div>
      <Modals />
    </div>
  );
}

export default App;
