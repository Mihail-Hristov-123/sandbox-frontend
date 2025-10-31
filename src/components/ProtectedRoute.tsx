import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { Routes } from '../Routes';

export const ProtectedRoute = ({
    routesToBlock,
}: {
    routesToBlock: 'public' | 'protected';
}) => {
    const { isLoggedIn } = useAuthContext();

    if (!isLoggedIn && routesToBlock === 'protected') {
        return <Navigate to={Routes.LOG_IN} replace />;
    }
    if (isLoggedIn && routesToBlock === 'public') {
        return <Navigate to={Routes.HOME} replace />;
    }

    return <Outlet />;
};
