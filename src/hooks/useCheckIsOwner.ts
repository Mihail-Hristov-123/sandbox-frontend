import { useAuthContext } from '@/contexts/auth/useAuthContext';

export const useCheckIsOwner = (resourceOwnerId: number) => {
    const { userInfo } = useAuthContext();
    return userInfo?.id === resourceOwnerId;
};
