import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Nav } from './components/Nav.tsx';
import { AuthProvider } from './contexts/auth/AuthProvider.tsx';

import { AppRoutes } from './components/AppRoutes.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Nav />
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
