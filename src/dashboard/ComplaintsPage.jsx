// src/dashboard/ComplaintsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.get('/complaints').then(res => setComplaints(res.data));
  }, []);

  return (
    <div>
      <h2>الشكاوى</h2>
      {complaints.length === 0 ? (
        <p>لا توجد شكاوى حالياً.</p>
      ) : (
        <ul className="list-group">
          {complaints.map((c, i) => (
            <li key={i} className="list-group-item">
              <strong>العميل:</strong> {c.user} <br />
              <strong>الشكوى:</strong> {c.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplaintsPage;
