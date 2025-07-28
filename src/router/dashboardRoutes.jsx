// src/router/dashboardRoutes.jsx
import DashboardHome from '../dashboard/DashboardHome';
import ManageCategories from '../dashboard/ManageCategories';
import ManageProducts from '../dashboard/ManageProducts';
import ComplaintsPage from '../dashboard/ComplaintsPage';

const dashboardRoutes = [
  { path: '/dashboard', element: <DashboardHome /> },
  { path: '/dashboard/categories', element: <ManageCategories /> },
  { path: '/dashboard/products', element: <ManageProducts /> },
  { path: '/dashboard/complaints', element: <ComplaintsPage /> }
];

export default dashboardRoutes;