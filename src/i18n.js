// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      orders: 'Orders',
      dashboard: 'Dashboard',
      footerText: 'Thanks for visiting our store!'
    }
  },
  ar: {
    translation: {
      home: "الرئيسية",
      products: "المنتجات",
      cart: "السلة",
      orders: "طلباتي",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      register: "تسجيل",
      footerText: "شكرًا لزيارتك متجرنا الإلكتروني"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar', // اللغة الافتراضية
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// ✅ تحديد اتجاه الصفحة مباشرة بعد التهيئة
document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

export default i18n;
