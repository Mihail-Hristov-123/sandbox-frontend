import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { CLIENT_ROUTES } from '../routes';

const { LOG_IN, HOME } = CLIENT_ROUTES;

export const ProtectedRoute = ({
    routesToBlock,
}: {
    routesToBlock: 'public' | 'protected';
}) => {
    const { isLoggedIn } = useAuthContext();

    if (!isLoggedIn && routesToBlock === 'protected') {
        return <Navigate to={LOG_IN} replace />;
    }
    if (isLoggedIn && routesToBlock === 'public') {
        return <Navigate to={HOME} replace />;
    }

    return <Outlet />;
};
