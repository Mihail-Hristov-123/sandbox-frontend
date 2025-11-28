import { useAuthContext } from '@/contexts/auth/useAuthContext';

export const useCheckIsOwner = (resourceOwnerId: number) => {
    const { userInfo } = useAuthContext();
    const isOwner = resourceOwnerId === userInfo?.id;

    return { isOwner };
};
