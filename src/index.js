import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FetchData11 from './FetchData11';
import CVEDetails12 from './CVEDetails12';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <FetchData11 />
  //   {/* <FetchData /> */}
  
  // </React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path="/cves/list" element={<FetchData11 />} />
    <Route path="/cves/:cveId" element={<CVEDetails12 />} />
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
