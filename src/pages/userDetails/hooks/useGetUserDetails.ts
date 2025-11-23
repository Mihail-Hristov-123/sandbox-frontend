import type { Catch, User } from '@/types';
import { useEffect, useState } from 'react';
import { UserDetails } from '../UserDetails';
import { SERVER_ROUTES } from '@/Routes';
import { createApiRoute } from '@/utils/createApiRoute';

interface UserDetails {
    user: User;
    catches: Catch[];
}

export const useGetUserDetails = (userId: number) => {
    const [userDetails, setUserDetails] = useState<null | UserDetails>(null);

    const updateUserDetails = async () => {
        try {
            const response = await fetch(
                `${createApiRoute(SERVER_ROUTES.USERS)}/${userId}`,
            );
            const body = await response.json();
            setUserDetails(body.data ?? null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        updateUserDetails();
    }, []);

    return { userDetails };
};
