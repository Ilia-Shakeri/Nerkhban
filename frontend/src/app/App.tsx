import React from 'react';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { useAppContext } from './context/AppContext';
import { router } from './router';
import { AuthView } from './views/AuthView';

function App() {
  const { isAuthenticated, language } = useAppContext();

  return (
    <>
      {!isAuthenticated ? (
        <AuthView />
      ) : (
        <RouterProvider router={router} />
      )}
      <Toaster 
        position={language === 'fa' ? 'top-left' : 'top-right'}
        dir={language === 'fa' ? 'rtl' : 'ltr'}
        richColors
      />
    </>
  );
}

export default App;
