import React, { useState } from 'react';

const Records = ({ state }) => {
  const { contract } = state;
  const [orders, setOrders] = useState([]);

  const fetchRecords = async () => {
    if (!contract) {
      console.log("Contract not found");
      return;
    }
    try {
      const orderCount = await contract.orderCount();
      const fetchedOrders = [];
      for (let index = 0; index < orderCount; index++) {
        const order = await contract.fetchOrder(index);
        fetchedOrders.push(order);
      }
      setOrders(fetchedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={fetchRecords} className="bg-blue-500 text-white px-4 py-2 rounded">Fetch Records</button>
      <ul>
        {orders.map((order, index) => (
          <li key={index} className="border p-2 my-2">
            <p>Patient: {order[0]}</p>
            <p>Doctor: {order[1]}</p>
            <p>Date: {order[2]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;