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
      <div className="container grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-4 m-8">
        {loading ? (
          <p className="text-blue-600 col-span-full">{t('loading') || '...جارٍ تحميل المنتجات'}</p>
        ) : products.length === 0 ? (
          <p className="text-red-600 col-span-full">{t('noProducts') || 'لم يتم العثور على منتجات.'}</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className="border rounded overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col bg-dark ms-2 mt-2 p-2"
            >
              {/* صورة المنتج */}
              <img
                src={
                  product.image && product.image.startsWith('http')
                    ? product.image
                    : 'https://via.placeholder.com/300x200'
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* المحتوى */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

                {/* السعر والتقييم */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-600 font-bold text-base">${product.price}</span>
                  <div className="text-yellow-500 text-sm">
                    {Array(5).fill().map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < (product.rating || 4) ? '' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* الأزرار */}
                <div className="flex justify-between items-center">
                  <button className="bg-blue text-white px-3 py-1 rounded hover:bg-blue">
                    {t('shopNow')}
                  </button>
                  <div className="flex gap-2 text-blue-600 text-lg">
                    <i className="fas fa-heart cursor-pointer hover:text-red-500"></i>
                    <i className="fas fa-cart-plus cursor-pointer hover:text-green-500"></i>
                  </div>
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
