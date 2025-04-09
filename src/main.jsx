import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/all.scss'
import 'bootstrap/dist/js/bootstrap.min.js';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './redux/store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
