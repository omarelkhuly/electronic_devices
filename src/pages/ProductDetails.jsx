// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data);
      if (res.data.colors?.length) {
        setSelectedColor(res.data.colors[0]);
      }
    });
  }, [id]);

  if (!product) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p>السعر: {product.price} $</p>
      <p>الوصف: {product.description}</p>

      {product.colors?.length > 0 && (
        <div className="mb-3">
          <label>اختر اللون:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="form-select"
          >
            {product.colors.map(color => (
              <option key={color}>{color}</option>
            ))}
          </select>
        </div>
      )}

      <button className="btn btn-success">أضف إلى السلة</button>
    </div>
  );
};

export default ProductDetails;