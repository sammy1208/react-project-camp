import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './assets/all.scss'
import './assets/scss/all.scss'
import 'bootstrap/dist/js/bootstrap.min.js';

import { RouterProvider } from 'react-router-dom';
import router from './router';

// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
