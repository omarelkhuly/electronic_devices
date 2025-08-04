// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      products: 'Products',
      summerDiscount:"summer Discount",
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      orders: 'Orders',
      shop: "Shop",
      pages:"Pages",
      blog:"Blog",
      specialOffers: "Special Offers",
      newProducts: "New Products",
      heroTitle1: "Explore Our Collection",
      heroDesc1: "The latest electronics at unbeatable prices.",
      heroTitle2: "Special Summer Sale",
      heroDesc2: "Up to 30% off selected items!",
      heroTitle3: "New Arrivals",
      heroDesc3: "Check out the newest tech trends!",
      dashboard: 'Dashboard',
      footerText: 'Thanks for visiting our store!',
      loading: "Loading products...",
      price: 'Price',
      rating: 'Rating',
      noProducts: "No products found."
    }
  },
  ar: {
    translation: {
      home: "الرئيسية",
      summerDiscount:"خصم الصيف",
      products: "المنتجات",
      cart: "السلة",
      orders: "طلباتي",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      register: "تسجيل",
      pages:"صفحات",
      shop: "تسوق",
      blog:"تقرير",
      specialOffers: "خصومات مميزة",
      newProducts: "منتجات جديدة",
      heroTitle1: "استكشف تشكيلتنا",
      heroDesc1: "أحدث الأجهزة الإلكترونية بأفضل الأسعار.",
      heroTitle2: "عروض الصيف الخاصة",
      heroDesc2: "خصم يصل إلى 30٪ على مختارات مميزة!",
      heroTitle3: "وصل حديثاً",
      heroDesc3: "تعرف على أحدث صيحات التكنولوجيا!",
      footerText: "شكرًا لزيارتك متجرنا الإلكتروني",
      loading: "جارٍ تحميل المنتجات...",
      price: 'السعر',
      rating: 'التقييم',
      noProducts: "لم يتم العثور على منتجات."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

i18n.on('languageChanged', (lng) => {
  document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;