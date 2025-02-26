import React from 'react';
import { Link } from 'react-router-dom';
import img from "../assets/logo.png"

const Navbar = ({ connectWallet, account }) => {
  return (
    <div className="px-8">
      <nav className="bg-gray-100 shadow-md py-4 px-6 rounded-lg mx-auto w-full mt-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800"><img src={img} alt="" style={{"height":"50px","width":"150px"}} /></Link>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/records" className="hover:text-blue-600 transition">Records</Link>
            </li>
            <li>
              {account ? (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">
                  {account.substring(0, 6)}...{account.slice(-4)}
                </span>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Connect Wallet
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
