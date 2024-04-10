import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'material-icons/iconfont/material-icons.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <App />
  </CookiesProvider>
);
