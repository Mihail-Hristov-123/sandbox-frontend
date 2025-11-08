import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUserService } from '../../hooks/useUserService';
import type { UserReturnValues } from '../../schemas/auth/RegisterSchema';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserReturnValues | undefined>(
        undefined,
    );
    const { getCurrentUserInfo } = useUserService();

    useEffect(() => {
        const updateAuth = async () => {
            const result = await getCurrentUserInfo();
            if (!result?.ok) {
                setUserInfo(undefined);
                setIsLoggedIn(false);
                return;
            }
            setUserInfo(result.data);
            setIsLoggedIn(true);
        };
        updateAuth();
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
