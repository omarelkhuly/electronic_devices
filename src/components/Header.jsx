import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem,
  Select, FormControl, InputLabel, Badge, Button, useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import XIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png'; // استخدم شعارك الخاص

const Header = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery('(max-width:768px)');
  const [language, setLanguage] = useState(i18n.language);
  const [currency, setCurrency] = useState('USD');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const role = localStorage.getItem('role');

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'بيت', path: '/' },
    { label: 'منتجات', path: '/products' },
    { label: 'محل', path: '/shop' },
    { label: 'الصفحات', path: '/pages' },
    { label: 'المدونة', path: '/blog' },
  ];

  return (
    <Box>
      {/* Top Header */}
      <Box sx={{
        backgroundColor: '#2f2f2f',
        color: '#fff',
        px: 2,
        py: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: isArabic ? 'row-reverse' : 'row',
      }}>
        {/* يسار */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select value={language} onChange={handleLangChange} sx={{ color: '#fff' }}>
              <MenuItem value="ar">العربية 🇸🇾</MenuItem>
              <MenuItem value="en">English 🇺🇸</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <Select value={currency} onChange={handleCurrencyChange} sx={{ color: '#fff' }}>
              <MenuItem value="USD">دولار أمريكي 🇺🇸</MenuItem>
              <MenuItem value="SAR">ريال سعودي 🇸🇦</MenuItem>
              <MenuItem value="EGP">جنيه مصري 🇪🇬</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* وسط */}
        <Typography fontSize={14}>
          🕘 خصم الصيف يصل إلى 30%!
        </Typography>

        {/* أيقونات تواصل اجتماعي */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <InstagramIcon fontSize="small" />
          <PinterestIcon fontSize="small" />
          <YouTubeIcon fontSize="small" />
          <XIcon fontSize="small" />
          <FacebookIcon fontSize="small" />
        </Box>
      </Box>

      {/* Navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#000', px: 2 }}>
        <Toolbar sx={{
          flexDirection: isArabic ? 'row-reverse' : 'row',
          justifyContent: 'space-between'
        }}>
          {/* الشعار */}
          <Box>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Box>

          {/* الروابط */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link, idx) => (
                <Button
                  key={idx}
                  component={Link}
                  to={link.path}
                  sx={{ color: '#fff', fontWeight: 'bold' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* الأيقونات */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={0} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            {role ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <MenuItem onClick={handleMenuClose}>الملف الشخصي</MenuItem>
                  <MenuItem onClick={handleMenuClose}>الإعدادات</MenuItem>
                  <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: '#fff' }}>
                  تسجيل الدخول
                </Button>
                <Button component={Link} to="/register" sx={{ color: '#fff' }}>
                  إنشاء حساب
                </Button>
              </>
            )}

            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
