import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DesktopLayout } from './layouts/DesktopLayout';
import { DashboardView } from './views/DashboardView';
import { AlertsView } from './views/AlertsView';
import { SettingsView } from './views/SettingsView';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DesktopLayout,
    children: [
      {
        index: true,
        Component: DashboardView,
      },
      {
        path: 'alerts',
        Component: AlertsView,
      },
      {
        path: 'settings',
        Component: SettingsView,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
