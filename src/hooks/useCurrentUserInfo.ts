import { useEffect, useState } from 'react';

import type { UserReturnValues } from '../schemas/auth/RegisterSchema';
import { useApi } from './useApi';
import { useAuthContext } from '../contexts/auth/useAuthContext';

export const useCurrentUserInfo = () => {
    const { fetchWithAuthCheck } = useApi();
    const { setIsLoggedIn } = useAuthContext();

    const [userInfo, setUserInfo] = useState<UserReturnValues | null>(null);

    const getCurrentUserInfo = () =>
        fetchWithAuthCheck<UserReturnValues>({
            path: 'ME',
        });

    useEffect(() => {
        const updateUserInfo = async () => {
            const response = await getCurrentUserInfo();
            if (!response || !response.body.data) {
                setIsLoggedIn(false);
                setUserInfo(null);
                return;
            }

            setIsLoggedIn(true);
            setUserInfo(response.body.data);
        };
        updateUserInfo();
    }, []);

    return { userInfo, getCurrentUserInfo };
};
