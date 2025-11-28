import { SERVER_ROUTES } from '@/Routes';
import { useApi } from './useApi';
import { createApiRoute } from '@/utils/createApiRoute';
import toast from 'react-hot-toast';

type Resource = 'answer' | 'question' | 'catch';

const routeMap: Record<Resource, keyof typeof SERVER_ROUTES> = {
    answer: 'ANSWERS',
    catch: 'CATCHES',
    question: 'QUESTIONS',
};

export const useDeleteResource = (
    resourceType: Resource,
    resourceId: number,
) => {
    const { fetchWithAuthCheck } = useApi();

    const deleteResource = async () => {
        const serverRoute = SERVER_ROUTES[routeMap[resourceType]];

        try {
            const response = await fetchWithAuthCheck(
                `${createApiRoute(serverRoute)}/${resourceId}`,
                {
                    method: 'DELETE',
                },
            );
            if (response.ok) {
                toast.success('Successful deletion');
                return;
            }
            const body = await response.json();
            toast.error(body.message);
        } catch (error) {
            console.error(error);
            toast.error('Error occurred during deletion');
        }
    };

    return { deleteResource };
};
