import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { LoadingScreen } from '../../components/LoadingSVG';
import { useApi } from '../../hooks/useApi';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const { makeApiRequest } = useApi();

    const refresh = async () => {
        const result = await makeApiRequest({ path: 'ME' });
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
