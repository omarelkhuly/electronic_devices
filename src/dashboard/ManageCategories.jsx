// src/dashboard/ManageCategories.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchCategories = () => {
    api.get('/categories').then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      api.put(`/categories/${editId}`, { name }).then(() => {
        setEditId(null);
        setName('');
        fetchCategories();
      });
    } else {
      api.post('/categories', { name }).then(() => {
        setName('');
        fetchCategories();
      });
    }
  };

  const handleDelete = (id) => {
    api.delete(`/categories/${id}`).then(fetchCategories);
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
  };

  return (
    <div>
      <h2>إدارة الفئات</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="اسم الفئة"
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? 'تعديل' : 'إضافة'}
        </button>
      </form>

      <ul className="list-group">
        {categories.map(cat => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between">
            {cat.name}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cat)}>تعديل</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
