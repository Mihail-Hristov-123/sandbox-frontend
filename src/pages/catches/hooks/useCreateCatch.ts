import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/routes';
import type { CatchValues } from '@/schemas/CatchSchema';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';

export const useCreateCatch = (updateCatches: () => Promise<void>) => {
    const { fetchWithAuthCheck } = useApi();

    const { userInfo } = useAuthContext();

    const createCatch = async (data: CatchValues) => {
        try {
            const response = await fetchWithAuthCheck(
                createApiRoute(SERVER_ROUTES.CATCHES),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, user_id: userInfo!.id }),
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
        }
    };

    return { createCatch };
};
