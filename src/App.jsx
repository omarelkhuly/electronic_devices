// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './router/routes';
import ProtectedRoute from "./components/ProtectedRoute";
import dashboardRoutes from './router/dashboardRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';


const App = () => {
  const role = localStorage.getItem('role');

  return (
    <>
      <Header />
      <main className="container my-4">
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          {role && ['admin', 'employee'].includes(role) &&
            dashboardRoutes.map((route, i) => (
              <Route
                key={`dashboard-${i}`}
                path={route.path}
                element={
                  <div className="d-flex">
                    <Sidebar />
                    <div className="flex-fill p-3">{route.element}</div>
                  </div>
                }
              />
            ))
          }
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
