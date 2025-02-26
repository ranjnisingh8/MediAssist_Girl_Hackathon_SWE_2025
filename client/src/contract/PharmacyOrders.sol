// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmacyOrders {
    struct Medicine {
        string name;
        string dosage;
    }
    
    struct Order {
        string patientName;
        string doctorName;
        string date;
        Medicine[] medicines;
    }
    
    mapping(uint256 => Order) public orders;
    uint256 public orderCount;
    
    event OrderPlaced(uint256 orderId, string patientName);
    
    function storeOrder(
        string memory _patientName,
        string memory _doctorName,
        string memory _date,
        string[] memory _medNames,
        string[] memory _dosages
    ) public {
        require(_medNames.length == _dosages.length, "Mismatched medicine data");
        
        Order storage newOrder = orders[orderCount];
        newOrder.patientName = _patientName;
        newOrder.doctorName = _doctorName;
        newOrder.date = _date;
        
        for (uint256 i = 0; i < _medNames.length; i++) {
            newOrder.medicines.push(Medicine({name: _medNames[i], dosage: _dosages[i]}));
        }
        
        emit OrderPlaced(orderCount, _patientName);
        orderCount++;
    }
    
    function fetchOrder(uint256 _orderId) public view returns (
        string memory, string memory, string memory, Medicine[] memory
    ) {
        require(_orderId < orderCount, "Invalid order ID");
        Order storage order = orders[_orderId];
        return (order.patientName, order.doctorName, order.date, order.medicines);
    }
}