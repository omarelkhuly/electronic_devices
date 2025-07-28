import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Drawer, List,
  ListItem, ListItemText, Box, useMediaQuery, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const isArabic = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const links = [
    { label: t('home'), to: '/' },
    { label: t('products'), to: '/products' },
    { label: isArabic ? 'التصنيفات' : 'Categories', to: '/categories' },
    { label: isArabic ? 'العروض' : 'Offers', to: '/special' },
    { label: isArabic ? 'تواصل معنا' : 'Contact', to: '/contact' },
  ];

  const handleSearch = () => {
    console.log('بحث عن:', searchValue);
    setSearchOpen(false); // أغلق المربع بعد البحث
  };

  return (
    <>
      {/* الشريط العلوي */}
      <Box className="bg-gray-100 dark:bg-gray-800 text-sm py-1 px-4 flex justify-between items-center text-gray-700 dark:text-gray-300">
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
          🌐 {isArabic ? 'العربية' : 'English'}
          <Button onClick={toggleLanguage} size="small" sx={{ color: 'blue' }}>
            {isArabic ? 'تغيير' : 'Switch'}
          </Button>
        </div>
        <div className="flex gap-3 text-blue-600">
          <FacebookIcon fontSize="small" />
          <TwitterIcon fontSize="small" />
          <WhatsAppIcon fontSize="small" />
        </div>
      </Box>

      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#2563eb' }}>
        <Toolbar className={`flex justify-between ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* الشعار */}
          <Box className="flex items-center gap-2">
            <img src={logo} alt="Logo" height="50" className="h-10" />
          </Box>

          {/* القائمة + أيقونة البحث */}
          <Box className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            {isMobile ? (
              <>
                <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>

                <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <>
                {links.map((item, index) => (
                  <Button key={index} color="inherit" component={Link} to={item.to}>
                    {item.label}
                  </Button>
                ))}
                <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer للقائمة الجانبية في الموبايل */}
      <Drawer
        anchor={isArabic ? 'right' : 'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {links.map((item, index) => (
              <ListItem button key={index} onClick={() => setDrawerOpen(false)}>
                <Link to={item.to} className="w-full">
                  <ListItemText primary={item.label} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Dialog للبحث */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} dir={isArabic ? 'rtl' : 'ltr'}>
        <DialogTitle>{isArabic ? 'بحث' : 'Search'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={isArabic ? 'أدخل كلمة البحث' : 'Enter search term'}
            type="text"
            fullWidth
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchOpen(false)} color="error" startIcon={<CloseIcon />}>
            {isArabic ? 'إغلاق' : 'Close'}
          </Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            {isArabic ? 'بحث' : 'Search'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
