import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { LoadingScreen } from '../../components/LoadingSVG';
import { useUserService } from '../../hooks/useUserService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const { getCurrentUserInfo } = useUserService();

    const refresh = async () => {
        const result = await getCurrentUserInfo();
        console.log(result.ok);
        if (result.ok) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        refresh();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};
