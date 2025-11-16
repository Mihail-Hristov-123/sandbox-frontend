import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Nav } from './components/Nav.tsx';
import { AuthProvider } from './contexts/auth/AuthProvider.tsx';

import { AppRoutes } from './components/routingRelated/AppRoutes.tsx';
import { Toaster } from 'react-hot-toast';
import { Footer } from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
    <>
        <Toaster position="top-center" />

        <BrowserRouter>
            <AuthProvider>
                <Nav />
                <AppRoutes />
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    </>,
);
