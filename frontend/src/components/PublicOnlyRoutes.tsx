import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/auth/useAuth';
import { Routes } from '../Routes';

export const PublicOnlyRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to={Routes.HOME} replace />;
    }

    return <Outlet />;
};
