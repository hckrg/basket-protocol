import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RecoilRoot } from 'recoil'
import './flowConfig'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ToastContainer/>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
