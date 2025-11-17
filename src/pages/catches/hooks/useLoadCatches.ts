import { useApi } from '@/hooks/useApi';
import { type CatchReturnValues } from '@/schemas/CatchSchema';
import { useEffect, useState } from 'react';

export const useLoadCatches = () => {
    const [catches, setCatches] = useState<CatchReturnValues[] | null>(null);

    const { fetchWithAuthCheck } = useApi();

    const updateCatches = async () => {
        const response = await fetchWithAuthCheck<CatchReturnValues[]>({
            path: 'CATCHES',
        });

        setCatches(response?.data || null);
    };

    useEffect(() => {
        updateCatches();
    }, []);

    return { catches, updateCatches };
};
