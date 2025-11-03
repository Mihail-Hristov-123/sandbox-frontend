import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getUserInfo } from '../../utils/getUserInfo';
import { LoadingScreen } from '../../components/LoadingSVG';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = async () => {
        try {
            await getUserInfo();
            setIsLoggedIn(true);
        } catch (_) {
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
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
