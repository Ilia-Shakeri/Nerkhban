import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

// Figma components (ensure these match your figma_code.txt exports)
import { DesktopLayout } from './layouts/DesktopLayout';
import { DashboardView } from './views/DashboardView';
import { AlertsView } from './views/AlertsView';
import { SettingsView } from './views/SettingsView';
import { AuthView } from './views/AuthView';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthView />} />
    
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <DesktopLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardView />} />
      <Route path="alerts" element={<AlertsView />} />
      <Route path="settings" element={<SettingsView />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
