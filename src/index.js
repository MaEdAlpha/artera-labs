import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/LEMONMILK-Regular.otf'
import { ChainId, DAppProvider } from '@usedapp/core';
import { BrowserRouter } from 'react-router-dom';

const config = {
  readOnlyChainId: ChainId.Moonriver,
}


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
