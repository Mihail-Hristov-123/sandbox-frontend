import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import { SERVER_ROUTES } from '@/routes';
import type { Catch } from '@/types';
import { createApiRoute } from '@/utils/createApiRoute';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useLoadCatches = () => {
    const [catches, setCatches] = useState<Catch[] | null>(null);

    const { loading, setLoading } = useDelayedLoading();

    const updateCatches = async () => {
        setLoading(true);
        try {
            const response = await fetch(createApiRoute(SERVER_ROUTES.CATCHES));
            const body = await response.json();
            setCatches(body.data || null);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during catches fetch');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateCatches();
    }, []);

    return { catches, updateCatches, loading };
};
