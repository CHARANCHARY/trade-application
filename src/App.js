import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/side-bar';
import PopulationGraph from './components/Home/';
import Currency from './components/CurrencyCards';
import CryptoPrices from './components/etherumCoin';
import MetaMaskIntegration from './components/Wallet';

const App = () => {  
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<PopulationGraph />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/cryptoprices" element={<CryptoPrices />} /> 
          <Route path="/connect-wallet" element={<MetaMaskIntegration />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;