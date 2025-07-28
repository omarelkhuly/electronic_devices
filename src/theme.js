// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (direction = 'ltr') =>
  createTheme({
    direction,
    palette: {
      mode: 'light', // أو 'dark'
      primary: {
        main: '#2563eb', // لون أزرق Tailwind
      },
    },
  });
