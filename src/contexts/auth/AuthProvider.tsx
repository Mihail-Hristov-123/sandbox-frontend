import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUserService } from '@/hooks/useUserService';
import type { UserReturnValues } from '@/schemas/auth/RegisterSchema';
import toast from 'react-hot-toast';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserReturnValues | undefined>(
        undefined,
    );
    const { getCurrentUserInfo } = useUserService();

    useEffect(() => {
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
        updateAuth();
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
