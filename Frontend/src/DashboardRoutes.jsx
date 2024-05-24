// DashboardRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard';
import DashboardLayout from './DashboardLayout';

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more dashboard routes if needed */}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
