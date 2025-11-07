import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Nav } from './components/Nav.tsx';
import { AuthProvider } from './contexts/auth/AuthProvider.tsx';

import { AppRoutes } from './components/AppRoutes.tsx';
import { Toaster } from 'react-hot-toast';
import { Footer } from './components/Footer.tsx';
import { LoadingContextProvider } from './contexts/loading/LoadingContextProvider.tsx';
import { LoadingScreen } from './components/LoadingScreen.tsx';

createRoot(document.getElementById('root')!).render(
    <>
        <Toaster position="top-center" />

        <BrowserRouter>
            <LoadingContextProvider>
                <AuthProvider>
                    <Nav />
                    <LoadingScreen />
                    <AppRoutes />
                    <Footer />
                </AuthProvider>
            </LoadingContextProvider>
        </BrowserRouter>
    </>,
);
