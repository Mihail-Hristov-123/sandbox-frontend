import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getUserInfo } from '../../utils/getUserInfo';
import { LoadingScreen } from '../../components/LoadingSVG';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getUserInfo();
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        setTimeout(() => {
            checkAuth();
            // add loading screen
        }, 10000);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
