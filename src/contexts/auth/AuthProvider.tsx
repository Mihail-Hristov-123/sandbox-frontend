import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUserService } from '../../hooks/useUserService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const { getCurrentUserInfo } = useUserService();

    useEffect(() => {
        const refresh = async () => {
            const result = await getCurrentUserInfo();
            setIsLoggedIn(result?.ok ?? false);
        };
        refresh();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
