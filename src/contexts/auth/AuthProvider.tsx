import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { LoadingScreen } from '../../components/LoadingSVG';
import { useUserService } from '../../hooks/useUserService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const { getCurrentUserInfo } = useUserService();

    useEffect(() => {
        const refresh = async () => {
            const result = await getCurrentUserInfo();
            setIsLoggedIn(result?.ok ?? false);
            setIsLoading(false);
        };
        refresh();
    }, [getCurrentUserInfo]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
