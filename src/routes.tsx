import { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

const Dashboard = lazy(() => import('pages/Dashboard'));

const styles = {
  margin: '20px 0',
  marginBottom: '20px',
  height: '100vh',
  padding: '20% 50%',
  TextAlign: 'center',
  borderRadius: '4px'
};

const Spinner = () => (
  <div style={styles}>
    <Spin size="large" />
  </div>
);

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
