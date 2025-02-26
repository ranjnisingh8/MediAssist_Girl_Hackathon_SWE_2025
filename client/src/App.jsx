import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import './App.css';
import ABI from './abis/PharmacyOrders.json';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Records from './pages/Records';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const connectWallet = async () => {
    const contractAddress = "0xC0b38D5C5986982b64754f162a7F7afF8C20E414";
    const contractABI = ABI.abi;
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("No Metamask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setState({ provider, signer, contract });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navbar connectWallet={connectWallet} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/records' element={<Records state={state} />} />
      </Routes>
    </Router>
  );
}

export default App;