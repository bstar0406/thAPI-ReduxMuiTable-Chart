import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import './assets/styles/global.scss';
import './assets/styles/index.css';
import App from './pages/App';
import { store } from './redux';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
