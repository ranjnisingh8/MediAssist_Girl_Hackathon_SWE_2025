import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ connectWallet }) => {
  return (
    <div className='px-8'>
      <nav className="bg-gray-100 shadow-md py-4 px-6 rounded-lg mx-auto w-full mt-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">LOGO</Link>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/records" className="hover:text-blue-600 transition">Records</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <button onClick={connectWallet} className="hover:text-blue-600 transition">Connect Wallet</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;