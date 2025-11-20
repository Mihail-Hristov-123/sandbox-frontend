import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/routes';
import type { CatchValues } from '@/schemas/CatchSchema';
import { createApiRoute } from '@/utils/createApiRoute';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useCreateCatch = (updateCatches: () => Promise<void>) => {
    const { fetchWithAuthCheck } = useApi();

    const { userInfo } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const createCatch = async (data: CatchValues) => {
        setLoading(true);
        try {
            const formData = new FormData();
            const { image, ...fields } = data;

            Object.entries({ ...fields, user_id: userInfo?.id }).forEach(
                ([key, value]) => formData.append(key, value as string),
            );

            formData.append('catchImage', image);

            const response = await fetchWithAuthCheck(
                createApiRoute(SERVER_ROUTES.CATCHES),
                {
                    method: 'POST',

                    body: formData,
                },
            );
            if (response.ok) {
                toast.success('Catch uploaded');
                await updateCatches();
                return true;
            }

            const body = await response.json();
            toast.error(body.message);
            return false;
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during catch post');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { createCatch, loading };
};
