import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch } from 'react-icons/fa';

const Records = ({ state }) => {
  const { contract } = state;

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (contract) {
      fetchRecords();
    }
  }); // Automatically fetch data when contract is available

  const fetchRecords = async () => {
    try {
      const orderCount = await contract.orderCount();
      const fetchedOrders = [];

      for (let index = 0; index < orderCount; index++) {
        const order = await contract.fetchOrder(index);
        const medicines = order[3]; // Extract medicines array from tuple

        const formattedOrder = {
          id: index + 1,
          patientName: order[0],
          doctorName: order[1],
          date: order[2],
          medicines: medicines.map(med => ({
            name: med.name,
            dosage: med.dosage
          }))
        };
        console.log(formattedOrder)

        fetchedOrders.push(formattedOrder);
      }

      setOrders(fetchedOrders);
      console.log(fetchedOrders)
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const downloadRecord = (order) => {
    const fileName = `Order_${order.id}.txt`;
    const content = `
Order ID: ${order.id}
Patient: ${order.patientName}
Doctor: ${order.doctorName}
Date: ${order.date}
Medicines:
${order.medicines.map(med => `- ${med.name} (${med.dosage})`).join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.medicines.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by patient, doctor, or medicine..."
          className="border p-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Patient</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Medicines</th>
                <th className="py-2 px-4 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.patientName}</td>
                  <td className="py-2 px-4">{order.doctorName}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc pl-4">
                      {order.medicines.map((med, i) => (
                        <li key={i} className="text-sm">
                          {med.name} - {med.dosage}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => downloadRecord(order)}
                      className="flex items-center bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      <FaDownload className="mr-2" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No records found.</p>
      )}
    </div>
  );
};

export default Records;
