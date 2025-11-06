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
            if (response.body.data) {
                setUserInfo(response.body.data);
                return;
            }
            toast.error(response.body.message);
        };
        updateUserInfo();
    }, []);

    return { userInfo };
};
