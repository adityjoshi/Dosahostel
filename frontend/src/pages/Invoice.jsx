import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Invoice.css";

const Invoice = () => {
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: 1, price: 0, gst: 18 },
  ]);
  const [billNumber, setBillNumber] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: "", quantity: 1, price: 0, gst: 18 },
    ]);
  };

  const handleChange = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateGST = () => {
    const total = calculateTotal();
    return (total * 0.18).toFixed(2);
  };

  const calculateFinalAmount = () => {
    const total = calculateTotal();
    const gst = calculateGST();
    return (parseFloat(total) + parseFloat(gst)).toFixed(2);
  };

  const handleDownload = () => {
    const input = document.getElementById("invoice-preview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="invoice-container">
      <h2>DUKAAN</h2>
      <div className="header-fields">
        <div className="header-group">
          <label>Bill Number:</label>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
          />
        </div>
        <div className="header-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="header-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>GST (18%)</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(item.id, "price", e.target.value)}
                />
              </td>
              <td>{item.gst}%</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} className="add-button">
        Add Item
      </button>

      <div id="invoice-preview" className="preview-section">
        <h2>DUKAAN</h2>
        <div className="preview-header">
          <div>Bill Number: {billNumber}</div>
          <div>Date: {date}</div>
          <div>Customer Name: {customerName}</div>
        </div>
        
        <table className="preview-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>GST (18%)</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.gst}%</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="total-row">
            <span>Sub Total:</span>
            <span>{calculateTotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>GST (18%):</span>
            <span>{calculateGST()}</span>
          </div>
          <div className="total-row final-amount">
            <span>Final Amount:</span>
            <span>{calculateFinalAmount()}</span>
          </div>
        </div>
      </div>

      <button onClick={handleDownload} className="download-button">
        Download Invoice
      </button>
    </div>
  );
};

export default Invoice;