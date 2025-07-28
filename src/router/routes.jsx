// src/router/routes.jsx
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import OrdersPage from '../pages/OrdersPage';

export default [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <ProductDetails /> },
  { path: '/cart', element: <Cart /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/orders', element: <OrdersPage /> }
];
