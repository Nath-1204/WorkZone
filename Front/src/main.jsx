import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from "react-router-dom"

//redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';

// reducers
import AuthReducer from './redux/Reducers/AuthReducer.js';
import FileFolder from './redux/Reducers/FileFolder.jsx';

const reducers = combineReducers({
  auth: AuthReducer,
  filefolders: FileFolder,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
