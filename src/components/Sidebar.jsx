// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-light p-3" style={{ width: '220px', minHeight: '100vh' }}>
      <h5>لوحة التحكم</h5>
      <ul className="nav flex-column">
        <li><Link to="/dashboard" className="nav-link">الملخص</Link></li>
        <li><Link to="/dashboard/categories" className="nav-link">الفئات</Link></li>
        <li><Link to="/dashboard/products" className="nav-link">المنتجات</Link></li>
        <li><Link to="/dashboard/complaints" className="nav-link">الشكاوى</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
