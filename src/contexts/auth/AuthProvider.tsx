import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUserService } from '@/hooks/useUserService';
import type { User } from '@/types';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
    const { getCurrentUserInfo } = useUserService();

    const updateAuth = async () => {
        try {
            const response = await getCurrentUserInfo();

            setIsLoggedIn(response.ok);

            const body = await response.json();

            setUserInfo(body.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        updateAuth();
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, userInfo, updateAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};
