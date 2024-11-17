/* eslint-disable react/prop-types */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import ListPage from 'src/pages/list';
import HomePage from 'src/pages/web/HomePage';
import OnBoardingPage from 'src/pages/onboarding';

export const Home = lazy(() => import('src/client/pages/Home'));
export const WebLayout = lazy(() => import('src/client/Layout/WebLayout'));
export const DashboardLayout = lazy(() => import('src/layouts/dashboard'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  return token ? children : <Navigate to="/" replace />;
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/onboarding-members/:formToken',
      element: <OnBoardingPage />, // Accessible to everyone
    },
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/', element: <HomePage /> },

        {
          path: '/list',
          element: (
            <AdminRoute>
              <ListPage />{' '}
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
