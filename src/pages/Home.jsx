// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // استايلات الشريحة
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تحميل البيانات من Mock API
  // 
  useEffect(() => {
    fetch('https://1ea748ea-584e-47bd-8ce0-b02a6dda3aa4.mock.pstmn.io/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('البيانات غير صحيحة:', data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error('فشل في تحميل المنتجات من Mock API:', err);
        setLoading(false);
      });
  }, []);

  const slides = [
    { src: 'https://via.placeholder.com/1200x500?text=Slide+1', text: 'تسوق الآن' },
    { src: 'https://via.placeholder.com/1200x500?text=Slide+2', text: 'خصومات مميزة' },
    { src: 'https://via.placeholder.com/1200x500?text=Slide+3', text: 'منتجات جديدة' },
  ];

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl mb-4">مرحبًا بك في متجر الأجهزة الإلكترونية</h1>
      <p className="mb-8">تسوّق أحدث المنتجات بأفضل الأسعار.</p>

      {/* الشريحة */}
      <div className="px-4 mb-10">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={4000}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="relative group">
              <img src={slide.src} alt={`Slide ${idx + 1}`} className="rounded-md w-full" />
              <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition">
                {slide.text}
              </button>
            </div>
          ))}
        </Carousel>
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {loading ? (
          <p className="text-blue-600">...جارٍ تحميل المنتجات</p>
        ) : products.length === 0 ? (
          <p className="text-red-600">لم يتم العثور على منتجات.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-md p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.name}
                className="mb-3 rounded max-h-48 object-cover w-full"
              />
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <button className="bg-blue-600 text-white px-3 py-1 rounded">شراء</button>
                <div className="flex gap-2 text-blue-600 text-xl">
                  <i className="fas fa-heart cursor-pointer hover:text-red-500"></i>
                  <i className="fas fa-cart-plus cursor-pointer hover:text-green-500"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
