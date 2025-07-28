// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ تخزين الدور
    localStorage.setItem('role', role);

    // ✅ توجيه بناءً على الدور
    if (role === 'admin' || role === 'employee') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="roleSelect" className="form-label">اختر الدور:</label>
          <select
            id="roleSelect"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="form-select"
          >
            <option value="user">عميل</option>
            <option value="employee">موظف</option>
            <option value="admin">مدير</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">دخول</button>
      </form>
    </div>
  );
};

export default Login;
