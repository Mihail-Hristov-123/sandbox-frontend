import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/auth/useAuth';
import { Routes } from '../Routes';

export const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={Routes.LOG_IN} replace />;
    }

    return <Outlet />;
};
