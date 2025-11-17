import { useApi } from '@/hooks/useApi';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import { type CatchReturnValues } from '@/schemas/CatchSchema';
import { useEffect, useState } from 'react';

export const useLoadCatches = () => {
    const [catches, setCatches] = useState<CatchReturnValues[] | null>(null);
    const { loading, setLoading } = useDelayedLoading();
    const { fetchWithAuthCheck } = useApi();

    const updateCatches = async () => {
        setLoading(true);
        const response = await fetchWithAuthCheck<CatchReturnValues[]>({
            path: 'CATCHES',
        });

        setCatches(response?.data || null);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        updateCatches();
    }, []);

    return { catches, updateCatches, loading };
};
