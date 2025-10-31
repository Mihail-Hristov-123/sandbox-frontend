import type { LogoutScope } from '../components/LogoutForm';
import { useAuth } from '../contexts/auth/useAuth';

const pathMap: Record<LogoutScope, string> = {
    allDevices: '/@api/auth/logout-all',
    thisDevice: '/@api/auth/logout',
};

export const useLogout = () => {
    const { setIsLoggedIn } = useAuth();

    const logOut = async (scope: LogoutScope) => {
        const result = await fetch(pathMap[scope], { method: 'POST' });
        if (result.ok) {
            setIsLoggedIn(false);
        }
        return result.ok;
    };

    return logOut;
};
