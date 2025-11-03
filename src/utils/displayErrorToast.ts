import toast from 'react-hot-toast';
import type { Response } from '../hooks/useApi';

export const displayErrorToast = <T>(
    response: Response<T>,
    fallbackMessage: string,
) => {
    if (!response.ok) {
        toast.error(response.body?.message || fallbackMessage);
    }
};
