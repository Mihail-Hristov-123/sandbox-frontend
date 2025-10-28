import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotFound } from './pages/NotFound.tsx';
import { Routes as availableRoutes } from './Routes.ts';
import { Home } from './pages/Home.tsx';
import { Nav } from './components/Nav.tsx';
import { AuthProvider } from './contexts/auth/AuthProvider.tsx';
import { ProtectedRoutes } from './components/ProtectedRoutes.tsx';
import { PublicOnlyRoutes } from './components/PublicOnlyRoutes.tsx';
import { Register } from './pages/Register.tsx';
import { Login } from './pages/Login.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path={availableRoutes.HOME} element={<Home />} />

                    {/* routes that are not available to logged in users */}
                    <Route element={<PublicOnlyRoutes />}>
                        <Route
                            path={availableRoutes.REGISTER}
                            element={<Register />}
                        />
                        <Route
                            path={availableRoutes.LOG_IN}
                            element={<Login />}
                        />
                    </Route>

                    {/* routes that are protected */}
                    <Route element={<ProtectedRoutes />}>
                        <Route
                            path={availableRoutes.PROTECTED}
                            element={<h1>Protected page</h1>}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
        ,
    </StrictMode>,
);
