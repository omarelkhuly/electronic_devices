// src/dashboard/ManageProducts.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: '',
    price: '',
    categoryId: '',
    image: '',
    colors: '',
    description: ''
  });

  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    api.get('/products').then(res => setProducts(res.data));
    api.get('/categories').then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      colors: form.colors.split(',').map(c => c.trim())
    };

    if (editId) {
      api.put(`/products/${editId}`, payload).then(() => {
        setForm({ name: '', price: '', categoryId: '', image: '', colors: '', description: '' });
        setEditId(null);
        fetchData();
      });
    } else {
      api.post('/products', payload).then(() => {
        setForm({ name: '', price: '', categoryId: '', image: '', colors: '', description: '' });
        fetchData();
      });
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image,
      colors: product.colors.join(', '),
      description: product.description || ''
    });
  };

  const handleDelete = (id) => {
    api.delete(`/products/${id}`).then(fetchData);
  };

  return (
    <div>
      <h2>إدارة المنتجات</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" placeholder="اسم المنتج" />
        <input name="price" value={form.price} onChange={handleChange} type="number" className="form-control mb-2" placeholder="السعر" />
        <input name="image" value={form.image} onChange={handleChange} className="form-control mb-2" placeholder="رابط الصورة" />
        <input name="colors" value={form.colors} onChange={handleChange} className="form-control mb-2" placeholder="ألوان (مفصولة بفاصلة)" />
        <textarea name="description" value={form.description} onChange={handleChange} className="form-control mb-2" placeholder="الوصف" />
        <select name="categoryId" value={form.categoryId} onChange={handleChange} className="form-select mb-2">
          <option value="">اختر فئة</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">{editId ? 'تعديل' : 'إضافة'}</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>السعر</th>
            <th>الفئة</th>
            <th>ألوان</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{categories.find(cat => cat.id === prod.categoryId)?.name}</td>
              <td>{prod.colors?.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(prod)} className="btn btn-sm btn-warning me-2">تعديل</button>
                <button onClick={() => handleDelete(prod.id)} className="btn btn-sm btn-danger">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
