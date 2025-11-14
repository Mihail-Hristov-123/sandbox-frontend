import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUserService } from './useUserService';
import type { UserReturnValues } from '../schemas/auth/RegisterSchema';

export const useCurrentUserInfo = () => {
    const { getCurrentUserInfo } = useUserService();

    const [userInfo, setUserInfo] = useState<UserReturnValues | null>(null);

    useEffect(() => {
        const updateUserInfo = async () => {
            const response = await getCurrentUserInfo();
            if (!response) {
                return;
            }

            if (response.data) {
                setUserInfo(response.data);
                return;
            }
            toast.error(response.message);
        };
        updateUserInfo();
    }, []);

    return { userInfo };
};
