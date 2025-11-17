import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useApi } from '@/hooks/useApi';
import type { CatchValues } from '@/schemas/CatchSchema';
import toast from 'react-hot-toast';

export const useCreateCatch = () => {
    const { fetchWithAuthCheck } = useApi();

    const { userInfo } = useAuthContext();
    const createCatch = async (data: CatchValues) => {
        const result = await fetchWithAuthCheck({
            path: 'CATCHES',
            method: 'POST',
            body: { ...data, user_id: userInfo?.id },
        });
        if (result?.ok) {
            toast.success('Catch uploaded');
        }
        return result?.ok;
    };

    return { createCatch };
};
