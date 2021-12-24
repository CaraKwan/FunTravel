import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import "./i18n/configs";
import { Provider } from "react-redux";
import rootStore from "./redux/store";  
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.headers["x-icode"] = "BA8AC8AE0F0FAB2D";

ReactDOM.render(
  <React.StrictMode>
    {/* provider: support redux, rootStore:  combine regular store and persistor */}
    <Provider store={rootStore.store}>  
    {/* PersistGate: provider based on redux-persist */}
    <PersistGate persistor={rootStore.persistor}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
