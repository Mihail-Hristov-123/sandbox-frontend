import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/auth/useAuth';
import { Routes } from '../Routes';

export const ProtectedRoute = ({
    routesToBlock,
}: {
    routesToBlock: 'public' | 'protected';
}) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn && routesToBlock === 'protected') {
        return <Navigate to={Routes.LOG_IN} replace />;
    }
    if (isLoggedIn && routesToBlock === 'public') {
        return <Navigate to={Routes.HOME} replace />;
    }

    return <Outlet />;
};
