import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './containers/Canvas';
import ToolBar from "./containers/ToolBar";
import Modals from "./components/Modals";

function App() {
  return (
    <Provider store={store}>
      <div className="row App">
        <div className="col-12 col-md-8">
          <Canvas />
        </div>
        <div className="col-12 col-md-4 h-100">
          <ToolBar />
        </div>
        <Modals />
      </div>
    </Provider>
  );
}

export default App;
