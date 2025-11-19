import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { useApi } from '@/hooks/useApi';
import { SERVER_ROUTES } from '@/routes';
import { createApiRoute } from '@/utils/createApiRoute';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUpdateProfilePicture = () => {
    const { fetchWithAuthCheck } = useApi();
    const { updateAuth } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const updateProfilePicture = async (
        image: File,
        resetImage: () => void,
    ) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetchWithAuthCheck(
                `${createApiRoute(SERVER_ROUTES.ME)}/profile-picture`,
                { method: 'PATCH', body: formData },
            );
            if (response.ok) {
                toast.success('Profile picture updated');
                resetImage();
                await updateAuth();
                return;
            }
            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during profile picture update');
        } finally {
            setLoading(false);
        }
    };
    return { updateProfilePicture, loading };
};
