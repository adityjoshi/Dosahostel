import React, { useState, useEffect } from 'react';
import { Plus, Search, FileDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './Inventory.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    businessName: '',
    quantity: 0,
    gst: '',
    price: 0,
    status: 'In Stock'
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:2426/getInventory");
      setInventory(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to fetch inventory. Showing dummy data.');
      setInventory([
        {
          id: 1,
          productName: "Cables",
          businessName: "Shop-1",
          quantity: 10,
          gst: "GST1122",
          price: 100,
          status: "In Stock"
        },
        {
          id: 2,
          productName: "Pipes",
          businessName: "Shop-2",
          quantity: 100,
          gst: "GST2222",
          price: 200,
          status: "In Stock"
        }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2426/addInventory", formData);
      toast.success(editingItem ? 'Inventory updated successfully' : 'Inventory added successfully');
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({
        productName: '',
        businessName: '',
        quantity: 0,
        gst: '',
        price: 0,
        status: 'In Stock'
      });
      fetchInventory();
    } catch (error) {
      console.error('Operation failed:', error);
      toast.error('Operation failed');
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = inventory.map(item => ({
        "Product Name": item.productName,
        "Business Name": item.businessName,
        "Quantity": item.quantity,
        "GST": item.gst,
        "Price": item.price,
        "Status": item.status,
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
      XLSX.writeFile(wb, 'inventory.xlsx');
    } catch (error) {
      console.error('Failed to export to Excel:', error);
      toast.error('Failed to export to Excel');
    }
  };

  const addDummyInventoryItem = () => {
    const newItem = {
      id: inventory.length + 1,
      productName: "Iron Rod",
      businessName: "Shop-3",
      quantity: 50,
      gst: "GST9999",
      price: 500,
      status: "In Stock"
    };
    setInventory(prev => [...prev, newItem]);
    toast.success('Dummy inventory item added');
  };

  const filteredInventory = inventory.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Inventory Management</h1>

        <div className="actions-bar">
          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="buttons-container">
            <button onClick={addDummyInventoryItem} className="btn btn-primary">
              <Plus size={20} /> Add New
            </button>
            <button onClick={exportToExcel} className="btn btn-secondary">
              <FileDown size={20} /> Export
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Business Name</th>
                <th>Quantity</th>
                <th>GST</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.businessName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.gst}</td>
                  <td>${item.price}</td>
                  <td>
                    <span className={`status-badge ${
                      item.status === 'In Stock' ? 'in-stock' :
                      item.status === 'Low Stock' ? 'low-stock' :
                      'out-of-stock'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;