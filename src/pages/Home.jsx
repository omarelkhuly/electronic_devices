// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import sliderOne from '../assets/main-banner-1.webp';
import sliderTwo from '../assets/main-banner-2.webp';
import sliderThree from '../assets/main-banner-3.webp';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://688518c9f52d34140f69212f.mockapi.io/marketing/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('فشل التحميل:', err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const slides = [
    {
      src: sliderOne,
      textKey: 'shopNow',
      titleKey: 'heroTitle1',
      descKey: 'heroDesc1',
    },
    {
      src: sliderTwo,
      textKey: 'specialOffers',
      titleKey: 'heroTitle2',
      descKey: 'heroDesc2',
    },
    {
      src: sliderThree,
      textKey: 'newProducts',
      titleKey: 'heroTitle3',
      descKey: 'heroDesc3',
    },
  ];

  return (
    <div className="text-center py-8" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-2xl mb-4">
        {i18n.language === 'ar' ? 'مرحبًا بك في متجر الأجهزة الإلكترونية' : 'Welcome to the Electronics Store'}
      </h1>
      <p className="mb-8">
        {i18n.language === 'ar' ? 'تسوّق أحدث المنتجات بأفضل الأسعار.' : 'Shop the latest products at the best prices.'}
      </p>

      {/* ✅ سلايدر باستخدام Swiper */}
      <div className="w-full mb-10">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          loop
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="rounded-md overflow-hidden"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-[500px] w-full">
                <img src={slide.src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="container absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10 text-white text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{t(slide.titleKey)}</h2>
                  <p className="text-lg md:text-xl mb-4">{t(slide.descKey)}</p>
                  <Link
                    to="/products"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white transition text-lg"
                  >
                    {t(slide.textKey)}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ المنتجات */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {loading ? (
          <p className="text-blue-600 col-span-full">{t('loading') || '...جارٍ تحميل المنتجات'}</p>
        ) : products.length === 0 ? (
          <p className="text-red-600 col-span-full">{t('noProducts') || 'لم يتم العثور على منتجات.'}</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className="border rounded-md p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={
                  product.image && product.image.startsWith('http')
                    ? product.image
                    : 'https://via.placeholder.com/300x200'
                }
                alt={product.name}
                className="mb-3 rounded max-h-48 object-cover w-full"
              />
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  {t('shopNow')}
                </button>
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
