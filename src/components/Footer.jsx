import React from 'react';
import logoImage from "../assets/logo.png";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <img src={logoImage} alt="Logo" height="40" className="mb-3" />
        <p className="mb-1">{t('footerText') || 'Thanks for visiting our store!'}</p>
        <small>© {new Date().getFullYear()} Electronic Devices Store</small>
      </div>
    </footer>
  );
};

export default Footer;
