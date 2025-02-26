import { useState, useEffect } from 'react';
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
    contract: null,
    account: null
  });

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const contractAddress = "0xC0b38D5C5986982b64754f162a7F7afF8C20E414";
  const contractABI = ABI.abi;

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        await connectWallet();
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        alert("No Ethereum account detected.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      setState({ provider, signer, contract, account: accounts[0] });
      console.log("Connected account:", accounts[0]);

      // Listen for account changes
      window.ethereum.on("accountsChanged", (newAccounts) => {
        if (newAccounts.length === 0) {
          alert("Wallet disconnected.");
          setState({ provider: null, signer: null, contract: null, account: null });
        } else {
          connectWallet(); // Reconnect with the new account
        }
      });

      // Listen for network changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <Router>
      <Navbar connectWallet={connectWallet} account={state.account} />
      <Routes>
        <Route path='/' element={<Home state={state}/>} />
        <Route path='/records' element={<Records state={state} />} />
      </Routes>
    </Router>
  );
}

export default App;
