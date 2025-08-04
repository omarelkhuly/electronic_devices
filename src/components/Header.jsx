import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem,
  Select, FormControl, Badge, Button, useMediaQuery
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
import logo from '../assets/logo.png';

const Header = () => {
  const { t, i18n } = useTranslation();
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
    { label: t('home'), path: '/' },
    { label: t('products'), path: '/products' },
    { label: t('shop'), path: '/shop' },
    { label: t('pages'), path: '/pages' },
    { label: t('blog'), path: '/blog' },
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
        {/* Left: Language & Currency */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select value={language} onChange={handleLangChange} sx={{ color: '#fff' }}>
              <MenuItem value="ar">العربية 🇸🇾</MenuItem>
              <MenuItem value="en">English 🇺🇸</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <Select value={currency} onChange={handleCurrencyChange} sx={{ color: '#fff' }}>
              <MenuItem value="USD">{t('usd')}</MenuItem>
              <MenuItem value="SAR">{t('sar')}</MenuItem>
              <MenuItem value="EGP">{t('egp')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Center: Offer Message */}
        <Typography fontSize={14}>
          🕘 {t('summerDiscount')}
        </Typography>

        {/* Right: Social Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <InstagramIcon fontSize="small" />
          <PinterestIcon fontSize="small" />
          <YouTubeIcon fontSize="small" />
          <XIcon fontSize="small" />
          <FacebookIcon fontSize="small" />
        </Box>
      </Box>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#000', px: 2 }}>
        <Toolbar sx={{
          flexDirection: isArabic ? 'row-reverse' : 'row',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Box>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Box>

          {/* Navigation Links */}
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

          {/* Icons */}
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
                  <MenuItem onClick={handleMenuClose}>{t('profile')}</MenuItem>
                  <MenuItem onClick={handleMenuClose}>{t('settings')}</MenuItem>
                  <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: '#fff' }}>
                  {t('login')}
                </Button>
                <Button component={Link} to="/register" sx={{ color: '#fff' }}>
                  {t('register')}
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