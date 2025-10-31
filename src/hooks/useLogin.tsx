import { useAuth } from '../contexts/auth/useAuth';
import type { UserLoginValues } from '../schemas/auth/LoginSchema';

export const useLogin = () => {
    const { setIsLoggedIn } = useAuth();

    const logIn = async (data: UserLoginValues) => {
        const result = await fetch('/@api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            setIsLoggedIn(true);
        }
        return result.ok;
    };

    return { logIn };
};
