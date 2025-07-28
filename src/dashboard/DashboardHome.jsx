// src/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    complaints: 0,
    orders: 0,
  });

  useEffect(() => {
    // API calls (mocked for now)
    Promise.all([
      axios.get('/products'),
      axios.get('/categories'),
      axios.get('/complaints'),
      axios.get('/orders')
    ]).then(([prodRes, catRes, compRes, orderRes]) => {
      setStats({
        products: prodRes.data.length,
        categories: catRes.data.length,
        complaints: compRes.data.length,
        orders: orderRes.data.length
      });
    });
  }, []);

  return (
    <div className="p-4">
      <h2>مرحبا بك في لوحة التحكم</h2>
      <div className="row mt-4">
        {Object.entries(stats).map(([key, value]) => (
          <div className="col-md-3 mb-3" key={key}>
            <div className="card text-center p-3">
              <h5>{key}</h5>
              <h2>{value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
