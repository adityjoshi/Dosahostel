import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDetails = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage
      if (!token) {
        toast.error('Authorization token missing');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:2426/getAdminDetails', {
        headers: { Authorization: token },
      });
      setAdmin(response.data);
    } catch (error) {
      toast.error('Failed to fetch admin details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading admin details...</p>;
  }

  if (!admin) {
    return <p>No admin details found.</p>;
  }

  return (
    <div className="admin-details-container">
      <h2>Admin Details</h2>
      <div className="admin-info">
        <p><strong>Full Name:</strong> {admin.full_name}</p>
        <p><strong>Gender:</strong> {admin.gender_info}</p>
        <p><strong>Contact Number:</strong> {admin.contact_number}</p>
        <p><strong>Business Name:</strong> {admin.business_name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>GST Number:</strong> {admin.gst_number}</p>
        <p><strong>User Type:</strong> {admin.user_type}</p>
        <p><strong>Region:</strong> {admin.region}</p>
      </div>
    </div>
  );
};

export default AdminDetails;