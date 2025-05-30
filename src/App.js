import React from 'react';

import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './containers/Canvas';
import ToolBar from "./containers/ToolBar";
import Modals from "./components/Modals";
import Init from './components/Init';

function App() {
  return (
    <div className="acp-row acp-App">
      <div className="acp-col-12 acp-col-md-8">
        <Canvas />
      </div>
      <div className="acp-col-12 acp-col-md-4 acp-h-100">
        <ToolBar />
      </div>
      <Modals />
      <Init />
    </div>
  );
}

export default App;
