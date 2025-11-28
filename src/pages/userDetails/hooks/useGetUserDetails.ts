import type { Catch, User } from '@/types';
import { useEffect, useState } from 'react';
import { UserDetails } from '../UserDetails';
import { SERVER_ROUTES } from '@/Routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';

interface UserDetails {
    user: User;
    catches: Catch[];
}

export const useGetUserDetails = (userId: number) => {
    const [userDetails, setUserDetails] = useState<null | UserDetails>(null);
    const { loading, setLoading } = useDelayedLoading();

    const updateUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${createApiRoute(SERVER_ROUTES.USERS)}/${userId}`,
            );
            const body = await response.json();
            setUserDetails(body.data ?? null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateUserDetails();
    }, []);

    return { userDetails, loading };
};
